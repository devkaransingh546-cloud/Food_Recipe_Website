import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import {
  listRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from "../controllers/recipe.controller.js";

const router = Router();

router.get("/", listRecipes);
router.get("/:id", getRecipeById);
router.post("/", auth, createRecipe);
router.put("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);

export default router;

