import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// ----------------------
// ADMIN LOGIN
// ----------------------
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, role: "admin" });
  if (!admin) {
    return res.status(401).json({ message: "Not authorized as admin" });
  }

  if (await admin.matchPassword(password)) {
    return res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } else {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }
};

// ----------------------
// USER REGISTRATION
// ----------------------
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, role });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// ----------------------
// USER LOGIN
// ----------------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Sync Firebase user to MongoDB
export const syncFirebaseUser = async (req, res) => {
  try {
    const { firebaseUid, name, email } = req.body;

    // Check if user already exists
    let user = await User.findOne({ 
      $or: [
        { firebaseUid: firebaseUid },
        { email: email }
      ]
    });

    if (!user) {
      // Create new user linked to Firebase
      user = new User({
        firebaseUid,
        name,
        email,
        password: 'firebase-auth', // Dummy password
        role: 'customer'
      });
      await user.save();
    } else if (!user.firebaseUid) {
      // Link existing user to Firebase
      user.firebaseUid = firebaseUid;
      await user.save();
    }

    res.json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Firebase user sync error:", error);
    res.status(500).json({ message: "Failed to sync user" });
  }
};