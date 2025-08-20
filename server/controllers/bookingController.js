import booking from "../models/booking.js";
import Car from "../models/car.js";

// Function to check availability of a car for a given Date range
const checkAvailability = async (carId, pickupDate, returnDate) => {
  try {
    const bookings = await booking.find({
      car: carId,
      pickupDate: { $lte: returnDate },
      returnDate: { $gte: pickupDate },
    });
    return bookings.length === 0;
  } catch (error) {
    console.error("Error checking car availability:", error.message);
    return false; // Assume not available on error
  }
};

// API to check availability of cars for a given Date and location
export const checkAvailabilityofCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // Fetch all available cars for the given location
    const cars = await Car.find({ location, isAvailable: true });

    // API to check availability of each car for the given Date range using promises
    const availabilityCarPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car._doc, isAvailable: isAvailable };
    });

    const availabilityCars = await Promise.all(availabilityCarPromises);
    const availableCars = availabilityCars.filter((car) => car.isAvailable);

    res.status(200).json({
      success: true,
      availableCars,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to create a booking
export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Car is not available for the selected dates",
      });
    }

    const carData = await Car.findById(car);
    if (!carData) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    // Calculate price based on pickup and return dates
    const pickup = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noofdays = Math.ceil((returned - pickup) / (1000 * 3600 * 24));
    const price = noofdays * carData.pricePerDay;

    await booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to list bookings of a user
export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await booking
      .find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get owner's bookings
export const getownerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    const bookings = await booking
      .find({ owner: req.user._id })
      .populate("car user", "-user.password") // Exclude password from populated user
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to change booking status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const currentBooking = await booking.findById(bookingId);

    if (!currentBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (currentBooking.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    currentBooking.status = status;
    await currentBooking.save();

    res.status(200).json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};