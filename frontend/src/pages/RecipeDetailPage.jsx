import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";
import seedRecipes from "../data/seedRecipes";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await api.get(`/recipes/${id}`);
        setRecipe(data);
        if (isAuthenticated && !id.startsWith("seed-")) {
          const fav = await api.get("/favorites");
          setIsFavorite((fav.data.items || []).some((x) => x._id === id));
        }
      } catch (_err) {
        const local = seedRecipes.find((item) => item._id === id);
        setRecipe(local || null);
      }
    };
    run();
  }, [id, isAuthenticated]);

  const toggleFavorite = async () => {
    if (id.startsWith("seed-")) return;
    await api.post(`/favorites/${id}`);
    setIsFavorite((v) => !v);
  };

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <article className="detail">
      <img
        className="detail-image"
        src={
          recipe.image ||
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80"
        }
        alt={recipe.title}
      />
      <div className="detail-content">
        <h1>{recipe.title}</h1>
        <p className="meta">
          {recipe.category} | {recipe.cookingTime} min | {recipe.difficulty || "Easy"}
        </p>
        <p>{recipe.description}</p>
        {isAuthenticated && !id.startsWith("seed-") && (
          <button className="btn" onClick={toggleFavorite}>
            {isFavorite ? "Remove Favorite" : "Save Favorite"}
          </button>
        )}
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </article>
  );
}

