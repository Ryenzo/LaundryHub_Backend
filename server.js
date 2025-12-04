import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import { initializeSocket, handleConnection } from "./utils/socketManager.js";

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
const httpServer = createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins for development (restrict in production)
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Initialize socket manager
initializeSocket(io);

// Handle Socket.io connections
io.on("connection", handleConnection);

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
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 Socket.io server ready on port ${PORT}`);
});

