// In controllers/bookingController.js - TEMPORARY
export const createBooking = async (req, res) => {
  try {
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
    return res.status(500).json({ message: "Failed to create booking" });
  }
};