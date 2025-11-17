import express from "express";
import {
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/adminBookingController.js";

import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", adminMiddleware, getAllBookings);
router.get("/:id", adminMiddleware, getBookingById);
router.put("/:id/status", adminMiddleware, updateBookingStatus);
router.delete("/:id", adminMiddleware, deleteBooking);

export default router;
