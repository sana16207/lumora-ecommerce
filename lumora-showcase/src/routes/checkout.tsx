import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  CreditCard,
  Truck,
  Wallet,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";
import { API_BASE_URL } from "@/lib/api";
import { cn } from "@/lib/utils";
import axios from "axios";
declare global {
  interface Window {
    Razorpay: any;
  }
}
export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const { cart, cartTotal, clearCart, user } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pay, setPay] = useState<"card" | "upi" | "cod">("card");
  const [ship, setShip] = useState<"std" | "exp">("std");
  const [placingOrder, setPlacingOrder] = useState(false);

  const [fullName, setFullName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Login required</h1>
        <Link
          to="/login"
          className="inline-flex mt-6 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground"
        >
          Login
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Nothing to check out</h1>
        <Link
          to="/products"
          className="inline-flex mt-6 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground"
        >
          Shop
        </Link>
      </div>
    );
  }

  const currentUser = user;
  const shipping = ship === "exp" ? 199 : cartTotal > 1499 ? 0 : 99;
  const total = cartTotal + shipping;

  function validateAddress() {
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !addressLine.trim() ||
      !city.trim() ||
      !stateName.trim() ||
      !pincode.trim()
    ) {
      toast.error("Fill all address fields");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Enter valid 10-digit phone number");
      return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Enter valid 6-digit pincode");
      return false;
    }

    return true;
  }

  async function placeOrder() {
    if (placingOrder) return;
if (pay === "cod") {
    try {
      for (const item of cart) {
        await fetch(
          `${API_BASE_URL}/api/orders/place`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: currentUser.id,
              productId: Number(item.id),
              quantity: item.qty,
            }),
          }
        );
      }

      await clearCart();

      toast.success("Order placed (Cash on Delivery)");

      navigate({
        to: "/payment-success",
      });

      return;
    } catch (err) {
      toast.error("COD order failed");
      return;
    }
  }
    setPlacingOrder(true);

    try {
      const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";

await new Promise((resolve) => {
  script.onload = resolve;
  document.body.appendChild(script);
});

console.log("Razorpay =", window.Razorpay);
      const orderResponse = await axios.post(
  `${API_BASE_URL}/api/payment/create-order?amount=${total}`
);

const order = orderResponse.data;
const options = {
  key: "rzp_test_SwOTfdVr5YYvZY",
  amount: order.amount,
  currency: order.currency,
  name: "Lumora",
  description: "Order Payment",
  order_id: order.id,

  handler: async function (response: any) {
  console.log("Payment Success", response);

  try {

    const addressRes = await fetch(
      `${API_BASE_URL}/api/address/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          fullName,
          phone,
          addressLine,
          city,
          state: stateName,
          pincode,
          isDefault: true,
        }),
      }
    );
if (!addressRes.ok) {
  throw new Error("Address save failed");
}

for (const item of cart) {
  const orderRes = await fetch(
    `${API_BASE_URL}/api/orders/place`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.id,
        productId: Number(item.id),
        quantity: item.qty,
      }),
    }
  );

  if (!orderRes.ok) {
    throw new Error("Order failed");
  }
}
console.log("BEFORE CLEAR", cart);
await clearCart();
console.log(
  "AFTER CLEAR",
  localStorage.getItem("lumora-cart")
);
toast.success("Order placed successfully");

navigate({
  to: "/payment-success",
});


  } catch (err) {

    console.error(err);

    toast.error("Order save failed");

    navigate({
      to: "/payment-failed",
    });
  }
},

  prefill: {
    name: fullName,
    email: currentUser.email,
    contact: phone,
  },

  theme: {
    color: "#000000",
  },
};

const razor = new window.Razorpay(options);
razor.open();

setPlacingOrder(false);
return;
      

    } catch (error) {
      console.error(error);

      toast.error("Order failed / Product out of stock");

      navigate({
        to: "/payment-failed",
      });
    } finally {
      setPlacingOrder(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="flex items-center gap-4 mb-10 flex-wrap">
        {["Address", "Shipping", "Payment"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center font-semibold",
                step > i + 1
                  ? "bg-green-500 text-white"
                  : step === i + 1
                  ? "bg-primary text-white"
                  : "bg-muted"
              )}
            >
              {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full h-12 border px-4 rounded-xl"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 border px-4 rounded-xl"
          />

          <input
            placeholder="Address"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            className="w-full h-12 border px-4 rounded-xl"
          />

          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-12 border px-4 rounded-xl"
          />

          <input
            placeholder="State"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            className="w-full h-12 border px-4 rounded-xl"
          />

          <input
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full h-12 border px-4 rounded-xl"
          />

          <button
            onClick={() => {
              if (validateAddress()) {
                setStep(2);
              }
            }}
            className="px-6 py-3 rounded-full bg-primary text-white"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <button
            onClick={() => setShip("std")}
            className={cn(
              "w-full p-4 border rounded-xl",
              ship === "std" && "border-primary"
            )}
          >
            Standard Shipping
          </button>

          <button
            onClick={() => setShip("exp")}
            className={cn(
              "w-full p-4 border rounded-xl",
              ship === "exp" && "border-primary"
            )}
          >
            Express Shipping (+â‚¹199)
          </button>

          <button
            onClick={() => setStep(3)}
            className="px-6 py-3 rounded-full bg-primary text-white"
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <button
            onClick={() => setPay("card")}
            className={cn(
              "w-full p-4 border rounded-xl flex items-center gap-2",
              pay === "card" && "border-primary"
            )}
          >
            <CreditCard />
            Card
          </button>

          <button
            onClick={() => setPay("upi")}
            className={cn(
              "w-full p-4 border rounded-xl flex items-center gap-2",
              pay === "upi" && "border-primary"
            )}
          >
            <Wallet />
            UPI
          </button>

          <button
            onClick={() => setPay("cod")}
            className={cn(
              "w-full p-4 border rounded-xl flex items-center gap-2",
              pay === "cod" && "border-primary"
            )}
          >
            <Truck />
            Cash on Delivery
          </button>

          <button
            onClick={placeOrder}
            disabled={placingOrder}
            className="w-full px-6 py-4 rounded-full bg-primary text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {placingOrder ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>Place Order â‚¹{total}</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
