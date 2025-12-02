import mongoose from "mongoose";
import dotenv from "dotenv";
import Shop from "../models/Shop.js";

dotenv.config();

const getShopIds = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("📡 Connected to MongoDB\n");

        const shops = await Shop.find();

        console.log("🏪 LaundryHub Shops:\n");
        console.log("=".repeat(60));

        shops.forEach((shop, index) => {
            console.log(`\n${index + 1}. ${shop.name}`);
            console.log(`   Shop ID: ${shop._id}`);
            console.log(`   Address: ${shop.address}`);
            console.log(`   Email: ${shop.email}`);
        });

        console.log("\n" + "=".repeat(60));
        console.log("\n📝 To create an admin for a shop, use:");
        console.log("\nPOST /api/auth/admin/register");
        console.log('{\n  "name": "Admin Name",\n  "email": "admin@email.com",\n  "password": "yourpassword",\n  "shopId": "<Shop ID from above>"\n}');

    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
        process.exit(0);
    }
};

getShopIds();
