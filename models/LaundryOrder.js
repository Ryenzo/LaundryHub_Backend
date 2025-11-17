import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    customer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    // Allow MULTIPLE service types (array of strings)
    serviceType: [
      {
        type: String,
        enum: ["wash", "dry", "fold", "iron"],
        required: true
      }
    ],

    weight: { type: Number, required: true },

    status: { 
      type: String, 
      enum: ["pending", "in-progress", "completed"], 
      default: "pending" 
    },

    pickupDate: { type: Date },
    deliveryDate: { type: Date },
    totalCost: { type: Number }
  },
  { timestamps: true }
);

const LaundryOrder = mongoose.model("LaundryOrder", orderSchema);
export default LaundryOrder;
