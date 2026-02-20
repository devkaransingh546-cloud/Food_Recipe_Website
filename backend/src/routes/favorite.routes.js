import { Router } from "express";
import auth from "../middleware/auth.middleware.js";
import { getFavorites, toggleFavorite } from "../controllers/favorite.controller.js";

const router = Router();

router.use(auth);
router.get("/", getFavorites);
router.post("/:recipeId", toggleFavorite);

export default router;

