import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Package, RotateCcw, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import { API_BASE_URL } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders")({
  component: Orders,
});

type Order = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  status: string;
};

const tone: Record<string, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-rose-100 text-rose-700",
  PROCESSING: "bg-amber-100 text-amber-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
};

function Orders() {
  const { user, productById, addToCart } = useApp();
console.log("USER =", user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
  console.log("FETCH ORDERS RUNNING");
  console.log("USER =", user);
    if (!user) {
    setLoading(false);
    return;
  }

  try {
    console.log("USER ID =", user?.id);
console.log(
  "REQUEST URL =",
  `${API_BASE_URL}/api/orders/user/${user?.id}`
);
    const res = await fetch(
      `${API_BASE_URL}/api/orders/user/${user?.id}`
    );
    console.log("REQUEST URL =", `${API_BASE_URL}/api/orders/user/${user.id}`);
console.log("STATUS =", res.status);
    console.log("ORDER STATUS =", res.status);

    if (!res.ok) {
      throw new Error("Failed to load");
    }

    const data = await res.json();
    console.log("ORDERS DATA =", data);
    console.log("ORDERS DATA =", data);

    setOrders(data);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load orders");
  } finally {
    setLoading(false);
  }
}

  async function cancelOrder(orderId: number) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/orders/cancel/${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Cancel failed");
      }

      toast.success("Order cancelled");

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: "CANCELLED" }
            : order
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Cancel failed");
    }
  }

  async function reorder(productId: number) {
    try {
      await addToCart(String(productId));
      toast.success("Added back to cart");
    } catch (err) {
      console.error(err);
      toast.error("Reorder failed");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold">Login required</h1>

        <Link
          to="/login"
          className="inline-flex mt-6 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground"
        >
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Loading orders...</h1>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold">No orders yet</h1>

        <Link
          to="/products"
          className="inline-flex mt-6 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const product = productById(String(order.productId));

          return (
            <div
              key={order.id}
              className="border rounded-2xl p-6 bg-card"
            >
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Order #{order.id}
                  </p>

                  <h2 className="text-xl font-semibold mt-1">
                    ₹{order.totalPrice.toLocaleString()}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Quantity: {order.quantity}
                  </p>
                </div>

                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-semibold h-fit",
                    tone[order.status] || "bg-muted"
                  )}
                >
                  {order.status}
                </span>
              </div>

              {product && (
                <div className="flex gap-4 mt-5 items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-lg">
                      {product.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {product.brand}
                    </p>

                    <p className="font-medium mt-1">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-5">
                
  <div className="w-full border rounded-xl p-3">
  <p className="font-semibold mb-2">Tracking Status</p>

  <div className="flex gap-2 flex-wrap">
    <span
      className={`px-3 py-1 rounded-full ${
        ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"].includes(order.status)
          ? "bg-green-500 text-white"
          : "bg-gray-200"
      }`}
    >
      PLACED
    </span>

    <span
      className={`px-3 py-1 rounded-full ${
        ["PROCESSING", "SHIPPED", "DELIVERED"].includes(order.status)
          ? "bg-green-500 text-white"
          : "bg-gray-200"
      }`}
    >
      PROCESSING
    </span>

    <span
      className={`px-3 py-1 rounded-full ${
        ["SHIPPED", "DELIVERED"].includes(order.status)
          ? "bg-green-500 text-white"
          : "bg-gray-200"
      }`}
    >
      SHIPPED
    </span>

    <span
      className={`px-3 py-1 rounded-full ${
        order.status === "DELIVERED"
          ? "bg-green-500 text-white"
          : "bg-gray-200"
      }`}
    >
      DELIVERED
    </span>
  </div>
</div>

                <button
                  onClick={() => reorder(order.productId)}
                  className="px-4 py-2 border rounded-full text-sm flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reorder
                </button>

                {order.status !== "CANCELLED" && (
                  <button
                    onClick={() => cancelOrder(order.id)}
                    className="px-4 py-2 border border-rose-300 text-rose-600 rounded-full text-sm flex items-center gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
