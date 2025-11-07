import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ favoritesCount }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* 📖 / 📘 Toggle button */}
      <button
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Open Sidebar" : "Close Sidebar"}
      >
        {collapsed ? "📔" : "📖"}
      </button>

      {/* Sidebar content (hidden when collapsed) */}
      {!collapsed && (
        <>
          <h2>🍴 World Cuisine</h2>
          <p>Discover and favorite recipes!</p>
          <div className="favorite-count">❤️ Favorites: {favoritesCount}</div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
