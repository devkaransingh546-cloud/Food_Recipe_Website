import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import SearchFilters from "../components/SearchFilters";
import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../context/AuthContext";
import seedRecipes from "../data/seedRecipes";

const applyLocalFilters = (items, filters) => {
  return items.filter((recipe) => {
    const q = filters.q.trim().toLowerCase();
    const ingredient = filters.ingredient.trim().toLowerCase();
    const matchQ =
      !q ||
      recipe.title.toLowerCase().includes(q) ||
      recipe.description.toLowerCase().includes(q) ||
      recipe.ingredients.some((item) => item.toLowerCase().includes(q));
    const matchIngredient =
      !ingredient || recipe.ingredients.some((item) => item.toLowerCase().includes(ingredient));
    const matchCategory = !filters.category || recipe.category === filters.category;
    const matchMaxTime = !filters.maxTime || recipe.cookingTime <= Number(filters.maxTime);

    return matchQ && matchIngredient && matchCategory && matchMaxTime;
  });
};

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [filters, setFilters] = useState({
    q: "",
    ingredient: "",
    category: "",
    maxTime: ""
  });
  const [recipes, setRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usingLocalData, setUsingLocalData] = useState(false);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.ingredient) params.set("ingredient", filters.ingredient);
    if (filters.category) params.set("category", filters.category);
    if (filters.maxTime) params.set("maxTime", filters.maxTime);
    params.set("limit", "24");
    return params.toString();
  }, [filters]);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/recipes?${queryString}`);
      const fromApi = data.items || [];
      if (fromApi.length > 0) {
        setRecipes(fromApi);
        setUsingLocalData(false);
      } else {
        setRecipes(applyLocalFilters(seedRecipes, filters));
        setUsingLocalData(true);
      }
    } catch (_err) {
      setRecipes(applyLocalFilters(seedRecipes, filters));
      setUsingLocalData(true);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    if (!isAuthenticated) {
      setFavoriteIds([]);
      return;
    }
    try {
      const { data } = await api.get("/favorites");
      setFavoriteIds((data.items || []).map((item) => item._id));
    } catch (_err) {
      setFavoriteIds([]);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, [queryString]);

  useEffect(() => {
    loadFavorites();
  }, [isAuthenticated]);

  const toggleFavorite = async (id) => {
    if (id.startsWith("seed-")) return;
    await api.post(`/favorites/${id}`);
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="stack">
      <section className="hero">
        <div className="hero-content">
          <img src="/images/logo.png" alt="Smart Recipe Hub Logo" className="hero-logo" />
          <p className="kicker">Taste-forward Recipes</p>
          <h1>Cook Something Amazing Today</h1>
          <p>Search by ingredient, filter by category and cooking time, and save your favorite dishes.</p>
        </div>
      </section>

      <SearchFilters filters={filters} setFilters={setFilters} />
      {usingLocalData && <p className="meta">Showing built-in recipes. Start backend + MongoDB to use API data.</p>}

      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found. Try a different search.</p>
      ) : (
        <section className="grid">
          {recipes.map((recipe, index) => (
            <div key={recipe._id} style={{ "--stagger": index }} className="stagger-wrap">
              <RecipeCard
                recipe={recipe}
                isFavorite={favoriteIds.includes(recipe._id)}
                onToggleFavorite={toggleFavorite}
                canFavorite={isAuthenticated}
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
