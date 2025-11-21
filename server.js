import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminBookingRoutes from "./routes/adminBookingRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5353',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/admin/bookings", adminBookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Laundry API is running...");
});

app.get("/api/test", (req, res) => {
  res.send("API test route is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));