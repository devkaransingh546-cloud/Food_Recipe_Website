import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <img src="/images/logo.png" alt="Smart Recipe Hub Logo" className="brand-logo" />
          <span>Smart Recipe Hub</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          {isAuthenticated && <NavLink to="/favorites">Favorites</NavLink>}
        </nav>
        <div className="nav-actions">
          <button className="btn ghost" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
          {isAuthenticated ? (
            <>
              <span className="user-pill">{user?.name}</span>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
