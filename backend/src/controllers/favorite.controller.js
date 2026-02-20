import mongoose from "mongoose";
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "favorites",
        select: "title image category cookingTime ingredients createdAt"
      })
      .lean();

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ items: user.favorites || [] });
  } catch (err) {
    return next(err);
  }
};

export const toggleFavorite = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: "Invalid recipe id" });
    }

    const recipe = await Recipe.findById(recipeId).lean();
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const exists = user.favorites.some((id) => id.toString() === recipeId);
    if (exists) {
      user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);
    } else {
      user.favorites.push(recipeId);
    }
    await user.save();

    return res.json({
      message: exists ? "Removed from favorites" : "Added to favorites",
      isFavorite: !exists
    });
  } catch (err) {
    return next(err);
  }
};

