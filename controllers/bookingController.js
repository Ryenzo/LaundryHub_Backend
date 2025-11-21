import Booking from "../models/Booking.js";
import User from "../models/User.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    console.log("Booking request received");
    
    const { firebaseUid, serviceType, weight, price, pickupDate, deliveryDate, notes } = req.body;

    // TEMPORARY: Create a user if doesn't exist
    let user = await User.findOne({ firebaseUid });
    if (!user) {
      user = new User({
        firebaseUid,
        name: 'Customer',
        email: `${firebaseUid}@temp.com`,
        password: 'temp',
        role: 'customer'
      });
      await user.save();
    }

    const booking = new Booking({
      customerId: user._id,
      serviceType,
      weight,
      price,
      pickupDate,
      deliveryDate,
      notes,
    });

    await booking.save();
    return res.status(201).json({ success: true, booking });
    
  } catch (error) {
    console.error("Booking creation error:", error);
    return res.status(500).json({ 
      message: "Failed to create booking",
      error: error.message 
    });
  }
};

// Get bookings for a user
export const getBookingsByUser = async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    // TEMPORARY: Return dummy data for testing
    res.json({
      success: true,
      message: `Bookings for user ${firebaseUid}`,
      bookings: [
        {
          _id: "temp-booking-1",
          serviceType: "Wash & Fold",
          status: "Completed",
          price: 250,
          pickupDate: "2024-01-10T10:00:00.000Z"
        }
      ]
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};