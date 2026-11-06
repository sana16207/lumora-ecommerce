import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";

export const Route = createFileRoute("/payment-failed")({
  component: Failed,
});

function Failed() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-xl text-center">
      <div className="h-24 w-24 rounded-full bg-destructive/10 mx-auto flex items-center justify-center mb-6">
        <XCircle className="h-12 w-12 text-destructive" />
      </div>

      <h1 className="font-display text-4xl">Payment failed</h1>

      <p className="text-muted-foreground mt-2">
        Payment could not be completed. No worries — you can retry checkout.
      </p>

      <div className="flex gap-3 justify-center mt-7">
        <Link
          to="/checkout"
          className="px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium"
        >
          Try Again
        </Link>

        <Link
          to="/cart"
          className="px-6 py-3 rounded-full border border-border font-medium"
        >
          Back to Cart
        </Link>
      </div>
    </div>
  );
}

export default Failed;