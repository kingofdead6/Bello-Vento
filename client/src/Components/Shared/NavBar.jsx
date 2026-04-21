"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";
import Logo from "../../assets/Logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserType] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Check auth status
  const checkAuth = () => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserType(decoded.usertype);
      } catch {
        setUserType(null);
      }
    } else {
      setUserType(null);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleChange = () => checkAuth();

    window.addEventListener("storage", handleChange);
    window.addEventListener("authChanged", handleChange);

    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener("authChanged", handleChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUserType(null);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  // Navigation
  const normalNavItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Menu", link: "/menu" },
    { name: "Reservation", link: "/reservation" },
  ];

  const adminNavItems = [
    { name: "Dashboard", link: "/admin/dashboard" },
    { name: "Menu", link: "/admin/menu" },
  ];

  const superadminNavItems = [
    { name: "Dashboard", link: "/admin/dashboard" },
    { name: "Categories", link: "/admin/categories" },
    { name: "Menu", link: "/admin/menu" },
    { name: "Users", link: "/admin/users" },
  ];

  const navItems =
    userType === "superadmin"
      ? superadminNavItems
      : userType === "admin"
      ? adminNavItems
      : normalNavItems;

  const isAdmin = userType === "admin" || userType === "superadmin";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50">
        <div
          className={`max-w-7xl mx-auto px-6 py-5 flex items-center justify-between backdrop-blur-2xl transition-all duration-300 shadow-lg rounded-b-3xl border-b border-stone-800 ${
            isAdmin
              ? "bg-[#0c0a08]/95 text-stone-200"
              : "bg-[#0c0a08]/90 text-stone-200"
          }`}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-12 w-auto" />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 font-medium text-lg">
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.link;

              return (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.link}
                    className={`pb-1 transition-all duration-300 ${
                      isActive
                        ? "text-amber-400 border-b-2 border-amber-400 font-semibold"
                        : "text-stone-300 hover:text-amber-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="cursor-pointer px-5 py-2 text-sm font-medium text-stone-300 hover:text-amber-400 transition"
              >
                Déconnexion
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-3xl text-stone-300"
            >
              {menuOpen ? (
                <XMarkIcon className="w-8 h-8" />
              ) : (
                <Bars3Icon className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0c0a08] border-t border-stone-800 shadow-xl px-6 py-8"
          >
            <ul className="space-y-6 text-xl font-medium">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 transition ${
                      location.pathname === item.link
                        ? "text-amber-400 font-semibold"
                        : "text-stone-300 hover:text-amber-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
}