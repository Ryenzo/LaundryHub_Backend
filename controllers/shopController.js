import Shop from "../models/Shop.js";

// Get all shops
export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().select('-__v');
    res.json(shops);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ message: "Failed to fetch shops" });
  }
};

// Get shop by ID
export const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).select('-__v');
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json(shop);
  } catch (error) {
    console.error("Error fetching shop:", error);
    res.status(500).json({ message: "Failed to fetch shop" });
  }
};

// Get shop services
export const getShopServices = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).select('services');
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json(shop.services);
  } catch (error) {
    console.error("Error fetching shop services:", error);
    res.status(500).json({ message: "Failed to fetch shop services" });
  }
};

// Seed initial shops (run once)
export const seedShops = async (req, res) => {
  try {
    const shops = [
      // ========== WASH KO LANG ==========
      {
        name: "Wash Ko Lang",
        address: "UNIT 3, 224 AGUINALDO HI-WAY, PANAPAAN 4, BACOOR CITY, CAVITE",
        phone: "099950158804",
        email: "washkolang@laundry.com",
        description: "Open daily 8AM to 6PM. Pick-up and delivery for areas within South from Wash Ko Lang HQ.",
        operatingHours: {
          open: "8:00 AM",
          close: "6:00 PM",
          days: "Open Daily"
        },
        rating: 4.5,
        coordinates: {
          lat: 14.4294,
          lng: 120.9714
        },
        bookingCollection: "bookings_wash_ko_lang",
        services: [
          {
            name: "Regular Clothes",
            description: "MAX OF 8KGS PER LOAD. FULL LAUNDRY SERVICE INCLUSIVE OF DETERGENT, FABRIC CONDITIONER & FINISHING SPRAY - WASH, DRY, FOLD",
            price: 200,
            unit: "per 8kg load",
            duration: "24 hours",
            category: "regular",
            notes: "Includes detergent, fabric conditioner, and finishing spray"
          },
          {
            name: "Comforters",
            description: "MAX OF 8KGS/LOAD - WASH, DRY, FOLD",
            price: 200,
            unit: "per load",
            duration: "24 hours",
            category: "bedding",
            notes: "For comforters, blankets, and heavy bedding"
          },
          {
            name: "Heavy Items / Blankets",
            description: "MAX OF 8KGS/LOAD - WASH, DRY, FOLD",
            price: 200,
            unit: "per load",
            duration: "24 hours",
            category: "heavy",
            notes: "For heavy blankets and bulky items"
          },
          {
            name: "Liquid Detergent Add-on",
            description: "Premium liquid detergent add-on",
            price: 20,
            unit: "per load",
            duration: "N/A",
            category: "add-on",
            notes: "Optional premium detergent"
          },
          {
            name: "Fabric Conditioner Add-on",
            description: "Fabric conditioner add-on for softer clothes",
            price: 20,
            unit: "per load",
            duration: "N/A",
            category: "add-on",
            notes: "Makes clothes softer and fragrant"
          },
          {
            name: "Zonrox Color Safe Add-on",
            description: "Color-safe bleach add-on",
            price: 20,
            unit: "per load",
            duration: "N/A",
            category: "add-on",
            notes: "Color-safe disinfectant bleach"
          },
          {
            name: "Extra Wash Add-on",
            description: "Additional wash cycle",
            price: 20,
            unit: "per load",
            duration: "N/A",
            category: "add-on",
            notes: "For heavily soiled items"
          },
          {
            name: "Extra Dry Add-on",
            description: "Additional drying time",
            price: 20,
            unit: "per load",
            duration: "N/A",
            category: "add-on",
            notes: "For thicker fabrics that need more drying"
          },
          {
            name: "Pick-up & Delivery",
            description: "Door-to-door service for areas within South from Wash Ko Lang HQ",
            price: 50,
            unit: "per service",
            duration: "Same day",
            category: "delivery",
            notes: "Available within service area"
          }
        ]
      },
      // ========== TRIPPLE BUBBLE LAUNDRY ==========
      {
        name: "Tripple Bubble Laundry",
        address: "123 Bubble Street, Bacoor, Cavite",
        phone: "+639123456789",
        email: "tripplebubble@laundry.com",
        description: "Premium laundry service with express options",
        operatingHours: {
          open: "7:00 AM",
          close: "8:00 PM"
        },
        rating: 4.8,
        coordinates: {
          lat: 14.4295,
          lng: 120.9715
        },
        bookingCollection: "bookings_tripple_bubble",
        services: [
          {
            name: "Full Service (8kg)",
            description: "Complete laundry service, detergent and fabcon not included",
            price: 200,
            unit: "per 8kg",
            duration: "24 hours",
            category: "full-service"
          },
          {
            name: "Express Service",
            description: "Received laundry within the day",
            price: 230,
            unit: "per 8kg",
            duration: "Same day",
            category: "full-service"
          },
          {
            name: "Wash Only",
            description: "Washing service only, plastic, detergent & fabcon not included",
            price: 75,
            unit: "per kg",
            duration: "6 hours",
            category: "washing"
          },
          {
            name: "Dry Only",
            description: "Drying service only, plastic, detergent & fabcon not included",
            price: 85,
            unit: "per kg",
            duration: "3 hours",
            category: "drying"
          },
          {
            name: "Fold Only",
            description: "Folding service only",
            price: 30,
            unit: "per kg",
            duration: "1 hour",
            category: "special"
          },
          {
            name: "Comforter Cleaning",
            description: "1 piece per load",
            price: 200,
            unit: "per piece",
            duration: "48 hours",
            category: "special"
          }
        ]
      },
      // ========== MOMMY'S BEST LAUNDRY ==========
      {
        name: "Mommy's Best Laundry",
        address: "456 Mother's Avenue, Imus, Cavite",
        phone: "+639987654321",
        email: "mommysbest@laundry.com",
        description: "Family-friendly laundry service with gentle care",
        operatingHours: {
          open: "8:00 AM",
          close: "7:00 PM"
        },
        rating: 4.6,
        coordinates: {
          lat: 14.4296,
          lng: 120.9716
        },
        bookingCollection: "bookings_mommys_best",
        services: [
          {
            name: "Complete Care Package (7kg)",
            description: "Full service with hypoallergenic detergent included",
            price: 220,
            unit: "per 7kg",
            duration: "24 hours",
            category: "full-service"
          },
          {
            name: "Quick Clean Express",
            description: "Express service with fabric conditioner",
            price: 250,
            unit: "per 7kg",
            duration: "6 hours",
            category: "full-service"
          },
          {
            name: "Gentle Wash",
            description: "Wash with baby-safe detergent",
            price: 80,
            unit: "per kg",
            duration: "5 hours",
            category: "washing"
          },
          {
            name: "Soft Dry",
            description: "Low heat drying for delicate fabrics",
            price: 90,
            unit: "per kg",
            duration: "4 hours",
            category: "drying"
          },
          {
            name: "Baby Clothes Special",
            description: "Special care for baby clothes",
            price: 150,
            unit: "per 3kg",
            duration: "12 hours",
            category: "special"
          },
          {
            name: "Bedding Bundle",
            description: "For comforters, blankets, and bed sheets",
            price: 250,
            unit: "per bundle",
            duration: "36 hours",
            category: "special"
          }
        ]
      }
    ];

    // Clear existing shops and insert new ones
    await Shop.deleteMany({});
    const insertedShops = await Shop.insertMany(shops);
    
    console.log(`✅ Seeded ${insertedShops.length} shops`);
    console.log(`🏪 First shop: ${insertedShops[0]?.name}`);
    console.log(`🛠️ Wash Ko Lang has ${insertedShops[0]?.services?.length || 0} services`);
    
    res.json({
      message: `Shops seeded successfully. Added ${insertedShops.length} shops including Wash Ko Lang.`,
      shops: insertedShops,
      shopCount: insertedShops.length,
      washKoLangServices: insertedShops[0]?.services?.length || 0
    });
  } catch (error) {
    console.error("Error seeding shops:", error);
    res.status(500).json({ message: "Failed to seed shops" });
  }
};