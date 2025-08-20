import User from "../models/user.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Car from "../models/car.js";
import Booking from "../models/booking.js";

// Helper function to upload and optimize images
const uploadAndOptimizeImage = async (file, folderName, width) => {
  if (!file || !file.path) {
    throw new Error("Image file is missing.");
  }

  const fileBuffer = fs.readFileSync(file.path);
  const response = await imagekit.upload({
    file: fileBuffer,
    fileName: file.originalname,
    folder: folderName,
  });

  const optimizedImageURL = imagekit.url({
    path: response.filePath,
    transformation: [{ width: width }, { quality: "auto" }, { format: "webp" }],
  });

  return optimizedImageURL;
};

export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.status(200).json({ success: true, message: "Now you can list Cars" });
  } catch (error) {
    console.error("Error changing role:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// API to list car
export const addCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const car = JSON.parse(req.body.carData);
    const imagefile = req.file;

    const image = await uploadAndOptimizeImage(imagefile, "/cars", "1200");

    await Car.create({
      ...car,
      owner: _id,
      Image: image,
    });

    res.status(201).json({ success: true, message: "Car added successfully" });
  } catch (error) {
    console.error("Error adding car:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to list owner car
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id }).populate("owner", "name email");
    res.status(200).json({ success: true, cars });
  } catch (error) {
    console.error("Error getting owner cars:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// API to toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car || car.owner.toString() !== _id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You do not own this car.",
      });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.status(200).json({
      success: true,
      message: "Car availability toggled successfully.",
    });
  } catch (error) {
    console.error("Error toggling car availability:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// API to delete car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const car = await Car.findById(carId);

    if (!car || car.owner.toString() !== _id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You do not own this car.",
      });
    }

    await Car.findByIdAndDelete(carId);

    res.status(200).json({
      success: true,
      message: "Car deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting car:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// API to get Dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const { _id } = req.user;

    const totalCars = await Car.countDocuments({ owner: _id });
    const bookings = await Booking.find({ owner: _id }).populate("car");
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(
      (b) => b.status === "pending"
    ).length;
    const completeBookings = bookings.filter(
      (b) => b.status === "confirmed"
    ).length;
    const recentBookings = bookings.slice(-5).reverse();
    const monthlyRevenue = bookings
      .filter(
        (b) =>
          b.status === "confirmed" &&
          new Date(b.createdAt).getMonth() === new Date().getMonth()
      )
      .reduce((sum, b) => sum + (b.price || 0), 0);

    res.json({
      success: true,
      DashboardData: {
        totalCars,
        totalBookings,
        pendingBookings,
        completeBookings,
        recentBookings,
        monthlyRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to update user image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imagefile = req.file;

    const image = await uploadAndOptimizeImage(imagefile, "/users", "400");

    await User.findByIdAndUpdate(_id, { Image: image }, { new: true });

    res.status(200).json({ success: true, message: "Image updated" });
  } catch (error) {
    console.error("Error updating user image:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
