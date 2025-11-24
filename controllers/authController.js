import User from "../models/User.js";
import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";

// ----------------------
// ADMIN LOGIN
// ----------------------
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: "Not authorized as admin" });
  }

  if (await admin.matchPassword(password)) {
    return res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
      token: generateToken(admin._id),
    });
  } else {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }
};

// ----------------------
// ADMIN REGISTRATION
// ----------------------
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) return res.status(400).json({ message: "Admin already exists" });

  const admin = await Admin.create({ name, email, password });
  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
      token: generateToken(admin._id),
    });
  } else {
    res.status(400).json({ message: "Invalid admin data" });
  }
};

// ----------------------
// USER REGISTRATION
// ----------------------
export const registerUser = async (req, res) => {
  // UPDATED: Extract firstname and lastname instead of name
  const { firstname, lastname, email, password, phone, firebaseUid, role } = req.body;

  // Ensure role is valid (though model enum handles this, good to be explicit if needed, but we'll rely on model)
  // Prevent "admin" role from being passed if someone tries to bypass
  if (role === "admin") {
    return res.status(400).json({ message: "Cannot register as admin here" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  // UPDATED: Create user with firstname and lastname
  const user = await User.create({ 
    firstname, 
    lastname, 
    email, 
    password, 
    phone, 
    firebaseUid, 
    role 
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname, // UPDATED: Return firstname
      lastname: user.lastname,   // UPDATED: Return lastname
      email: user.email,
      phone: user.phone,
      firebaseUid: user.firebaseUid,
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
      firstname: user.firstname, // UPDATED: Return firstname
      lastname: user.lastname,   // UPDATED: Return lastname
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};