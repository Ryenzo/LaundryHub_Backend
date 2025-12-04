import Booking, { createShopBookingModel } from "../models/Booking.js";
import Admin from "../models/Admin.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { emitToUser, emitToShop } from "../utils/socketManager.js";

// 1. Get bookings for the admin's specific shop
export const getMyShopBookings = async (req, res) => {
  try {
    // req.adminId is set by adminMiddleware
    const admin = await Admin.findById(req.adminId).populate("shopId");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Get shop-specific bookings
    const ShopBooking = createShopBookingModel(admin.shopId._id.toString());
    const bookings = await ShopBooking.find()
      .populate("customerId", "firstname lastname email phone")
      .sort({ createdAt: -1 });

    res.json({
      shop: {
        id: admin.shopId._id,
        name: admin.shopId.name
      },
      bookings
    });
  } catch (error) {
    console.error("Error fetching shop bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// Get all bookings for admin's shop (simpler endpoint for dashboard)
export const getAllBookings = async (req, res) => {
  try {
    // req.adminId is set by adminMiddleware
    const admin = await Admin.findById(req.adminId).populate("shopId");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Get shop-specific bookings
    const ShopBooking = createShopBookingModel(admin.shopId._id.toString());
    const bookings = await ShopBooking.find()
      .populate("customerId", "firstname lastname email phone address")
      .sort({ createdAt: -1 });

    // Return just the bookings array (not wrapped in object)
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// 2. Get filtered bookings by status for admin's shop
export const getMyShopBookingsByStatus = async (req, res) => {
  try {
    const { status } = req.params; // 'pending', 'confirmed', 'processing', 'completed', 'declined'

    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const ShopBooking = createShopBookingModel(admin.shopId.toString());
    const bookings = await ShopBooking.find({ status })
      .populate("customerId", "firstname lastname email phone")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings by status:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// 3. Get one booking (only if it belongs to admin's shop)
export const getBookingById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const ShopBooking = createShopBookingModel(admin.shopId.toString());
    const booking = await ShopBooking.findById(req.params.id)
      .populate("customerId", "firstname lastname email phone");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Failed to fetch booking" });
  }
};

// 4. Update booking status (only for admin's shop)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update in shop-specific collection
    const ShopBooking = createShopBookingModel(admin.shopId.toString());
    const booking = await ShopBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found in your shop" });
    }

    booking.status = status;
    await booking.save();

    // Also update in main bookings collection for user history
    await Booking.findByIdAndUpdate(req.params.id, { status });

    // Create notification for the user
    const notificationMessage = `Your booking #${booking._id.toString().slice(-6)} status has been updated to ${status}.`;

    await Notification.create({
      userId: booking.customerId,
      shopId: admin.shopId,
      bookingId: booking._id,
      title: "Booking Status Update",
      message: notificationMessage,
      type: "status_update"
    });

    // ✅ REAL-TIME UPDATE: Emit status change via WebSocket
    // Get user to send their firebaseUid
    const user = await User.findById(booking.customerId);
    if (user) {
      const statusUpdateData = {
        bookingId: booking._id,
        status: status,
        booking: booking.toObject()
      };

      // Notify the user who owns this booking
      emitToUser(user.firebaseUid, 'booking_status_updated', statusUpdateData);

      // Also notify other admins in the same shop
      emitToShop(admin.shopId.toString(), 'booking_status_updated', statusUpdateData);
    }

    res.json({ message: "Status updated successfully", booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

// 5. Delete a booking (only from admin's shop)
export const deleteBooking = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const ShopBooking = createShopBookingModel(admin.shopId.toString());
    const booking = await ShopBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found in your shop" });
    }

    // Also delete from main bookings collection
    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Failed to delete booking" });
  }
};
