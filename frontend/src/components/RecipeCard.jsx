import { Link } from "react-router-dom";

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite, canFavorite }) {
  const id = recipe._id || recipe.id;

  return (
    <article className="card card-reveal">
      <img
        src={
          recipe.image ||
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80"
        }
        alt={recipe.title}
      />
      <div className="card-body">
        <div className="card-head">
          <h3>{recipe.title}</h3>
          {canFavorite && (
            <button className="icon-btn" onClick={() => onToggleFavorite(id)}>
              {isFavorite ? "♥" : "♡"}
            </button>
          )}
        </div>
        <p className="meta">
          {recipe.category} | {recipe.cookingTime} min | {recipe.difficulty || "Easy"}
        </p>
        <p className="ingredients-line">{recipe.ingredients?.slice(0, 3).join(", ")}</p>
        <Link className="btn small" to={`/recipes/${id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}

