import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";
import type { Product } from "@/data/catalog";

type UserType = {
  id: number;
  token: string;
  email: string;
  name: string;
  role: string;
};

type CartItem = {
  id: string;
  qty: number;
};

type AppContextType = {
  user: UserType | null;

  wishlist: string[];
  cart: CartItem[];

  cartCount: number;
  cartTotal: number;

  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
  clearCart: () => Promise<void>;

  toggleWishlist: (id: string) => void;
  removeWishlist: (id: string) => void;

  addToCart: (id: string, options?: { qty?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;

  productById: (id: string) => Product | undefined;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
  console.log("PRODUCTS =", products);
}, [products]);
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("lumora-user");
      console.log(
  "LUMORA USER =",
  JSON.parse(localStorage.getItem("lumora-user") || "null")
);

console.log(
  "LUMORA.DOT.USER =",
  JSON.parse(localStorage.getItem("lumora.user") || "null")
);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      if (savedUser) {
  const parsedUser = JSON.parse(savedUser);
  setUser(parsedUser);

  const savedWishlist = localStorage.getItem(
    `lumora-wishlist-${parsedUser.id}`
  );

  if (savedWishlist) {
    setWishlist(JSON.parse(savedWishlist));
  }
}

      const savedCart = localStorage.getItem("lumora-cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error("Failed to load local storage data", err);
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:8080/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        const mappedProducts: Product[] = (Array.isArray(data) ? data : []).map(
          (p: any) => ({
            id: String(p.id),
            name: p.name ?? "",
            brand: p.category ?? "Lumora",
            category: p.category ?? "",
            price: Number(p.price ?? 0),
            originalPrice: Number(p.price ?? 0) + 500,
            rating: 4.5,
            reviews: 120,
            image:
              p.imageUrl ||
              "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&h=1000&fit=crop&auto=format&q=80",
            images: p.imageUrl ? [p.imageUrl] : undefined,
            badge: p.stock === 0 ? "Out of Stock" : "New",
            colors: [],
            sizes: [],
            description: p.description ?? "",
            specs: [],
            stock: Number(p.stock ?? 0),
            tags: [],
          })
        );

        setProducts(mappedProducts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProducts();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("LOGIN RESPONSE =", data);
      if (data.token) {
        const userData: UserType = {
          id: data.userId,
          token: data.token,
          email: data.email,
          name: data.name,
          role: data.role,
        };

        setUser(userData);
        localStorage.setItem("token", data.token);
        localStorage.setItem("lumora-user", JSON.stringify(userData));

        toast.success("Login successful");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "ADMIN",
        }),
      });

      const data = await response.json();
      console.log("LOGIN RESPONSE =", data);
      if (data.token) {
        console.log(data);
        const userData: UserType = {
          id: data.userId,
          token: data.token,
          email: data.email,
          name: data.name,
          role: "ADMIN",
        };

        setUser(userData);
        localStorage.setItem("token", data.token);
        localStorage.setItem("lumora-user", JSON.stringify(userData));

        toast.success("Admin registered");
      } else {
        toast.error(data.message || "Register failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

localStorage.setItem(
  `lumora-wishlist-${user?.id}`,
  JSON.stringify(updated)
);
        return updated;
    });
  };

  const removeWishlist = (id: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((x) => x !== id);
localStorage.setItem(
  `lumora-wishlist-${user?.id}`,
  JSON.stringify(updated)
);
      return updated;
    });
  };

  const addToCart = (id: string, options?: { qty?: number }) => {
    const qty = options?.qty ?? 1;

    setCart((prev) => {
      const existing = prev.find((x) => x.id === id);

      let updated: CartItem[];

      if (existing) {
        updated = prev.map((x) =>
          x.id === id ? { ...x, qty: x.qty + qty } : x
        );
      } else {
        updated = [...prev, { id, qty }];
      }

      localStorage.setItem("lumora-cart", JSON.stringify(updated));
      return updated;
    });

    toast.success("Added to cart");
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter((x) => x.id !== id);
      localStorage.setItem("lumora-cart", JSON.stringify(updated));
      return updated;
    });
  };

  const updateQty = (id: string, qty: number) => {
    setCart((prev) => {
      const updated = prev.map((x) => (x.id === id ? { ...x, qty } : x));
      localStorage.setItem("lumora-cart", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem("lumora-cart");
  };

  const productById = (
  id: string
) => {
  console.log(
    "SEARCHING:",
    id,
    products.map((p) => p.id)
  );

  return products.find(
    (p) => String(p.id) === String(id)
  );
};

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartTotal = cart.reduce((sum, item) => {
    const product = productById(item.id);
    if (!product) return sum;
    return sum + product.price * item.qty;
  }, 0);

  const logout = () => {
    localStorage.removeItem("lumora-user");
    localStorage.removeItem("token");
    setWishlist([]);
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        wishlist,
        cart,
        cartCount,
        cartTotal,
        login,
        register,
        logout,
        toggleWishlist,
        removeWishlist,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        productById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}