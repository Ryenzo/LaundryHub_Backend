import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
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
    default: "pending",
  },
  notes: String,
}, { timestamps: true });

// Dynamic model creation for shop-specific collections
export const createShopBookingModel = (shopId) => {
  const collectionName = `bookings_${shopId}`;
  
  // Check if model already exists
  if (mongoose.models[collectionName]) {
    return mongoose.models[collectionName];
  }
  
  return mongoose.model(collectionName, bookingSchema, collectionName);
};

// Main booking model for general queries
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;