import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import Shop from "../models/Shop.js";

dotenv.config();

const migrateAdmins = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("📡 Connected to MongoDB");

        // Get all shops
        const shops = await Shop.find();
        console.log(`\n🏪 Available Shops:`);
        shops.forEach((shop, index) => {
            console.log(`${index + 1}. ${shop.name} (ID: ${shop._id})`);
        });

        // Get all admins
        const admins = await Admin.find();
        console.log(`\n👤 Found ${admins.length} admin(s) to migrate\n`);

        if (admins.length === 0) {
            console.log("No admins found. You may need to create admin accounts first.");
            process.exit(0);
        }

        // Interactive migration - you can customize this
        // For now, let's assign shops in order
        for (let i = 0; i < admins.length; i++) {
            const admin = admins[i];
            const shop = shops[i % shops.length]; // Cycle through shops

            admin.shopId = shop._id;
            admin.shopName = shop.name;
            await admin.save();

            console.log(`✅ Linked ${admin.email} → ${shop.name}`);
        }

        console.log("\n✨ Migration completed successfully!");
        console.log("\n📋 Summary:");

        const updatedAdmins = await Admin.find().populate("shopId", "name");
        updatedAdmins.forEach(admin => {
            console.log(`  - ${admin.email} → ${admin.shopName}`);
        });

    } catch (error) {
        console.error("❌ Migration error:", error);
    } finally {
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
    }
};

migrateAdmins();
