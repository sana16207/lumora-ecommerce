import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { API_BASE_URL } from "@/lib/api";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});

type ApiProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
};

type UIProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  brand: string;
  rating: number;
  reviews: number;
  badge?: string;
  stock: number;
};

function ProductsPage() {
  const [products, setProducts] = useState<UIProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        return res.json();
      })
      .then((data: ApiProduct[]) => {
        const mapped: UIProduct[] = data.map((p) => ({
          id: String(p.id),
          name: p.name,
          price: p.price,
          originalPrice: p.price + 500,
          image:
            p.imageUrl && p.imageUrl !== "test"
              ? p.imageUrl
              : "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
          brand: p.category,
          rating: 4.5,
          reviews: 120,
          badge: p.stock === 0 ? "Out of Stock" : "New",
          stock: p.stock,
        }));

        setProducts(mapped);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.brand))];
    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.brand === category);
    }

    if (sort === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, category, sort]);

  return (
    <>
      <Outlet />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="default">Sort</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {loading && (
          <div className="text-center text-lg font-medium">
            Loading products...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 text-lg font-medium">
            {error}
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 text-lg">
            No products found
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="relative">
                {p.stock === 0 && (
                  <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    Out of Stock
                  </div>
                )}

                <ProductCard p={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ProductsPage;
