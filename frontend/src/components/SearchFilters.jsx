const CATEGORIES = [
  "",
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
];

export default function SearchFilters({ filters, setFilters }) {
  return (
    <section className="filters">
      <input
        type="search"
        placeholder="Search by title or text..."
        value={filters.q}
        onChange={(e) => setFilters((p) => ({ ...p, q: e.target.value }))}
      />
      <input
        type="search"
        placeholder="Ingredient (e.g. tomato)"
        value={filters.ingredient}
        onChange={(e) => setFilters((p) => ({ ...p, ingredient: e.target.value }))}
      />
      <select
        value={filters.category}
        onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat || "all"} value={cat}>
            {cat || "All Categories"}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={1}
        placeholder="Max cook time (min)"
        value={filters.maxTime}
        onChange={(e) => setFilters((p) => ({ ...p, maxTime: e.target.value }))}
      />
    </section>
  );
}
