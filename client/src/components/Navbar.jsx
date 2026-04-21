import { NavLink, Link, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-void-900/80 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/character"
          className="font-cinzel text-xl font-bold text-gold tracking-wider"
        >
          Skirk Portal
        </Link>

        {/* Links + Auth */}
        <div className="flex items-center gap-8">
          <NavLink
            to="/characters"
            className={({ isActive }) =>
              `font-cinzel text-xs tracking-widest uppercase transition-colors ${
                isActive
                  ? "text-gold border-b border-gold pb-0.5"
                  : "text-parchment-dim hover:text-gold"
              }`
            }
          >
            Characters
          </NavLink>

          <NavLink
            to="/builds"
            className={({ isActive }) =>
              `font-cinzel text-xs tracking-widest uppercase transition-colors ${
                isActive
                  ? "text-gold border-b border-gold pb-0.5"
                  : "text-parchment-dim hover:text-gold"
              }`
            }
          >
            My Builds
          </NavLink>

          <NavLink
            to="/ai"
            className={({ isActive }) =>
              `font-cinzel text-xs tracking-widest uppercase transition-colors ${
                isActive
                  ? "text-gold border-b border-gold pb-0.5"
                  : "text-parchment-dim hover:text-gold"
              }`
            }
          >
            AI Analyzer
          </NavLink>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn-outline text-xs py-1.5 px-4 w-fit"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-outline text-xs py-1.5 px-4 w-fit">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
