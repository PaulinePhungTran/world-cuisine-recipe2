import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DetailView from "./components/DetailView";
import Sidebar from "./components/Sidebar";
import "./App.css";

/**
 * App.jsx
 * Main entry for your World Cuisine Recipe project 🍜
 * Handles sidebar layout + routes for Dashboard and Recipe Details.
 */

function App() {
  // Track favorite count globally
  const [favoritesCount, setFavoritesCount] = useState(0);

  return (
    <div className="app-layout">
      {/* 🧭 Sidebar visible on all pages */}
      <Sidebar favoritesCount={favoritesCount} />

      {/* 🌎 Main content area */}
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Dashboard setFavoritesCount={setFavoritesCount} />}
          />
          <Route path="/recipe/:id" element={<DetailView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
