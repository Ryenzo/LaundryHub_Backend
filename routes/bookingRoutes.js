import express from "express";
import { 
  createBooking, 
  getBookingsByUser,
  getBookingsByShop,
  getBookingStats 
} from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings - Create new booking
router.post("/", createBooking);

// GET /api/bookings/user/:firebaseUid - Get user's booking history
router.get("/user/:firebaseUid", getBookingsByUser); // Changed from "/:firebaseUid"

// GET /api/bookings/shop/:shopId - Get bookings for specific shop
router.get("/shop/:shopId", getBookingsByShop);

// GET /api/bookings/stats - Get booking statistics
router.get("/stats", getBookingStats);

export default router;