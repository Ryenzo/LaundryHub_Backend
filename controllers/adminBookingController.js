import Booking from "../models/Booking.js";

// 1. Get all bookings
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("customerId", "name email"); // uses your field

  res.json(bookings);
};

// 2. Get one booking
export const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("customerId", "name email");

  if (!booking) return res.status(404).json({ message: "Booking not found" });

  res.json(booking);
};

// 3. Update booking status (Pending → In Progress → Completed)
export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = status;
  await booking.save();

  res.json({ message: "Status updated", booking });
};

// 4. Delete a booking
export const deleteBooking = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) return res.status(404).json({ message: "Booking not found" });

  res.json({ message: "Booking deleted" });
};
