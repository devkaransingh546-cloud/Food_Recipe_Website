import { useEffect, useState } from "react";
import api from "../api/client";
import RecipeCard from "../components/RecipeCard";

export default function FavoritesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/favorites");
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const toggleFavorite = async (id) => {
    await api.post(`/favorites/${id}`);
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  if (loading) return <p>Loading favorites...</p>;

  return (
    <div className="stack">
      <h1>My Favorites</h1>
      {items.length === 0 ? (
        <p>You have no favorite recipes yet.</p>
      ) : (
        <section className="grid">
          {items.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              isFavorite
              canFavorite
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </section>
      )}
    </div>
  );
}

