import express from "express";
import { changeBookingStatus, checkAvailabilityofCar, createBooking, getownerBookings, getUserBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", protect, checkAvailabilityofCar );
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getownerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);

export default bookingRouter;