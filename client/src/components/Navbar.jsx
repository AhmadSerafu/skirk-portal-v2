import { NavLink, Link, useNavigate } from "react-router";
import { useState } from "react";
import skirkIcon from "../assets/skirk-icon.webp";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  const navLinks = [
    { to: "/characters", label: "Characters" },
    { to: "/builds", label: "My Builds" },
    { to: "/ai", label: "AI Analyzer" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-void-900/80 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={skirkIcon}
            alt="Skirk"
            className="w-10 h-10 object-contain mb-3"
          />
          <span className="font-cinzel text-xl font-bold text-gold tracking-wider">
            Skirk Portal
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-cinzel text-xs tracking-widest uppercase transition-colors ${
                  isActive
                    ? "text-gold border-b border-gold pb-0.5"
                    : "text-parchment-dim hover:text-gold"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

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

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-gold transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gold transition-all ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gold transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-void-900/95 border-t border-gold/20 px-6 flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `font-cinzel text-sm tracking-widest uppercase transition-colors ${
                isActive ? "text-gold" : "text-parchment-dim hover:text-gold"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {isLoggedIn ? (
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="btn-outline text-xs py-1.5 px-4 w-fit"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="btn-outline text-xs py-1.5 px-4 w-fit"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
