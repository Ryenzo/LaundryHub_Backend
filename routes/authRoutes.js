import express from "express";
import { registerUser, loginUser, adminLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/sync-firebase-user", syncFirebaseUser);

export default router;
