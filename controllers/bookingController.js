import Booking, { createShopBookingModel } from "../models/Booking.js";
import User from "../models/User.js";
import Shop from "../models/Shop.js";

// Create a new booking in shop-specific collection
export const createBooking = async (req, res) => {
  try {
    const { firebaseUid, shopId, serviceType, weight, price, pickupDate, deliveryDate, notes } = req.body;

    // Find the MongoDB user linked to Firebase UID
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    // Find the shop
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Create booking in shop-specific collection
    const ShopBooking = createShopBookingModel(shop._id.toString());
    
    const booking = new ShopBooking({
      customerId: user._id,
      shopId: shop._id,
      serviceType,
      weight,
      price,
      pickupDate,
      deliveryDate,
      notes,
      phone: req.body.phone || user.phone,
      address: req.body.address || user.address,
    });

    await booking.save();
    
    // Also save to main bookings collection for user history
    const mainBooking = new Booking({
      ...booking.toObject(),
      _id: booking._id // Keep same ID for reference
    });
    await mainBooking.save();

    return res.status(201).json({ 
      success: true, 
      booking,
      shopName: shop.name 
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    return res.status(500).json({ message: "Failed to create booking" });
  }
};

// Get bookings for a user from ALL shops (booking history)
export const getBookingsByUser = async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookings = await Booking.find({ customerId: user._id, status: 'completed' })
      .populate("shopId", "name address phone")
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// Get bookings for a specific shop (Admin view)
export const getBookingsByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    
    const ShopBooking = createShopBookingModel(shopId);
    const bookings = await ShopBooking.find()
      .populate("customerId", "firstname lastname email phone")
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching shop bookings:", error);
    res.status(500).json({ message: "Failed to fetch shop bookings" });
  }
};

// Get all bookings (Admin) - from all shops
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customerId", "firstname lastname email phone")
      .populate("shopId", "name address")
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// Get booking statistics for dashboard
export const getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const processingBookings = await Booking.countDocuments({ status: 'processing' });

    // Get recent bookings (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentBookings = await Booking.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      total: totalBookings,
      pending: pendingBookings,
      completed: completedBookings,
      processing: processingBookings,
      recent: recentBookings
    });
  } catch (error) {
    console.error("Error fetching booking stats:", error);
    res.status(500).json({ message: "Failed to fetch booking statistics" });
  }
};