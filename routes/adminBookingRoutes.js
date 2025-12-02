import express from "express";
import {
  getAllBookings,
  getMyShopBookings,
  getMyShopBookingsByStatus,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/adminBookingController.js";

import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get all bookings for admin's shop (default route used by admin dashboard)
router.get("/", adminMiddleware, getAllBookings);

// Get all bookings for admin's shop (explicit route)
router.get("/my-shop", adminMiddleware, getMyShopBookings);

// Get bookings by status for admin's shop
router.get("/my-shop/status/:status", adminMiddleware, getMyShopBookingsByStatus);

// Get specific booking
router.get("/:id", adminMiddleware, getBookingById);

// Update booking status
router.put("/:id/status", adminMiddleware, updateBookingStatus);

// Delete booking
router.delete("/:id", adminMiddleware, deleteBooking);

export default router;
