import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import seedRecipes from "../data/seedRecipes.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    let user = await User.findOne({ email: "demo@recipes.local" });
    if (!user) {
      user = await User.create({
        name: "Demo Chef",
        email: "demo@recipes.local",
        password: "demo1234"
      });
    }

    await Recipe.deleteMany({ createdBy: user._id });
    await Recipe.insertMany(seedRecipes.map((item) => ({ ...item, createdBy: user._id })));

    console.log(`Seeded ${seedRecipes.length} recipes.`);
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();

