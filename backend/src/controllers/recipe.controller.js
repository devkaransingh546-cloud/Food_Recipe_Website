import mongoose from "mongoose";
import Recipe from "../models/Recipe.js";

const buildQuery = ({ q, category, maxTime, ingredient }) => {
  const query = {};

  if (q) {
    query.$text = { $search: q };
  }
  if (category) {
    query.category = category;
  }
  if (maxTime) {
    query.cookingTime = { $lte: Number(maxTime) };
  }
  if (ingredient) {
    query.ingredients = { $elemMatch: { $regex: ingredient, $options: "i" } };
  }

  return query;
};

export const listRecipes = async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(24, Math.max(1, Number(req.query.limit) || 12));
    const skip = (page - 1) * limit;
    const query = buildQuery(req.query);

    const [items, total] = await Promise.all([
      Recipe.find(query)
        .select("title image category cookingTime ingredients createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Recipe.countDocuments(query)
    ]);

    res.json({
      items,
      pagination: { total, page, pages: Math.ceil(total / limit), limit }
    });
  } catch (err) {
    next(err);
  }
};

export const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid recipe id" });
    }

    const recipe = await Recipe.findById(id).populate("createdBy", "name email").lean();
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    return res.json(recipe);
  } catch (err) {
    return next(err);
  }
};

export const createRecipe = async (req, res, next) => {
  try {
    const body = req.body;
    const required = ["title", "description", "category", "cookingTime", "ingredients", "instructions"];
    for (const field of required) {
      if (!body[field]) return res.status(400).json({ message: `Missing field: ${field}` });
    }

    const recipe = await Recipe.create({ ...body, createdBy: req.user.id });
    return res.status(201).json(recipe);
  } catch (err) {
    return next(err);
  }
};

export const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid recipe id" });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(recipe, req.body);
    await recipe.save();
    return res.json(recipe);
  } catch (err) {
    return next(err);
  }
};

export const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid recipe id" });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await recipe.deleteOne();
    return res.json({ message: "Recipe deleted" });
  } catch (err) {
    return next(err);
  }
};

