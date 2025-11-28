import express from "express";
import { 
  registerUser, 
  loginUser, 
  adminLogin, 
  registerAdmin,
  updateUserProfile  // ADD THIS IMPORT
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";  // ADD THIS IMPORT
const router = express.Router();
router.post("/admin/register", registerAdmin);
router.post("/admin/login", adminLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update-profile", protect, updateUserProfile);  // ADD THIS ROUTE
export default router;