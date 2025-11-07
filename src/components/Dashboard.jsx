import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Card from "./Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./Dashboard.css";

function Dashboard({ setFavoritesCount }) {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch recipes from Spoonacular API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${
            searchQuery || "pasta"
          }&number=20&apiKey=7178786dafcf4a08a64c407a6455f44e`
        );
        setRecipes(res.data.results);
        setError(null);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Oops! Couldn’t load recipes. Try again later.");
      }
    };
    fetchRecipes();
  }, [searchQuery]);

  // ✅ Filter recipes by cuisine
  const filteredRecipes = recipes.filter((recipe) =>
    filterCuisine ? recipe.cuisine === filterCuisine : true
  );

  // ✅ Handle favorites (updates sidebar count)
  const toggleFavorite = (recipe) => {
    const updatedFavorites = favorites.find((fav) => fav.id === recipe.id)
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
    setFavoritesCount(updatedFavorites.length); // 🔥 syncs count with sidebar
  };

  const displayedRecipes = showFavorites ? favorites : filteredRecipes;
  const totalRecipes = filteredRecipes.length;

  // ✅ Chart data
  const cuisineCounts = [
    { name: "Italian", value: recipes.filter((r) => r.title.includes("Italian")).length },
    { name: "Asian", value: recipes.filter((r) => r.title.includes("Asian")).length },
    { name: "Mexican", value: recipes.filter((r) => r.title.includes("Mexican")).length },
    { name: "American", value: recipes.filter((r) => r.title.includes("American")).length },
  ];

  const favData = [
    { name: "Favorites", value: favorites.length },
    { name: "Others", value: totalRecipes - favorites.length },
  ];

  const COLORS = ["#82ca9d", "#8884d8"];

  return (
    <div className="dashboard">
      {/* 🧭 Header (below sidebar) */}
      <Header />

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 🌎 Filter Dropdown */}
      <select onChange={(e) => setFilterCuisine(e.target.value)}>
        <option value="">All Cuisines</option>
        <option value="Italian">Italian</option>
        <option value="Asian">Asian</option>
        <option value="Mexican">Mexican</option>
        <option value="American">American</option>
      </select>

      {/* 💛 Favorites Toggle */}
      <button className="toggle-btn" onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Show All Recipes" : "❤️ Show Favorites Only"}
      </button>

      {/* 📊 Summary Stats */}
      <div className="stats">
        <p>Total Recipes: {totalRecipes}</p>
        <p>❤️ Favorites: {favorites.length}</p>
      </div>

      {/* ⚠️ Error Message */}
      {error && <p className="error">{error}</p>}

      {/* 🧾 Recipe List */}
      {displayedRecipes.length === 0 ? (
        <p className="empty">No recipes found ❌</p>
      ) : (
        <div className="recipe-list">
          {displayedRecipes.map((recipe) => (
            <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="link-card">
              <Card
                recipe={recipe}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.some((fav) => fav.id === recipe.id)}
              />
            </Link>
          ))}
        </div>
      )}

      {/* 📈 Charts Section */}
      <div className="charts-section">
        <h2>Recipe Insights</h2>

        <div className="charts-container">
          {/* 🍝 Bar Chart */}
          <BarChart width={400} height={250} data={cuisineCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>

          {/* ❤️ Pie Chart */}
          <PieChart width={400} height={250}>
            <Pie
              data={favData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {favData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
