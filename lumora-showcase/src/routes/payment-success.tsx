import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/payment-success")({
  component: Success,
});

function Success() {
  const { user } = useApp();

  return (
    <div className="container mx-auto px-4 py-20 max-w-xl text-center">
      <div className="h-24 w-24 rounded-full bg-gradient-mint mx-auto flex items-center justify-center mb-6">
        <CheckCircle2 className="h-12 w-12 text-emerald-700" />
      </div>

      <h1 className="font-display text-4xl">Order confirmed</h1>

      <p className="text-muted-foreground mt-2">
        Thanks {user?.name || "there"}.
        Your order has been placed successfully.
      </p>

      <div className="bg-card border border-border rounded-2xl p-6 mt-6 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <span className="font-semibold text-emerald-600">SUCCESS</span>
        </div>

        <div className="flex justify-between text-sm mt-2">
          <span className="text-muted-foreground">Payment</span>
          <span className="font-semibold">Completed</span>
        </div>

        <div className="flex justify-between text-sm mt-2">
          <span className="text-muted-foreground">Email confirmation</span>
          <span className="font-semibold">Sent</span>
        </div>
      </div>

      <div className="flex gap-3 justify-center mt-7">
        <Link
          to="/orders"
          className="px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium"
        >
          View orders
        </Link>

        <Link
          to="/products"
          className="px-6 py-3 rounded-full border border-border font-medium"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

export default Success;