import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping")({
  component: Shipping,
  head: () => ({ meta: [{ title: "Shipping — Lumora" }] }),
});

function Shipping() {
  const sections = [
    { h: "Delivery times", p: "Standard orders ship within 24 hours and arrive in 3–5 business days. Express orders arrive in 1–2 business days." },
    { h: "Shipping charges", p: "Free standard shipping on orders over ₹1499. Below that, standard shipping is ₹99 and express is ₹199." },
    { h: "Order tracking", p: "Once dispatched, you'll receive a tracking link by email and SMS, and can track live from My Orders." },
    { h: "International", p: "International shipping is coming soon. Join our newsletter to be the first to know." },
  ];
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-xs uppercase tracking-wider text-primary font-semibold">Policy</div>
      <h1 className="font-display text-4xl md:text-5xl mt-2">Shipping policy</h1>
      <p className="text-muted-foreground mt-2 text-sm">Last updated: May 2026</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => <section key={s.h}><h2 className="font-display text-2xl">{s.h}</h2><p className="text-muted-foreground mt-2 leading-relaxed">{s.p}</p></section>)}
      </div>
    </div>
  );
}
