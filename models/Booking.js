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
  status: {
    type: String,
    default: "Pending", // Pending, In Progress, Completed
  },
  notes: String,
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
