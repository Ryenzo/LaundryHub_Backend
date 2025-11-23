import express from "express";
import { registerUser, loginUser, adminLogin, registerAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", adminLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
