import { Link } from "@tanstack/react-router";
import {
  Menu,
  Search,
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";

import { useState } from "react";
import { useApp } from "@/context/AppContext";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const {
    user,
    logout,
    wishlist,
    cartCount,
  } = useApp();

  const categories = [
    "Women",
    "Men",
    "Beauty",
    "Home",
    "Tech",
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="bg-primary text-white text-sm text-center py-2">
          Festive Sale — up to 60% off
        </div>

        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>

            <Link
              to="/"
              className="text-3xl font-bold tracking-wide"
            >
              LUMORA
            </Link>
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {categories.map((item) => (
              <Link
                key={item}
                to="/products"
                search={{ category: item }}
                className="hover:text-primary transition"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button>
              <Search className="w-5 h-5" />
            </button>

            <Link to="/login">
              <User className="w-5 h-5" />
            </Link>

            <div className="relative">
              <Link to="/wishlist">
                <Heart className="w-5 h-5" />
              </Link>

              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>

            <div className="relative">
              <Link to="/cart">
                <ShoppingBag className="w-5 h-5" />
              </Link>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {user && (
              <button
                onClick={logout}
                className="text-sm font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <aside className="bg-white w-72 h-full p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                Menu
              </h2>

              <button onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            <ul className="space-y-5">
              {categories.map((item) => (
                <li key={item}>
                  <Link
                    to="/products"
                    search={{ category: item }}
                    onClick={() => setOpen(false)}
                    className="text-lg"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t pt-6 space-y-4">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block"
              >
                Register
              </Link>

              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="block"
              >
                Cart
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default Navbar;