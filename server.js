import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Existing LaundryHub routes
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import adminBookingRoutes from "./routes/adminBookingRoutes.js";

// NEW: Chatbot route
import chatbotRoutes from "./routes/chatbotRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin/bookings", adminBookingRoutes);

// NEW: Chatbot API
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/notifications", notificationRoutes);

// Test routes
app.get("/", (req, res) => {
  res.send("Laundry API is running...");
});

app.get("/api/test", (req, res) => {
  res.send("API test route is working!");
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
