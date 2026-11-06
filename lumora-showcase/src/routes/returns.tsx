import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  component: Returns,
  head: () => ({ meta: [{ title: "Returns & Refunds — Lumora" }] }),
});

function Returns() {
  const sections = [
    { h: "Return window", p: "Most items can be returned within 30 days of delivery in unused, original condition with tags intact." },
    { h: "Non-returnable", p: "Beauty, intimates, swimwear, and final-sale items are not eligible for return." },
    { h: "How to return", p: "Initiate a return from My Orders. Our courier will pick up the parcel from your address within 2–3 business days, free of charge." },
    { h: "Refunds", p: "Refunds are issued to your original payment method within 3–7 business days after we receive and inspect the return." },
    { h: "Exchanges", p: "Exchanges for size/color are processed as a refund + new order to keep things simple and fast." },
  ];
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-xs uppercase tracking-wider text-primary font-semibold">Policy</div>
      <h1 className="font-display text-4xl md:text-5xl mt-2">Returns & refunds</h1>
      <p className="text-muted-foreground mt-2 text-sm">Last updated: May 2026</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.h}><h2 className="font-display text-2xl">{s.h}</h2><p className="text-muted-foreground mt-2 leading-relaxed">{s.p}</p></section>
        ))}
      </div>
    </div>
  );
}
