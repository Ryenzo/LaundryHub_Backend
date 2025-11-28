import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  weight: Number,
  price: Number,
  pickupDate: Date,
  deliveryDate: Date,
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'completed', 'declined'],
    default: "pending", // lowercase to match frontend
  },
  notes: String,
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;