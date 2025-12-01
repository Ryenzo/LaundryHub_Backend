import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  unit: String,
  duration: String,
  category: String,
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;