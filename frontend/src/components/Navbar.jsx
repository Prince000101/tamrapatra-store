import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Gem, ShoppingCart, Heart, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../hook/CartHook";
import useWishlistHook from "../hook/WishlistHook";
import useAuth from "../hook/AuthContextHook";
import DarkModeToggle from "./DarkModeToggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "Our Story", path: "/about" },
  { name: "Journal", path: "/journal" },
  { name: "Contact", path: "/contact" },
  { name: "Track Order", path: "/track-order" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart = [] } = useCart() || {};
  const { wishlist: WishlistItems = [] } = useWishlistHook();
  const { user, logout } = useAuth() || {};
  const cartCount = cart.length;
  const WishlistCount = WishlistItems.length;

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-ivory/80 dark:bg-plum/80 border-b border-gold/20 dark:border-gold/10"
    >
      {/* Top decorative gold line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="text-gold"
          >
            <Gem size={28} strokeWidth={1.5} />
          </motion.div>
          <span className="text-2xl font-heading font-semibold text-indigo dark:text-ivory tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            TAMRAPATRA
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-body font-medium tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "text-gold dark:text-gold-light"
                      : "text-warm-grey dark:text-ivory/60 hover:text-indigo dark:hover:text-ivory"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </motion.div>
          ))}

          {user ? (
            <>
              {user.isAdmin && (
                <motion.div whileHover={{ y: -2 }}>
                  <NavLink
                    to="/admin"
                    className="flex items-center gap-1.5 text-sm font-body font-medium text-gold dark:text-gold-light hover:text-gold-dark dark:hover:text-gold transition-colors"
                  >
                    <Shield size={14} /> Admin
                  </NavLink>
                </motion.div>
              )}
              <motion.button
                whileHover={{ y: -2 }}
                onClick={logout}
                className="text-sm font-body font-medium text-warm-grey dark:text-ivory/60 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <motion.div whileHover={{ y: -2 }}>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-body font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? "text-gold dark:text-gold-light" : "text-warm-grey dark:text-ivory/60 hover:text-indigo dark:hover:text-ivory"
                  }`
                }
              >
                Login
              </NavLink>
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <Link to="/Wishlist" className="relative">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Heart className="text-indigo dark:text-ivory" size={20} strokeWidth={1.5} />
              {WishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-[9px] font-body font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {WishlistCount}
                </span>
              )}
            </motion.div>
          </Link>

          <Link to="/cart" className="relative">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <ShoppingCart className="text-indigo dark:text-ivory" size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo text-ivory text-[9px] font-body font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </motion.div>
          </Link>

          <div className="hidden md:block">
            <DarkModeToggle />
          </div>

          <button
            className="lg:hidden text-indigo dark:text-ivory p-1 ml-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-ivory dark:bg-plum border-t border-gold/20 dark:border-gold/10"
          >
            <div className="px-6 py-8 space-y-6">
              <div className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-heading ${
                        isActive ? "text-gold dark:text-gold-light" : "text-indigo dark:text-ivory/60"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                {user ? (
                  <>
                    {user.isAdmin && (
                      <NavLink
                        to="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 text-lg font-heading text-gold dark:text-gold-light"
                      >
                        <Shield size={20} /> Admin Panel
                      </NavLink>
                    )}
                    <button
                      onClick={() => { logout(); setMenuOpen(false); }}
                      className="flex items-center gap-2 text-lg font-heading text-red-600 text-left"
                    >
                      <LogOut size={20} /> Logout
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-heading ${isActive ? "text-gold" : "text-indigo dark:text-ivory/60"}`
                    }
                  >
                    Login / Register
                  </NavLink>
                )}
              </div>

              <div className="flex items-center gap-6 border-t border-gold/20 dark:border-gold/10 pt-6">
                <Link to="/Wishlist" onClick={() => setMenuOpen(false)} className="relative">
                  <Heart className="text-indigo dark:text-ivory" size={22} strokeWidth={1.5} />
                  {WishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold text-white text-[9px] font-body font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {WishlistCount}
                    </span>
                  )}
                </Link>
                <Link to="/cart" onClick={() => setMenuOpen(false)} className="relative">
                  <ShoppingCart className="text-indigo dark:text-ivory" size={22} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo text-ivory text-[9px] font-body font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <DarkModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
