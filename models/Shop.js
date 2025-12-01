import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  duration: String,
  category: {
    type: String,
    enum: ['washing', 'drying', 'full-service', 'special', 'regular',
    'bedding',      
    'heavy',        
    'add-on',      
    'delivery'],
    default: 'washing'
  }
});

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: String,
  description: String,
  operatingHours: {
    open: String,
    close: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  services: [serviceSchema],
  coordinates: {
    lat: Number,
    lng: Number,
  },
  bookingCollection: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;