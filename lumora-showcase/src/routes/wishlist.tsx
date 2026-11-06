import { createFileRoute, Link } from "@tanstack/react-router";
import { X, ShoppingBag } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/wishlist")({ component: Wishlist, head: () => ({ meta: [{ title: "Wishlist — Lumora" }] }) });

function Wishlist() {
  const { wishlist, productById, removeWishlist, addToCart } = useApp();
  if (wishlist.length === 0) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="text-6xl">💝</div>
      <h1 className="font-display text-3xl mt-4">Your wishlist is empty</h1>
      <p className="text-muted-foreground mt-2">Tap the heart on any product to save it here.</p>
      <Link to="/products" className="inline-flex mt-6 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium">Discover products</Link>
    </div>
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl md:text-4xl mb-6">My wishlist <span className="text-muted-foreground text-lg">({wishlist.length})</span></h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlist.map((id) => {
          const p = productById(id); if (!p) return null;
          return (
            <div key={id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <Link to="/products/$id" params={{ id }} className="block aspect-[4/5] overflow-hidden bg-muted relative">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                <button onClick={(e) => { e.preventDefault(); removeWishlist(id); }} className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/90 flex items-center justify-center"><X className="h-4 w-4" /></button>
              </Link>
              <div className="p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{p.brand}</div>
                <Link to="/products/$id" params={{ id }} className="font-medium text-sm line-clamp-1">{p.name}</Link>
                <div className="font-semibold mt-1">₹{p.price.toLocaleString()}</div>
                <button onClick={() => { addToCart(id); removeWishlist(id); }} className="mt-3 w-full h-9 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold inline-flex items-center justify-center gap-1.5">
                  <ShoppingBag className="h-3.5 w-3.5" /> Move to bag
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
