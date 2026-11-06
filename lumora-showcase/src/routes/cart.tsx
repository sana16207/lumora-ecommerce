import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, Tag } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const {
    cart,
    productById,
    updateQty,
    removeFromCart,
    cartTotal,
  } = useApp();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping =
    cart.length === 0
      ? 0
      : cartTotal > 1499
      ? 0
      : 99;

  const finalTotal =
    Math.max(cartTotal - discount, 0) + shipping;

  async function applyCoupon() {
    if (!coupon.trim()) {
      toast.error("Enter coupon code");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/coupons/validate/${coupon}`
      );

      if (!res.ok) {
        throw new Error();
      }
      
      const data = await res.json();

console.log("COUPON RESPONSE =", data);

const percentage = Number(
  data.discountPercent ??
  data.discountPercentage ??
  data.percentage ??
  data.discount ??
  0
);

const discountAmount =
  (cartTotal * percentage) / 100;
      setDiscount(discountAmount);

      localStorage.setItem("coupon", coupon);
      localStorage.setItem(
        "discount",
        String(discountAmount)
      );

      toast.success("Coupon applied");
    } catch {
      toast.error("Invalid coupon");
    }
  }
console.log("CART PAGE RENDER");
console.log(cart);
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-7xl">ðŸ›’</div>

        <h1 className="text-4xl font-bold mt-4">
          Your cart is empty
        </h1>

        <p className="text-muted-foreground mt-3">
          Add something beautiful to your cart.
        </p>

        <Link
          to="/products"
          className="inline-flex mt-6 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {cart.map((item) => {
            const product = productById(item.id);

            if (!product) return null;

            return (
              <div
                key={item.id}
                className="border rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {product.name}
                  </h2>

                  <p className="text-muted-foreground">
                    {product.brand}
                  </p>

                  <p className="text-lg font-bold mt-2">
                    â‚¹{product.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => {
                        if (item.qty > 1) {
                          updateQty(item.id, item.qty - 1);
                        }
                      }}
                      className="h-10 w-10 rounded-full border flex items-center justify-center"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="font-semibold text-lg">
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(item.id, item.qty + 1)
                      }
                      className="h-10 w-10 rounded-full border flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="ml-4 text-red-500 flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-xl font-bold">
                  â‚¹
                  {(
                    product.price * item.qty
                  ).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-5">
            Order Summary
          </h2>

          <div className="flex gap-3 mb-5">
            <input
              value={coupon}
              onChange={(e) =>
                setCoupon(e.target.value)
              }
              placeholder="Coupon code"
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <button
              onClick={applyCoupon}
              className="px-5 py-3 rounded-xl bg-black text-white flex items-center gap-2"
            >
              <Tag className="h-4 w-4" />
              Apply
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                â‚¹{cartTotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">
                -â‚¹{discount.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? "FREE"
                  : `â‚¹${shipping}`}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                â‚¹{finalTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-6 w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold inline-flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

