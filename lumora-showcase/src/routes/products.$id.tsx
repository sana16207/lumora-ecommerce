import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RefreshCw,
  Shield,
  Zap,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { API_BASE_URL } from "@/lib/api";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  component: PDP,
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

type Review = {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
};

function PDP() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, user } = useApp();

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [related, setRelated] = useState<ApiProduct[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [tab, setTab] = useState<
    "description" | "reviews" | "shipping"
  >("description");

  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);

        fetch(`${API_BASE_URL}/api/products`)
          .then((r) => r.json())
          .then((all) => {
            const rel = all.filter(
              (p: ApiProduct) =>
                p.category === data.category &&
                p.id !== data.id
            );
            setRelated(rel.slice(0, 4));
          });
      });

    fetch(`${API_BASE_URL}/api/reviews/product/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        Loading product...
      </div>
    );
  }

  const gallery = [
    product.imageUrl ||
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
  ];

  const saved = wishlist.includes(String(product.id));

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";
        return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div
            className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <img
              src={gallery[active]}
              alt={product.name}
              className={cn(
                "h-full w-full object-cover transition-transform duration-500",
                zoom && "scale-125"
              )}
            />
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.category}
          </div>

          <h1 className="font-display text-4xl mt-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-mint/60 text-sm font-semibold">
              {avgRating}
              <Star className="h-3 w-3 fill-current" />
            </span>

            <span className="text-sm text-muted-foreground">
              {reviews.length} reviews
            </span>
          </div>

          <div className="mt-5">
            <span className="font-display text-4xl font-semibold">
              â‚¹{product.price}
            </span>
          </div>

          <div className="mt-4">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold",
                product.stock > 0
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              )}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of stock"}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <div className="inline-flex items-center border border-border rounded-full">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="h-11 w-11 inline-flex items-center justify-center"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="w-10 text-center font-semibold">
                {qty}
              </span>

              <button
                onClick={() => setQty(qty + 1)}
                className="h-11 w-11 inline-flex items-center justify-center"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => toggleWishlist(String(product.id))}
              className={cn(
                "h-11 w-11 rounded-full border border-border inline-flex items-center justify-center",
                saved && "text-primary border-primary"
              )}
            >
              <Heart
                className={cn("h-4 w-4", saved && "fill-primary")}
              />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={() =>
                addToCart(String(product.id), { qty })
              }
              className="py-3 rounded-full border-2 border-foreground font-semibold inline-flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(String(product.id), { qty });
                navigate({ to: "/checkout" });
              }}
              className="py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold inline-flex items-center justify-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 border-b border-border flex gap-6">
        {(["description", "reviews", "shipping"] as const).map(
          (t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "py-3 text-sm font-semibold capitalize border-b-2",
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              )}
            >
              {t}
            </button>
          )
        )}
      </div>

      <div className="py-8">
        {tab === "description" && (
          <p>{product.description}</p>
        )}

        {tab === "reviews" && (
          <ReviewsBlock
            reviews={reviews}
            productId={product.id}
            userId={user?.id}
          />
        )}

        {tab === "shipping" && (
          <div>
            Free shipping over â‚¹1499
          </div>
        )}
      </div>

      <section className="py-10">
        <h2 className="font-display text-2xl mb-6">
          Related Products
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((r) => (
  <ProductCard
    key={r.id}
    p={{
      id: String(r.id),
      name: r.name,
      price: r.price,
      originalPrice: r.price + 500,
      image: r.imageUrl,
      brand: r.category,
      rating: 4.5,
      reviews: 120,
    }}
  />
))}
        </div>
      </section>
    </div>
  );
}

function ReviewsBlock({
  reviews,
  productId,
  userId,
}: {
  reviews: Review[];
  productId: number;
  userId?: number;
}) {
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");

  async function submitReview(e: React.FormEvent) {
    e.preventDefault();

    if (!userId) {
      alert("Login first");
      return;
    }

    await fetch(`${API_BASE_URL}/api/reviews/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        rating: stars,
        comment: text,
      }),
    });

    window.location.reload();
  }

  return (
    <div>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-card border rounded-2xl p-5"
          >
            <div className="flex gap-1 text-amber-500">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-current"
                />
              ))}
            </div>

            <p className="mt-2">{r.comment}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={submitReview}
        className="mt-6 bg-gradient-blush rounded-2xl p-5"
      >
        <div className="font-semibold mb-2">
          Write Review
        </div>

        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setStars(i + 1)}
            >
              <Star
                className={cn(
                  "h-5 w-5",
                  i < stars
                    ? "fill-amber-500 text-amber-500"
                    : "text-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Write review..."
          className="w-full px-3 py-2 rounded-xl border"
        />

        <button className="mt-3 px-5 py-2 rounded-full bg-gradient-primary text-white">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default PDP;
