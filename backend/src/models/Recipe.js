import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    description: {
      type: String,
      required: true,
      maxlength: 800
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy"
    },
    image: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Dessert",
        "Snack",
        "Healthy",
        "Drink",
        "Vegan",
        "Vegetarian",
        "Seafood"
      ]
    },
    cookingTime: {
      type: Number,
      required: true,
      min: 1
    },
    ingredients: {
      type: [String],
      required: true,
      validate: [(arr) => arr.length > 0, "At least one ingredient required"]
    },
    instructions: {
      type: [String],
      required: true,
      validate: [(arr) => arr.length > 0, "At least one instruction required"]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

recipeSchema.index({ title: "text", ingredients: "text", description: "text" });
recipeSchema.index({ category: 1, cookingTime: 1, createdAt: -1 });
recipeSchema.index({ ingredients: 1 });

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
