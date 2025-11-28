import express from "express";
import { createBooking, getBookingsByUser } from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings
router.post("/", createBooking);

// GET /api/bookings/:firebaseUid
router.get("/:firebaseUid", getBookingsByUser);

export default router;

