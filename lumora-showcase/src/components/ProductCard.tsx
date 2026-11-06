import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  brand: string;
  rating: number;
  reviews: number;
  badge?: string;
};

export function ProductCard({ p }: { p: Product }) {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
  } = useApp();

  const saved = wishlist.includes(p.id);

  const off =
    p.originalPrice > p.price
      ? Math.round(
          ((p.originalPrice - p.price) /
            p.originalPrice) *
            100
        )
      : 0;

  return (
    <div className="group relative card-hover bg-card rounded-2xl overflow-hidden border border-border/60">
      <Link
        to="/products/$id"
        params={{ id: p.id }}
        className="block relative aspect-[4/5] overflow-hidden bg-muted"
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {p.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider z-20">
            {p.badge}
          </span>
        )}

        {off > 0 && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gradient-primary text-primary-foreground text-[10px] font-bold z-20">
            -{off}%
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(p.id);
          }}
          className={cn(
            "absolute bottom-3 right-3 z-30 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center transition-all hover:scale-110",
            saved && "text-primary"
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4",
              saved && "fill-primary"
            )}
          />
        </button>
      </Link>

      <div className="relative z-40 p-4">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
          {p.brand}
        </div>

        <Link
          to="/products/$id"
          params={{ id: p.id }}
        >
          <h3 className="font-medium text-sm line-clamp-1 hover:text-primary transition-colors">
            {p.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1.5">
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-mint/60 text-[11px] font-semibold">
            {p.rating.toFixed(1)}
            <Star className="h-2.5 w-2.5 fill-current" />
          </span>

          <span className="text-[11px] text-muted-foreground">
            ({p.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold">
            ₹{p.price.toLocaleString()}
          </span>

          {p.originalPrice > p.price && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{p.originalPrice.toLocaleString()}
            </span>
          )}

          {off > 0 && (
            <span className="text-xs font-semibold text-emerald-600">
              ({off}% off)
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(p.id);
          }}
          className="relative z-50 mt-3 w-full h-10 rounded-full border border-border text-xs font-semibold inline-flex items-center justify-center gap-2 hover:bg-gradient-primary hover:text-primary-foreground hover:border-transparent transition-all"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;