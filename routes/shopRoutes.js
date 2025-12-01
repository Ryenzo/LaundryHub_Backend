import express from "express";
import { 
  getAllShops, 
  getShopById, 
  getShopServices,
  seedShops 
} from "../controllers/shopController.js";

const router = express.Router();

// GET /api/shops - Get all shops
router.get("/", getAllShops);

// GET /api/shops/:id - Get shop by ID
router.get("/:id", getShopById);

// GET /api/shops/:id/services - Get shop services
router.get("/:id/services", getShopServices);

// POST /api/shops/seed - Seed initial shops (admin only)
router.post("/seed", seedShops);

export default router;