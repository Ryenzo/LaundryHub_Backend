import Booking from "../models/Booking.js";
import User from "../models/User.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { firebaseUid, serviceType, weight, price, pickupDate, deliveryDate, notes } = req.body;

    // Find the MongoDB user linked to Firebase UID
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    const booking = new Booking({
      customerId: user._id,
      serviceType,
      weight,
      price,
      pickupDate,
      deliveryDate,
      notes,
    });

    await booking.save();
    return res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("Booking creation error:", error);
    return res.status(500).json({ message: "Failed to create booking" });
  }
};

// Get bookings for a user
export const getBookingsByUser = async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookings = await Booking.find({ customerId: user._id });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
