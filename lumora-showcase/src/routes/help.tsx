import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Search, Truck, RotateCcw, CreditCard, User, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/help")({ component: Help, head: () => ({ meta: [{ title: "Help Center — Lumora" }] }) });

const topics = [
  { icon: ShoppingBag, title: "Orders", desc: "Order status, modifications, cancellations" },
  { icon: Truck, title: "Shipping", desc: "Delivery times, tracking, charges" },
  { icon: RotateCcw, title: "Returns", desc: "Returns, refunds, exchanges" },
  { icon: CreditCard, title: "Payments", desc: "Methods, refunds, EMI" },
  { icon: User, title: "Account", desc: "Profile, addresses, password" },
];

const faqs = [
  { q: "How do I track my order?", a: "Go to My Orders and click Track. We'll show you live status from dispatch to delivery." },
  { q: "What's the return window?", a: "30 days from delivery for most items. Beauty, intimates and final-sale items are non-returnable." },
  { q: "How long do refunds take?", a: "Refunds reach your original payment method in 3–7 business days after the return is received." },
  { q: "Do you ship internationally?", a: "Currently we ship across India. International shipping is coming soon." },
  { q: "Can I cancel my order?", a: "Yes — within 1 hour of placing the order, from My Orders. After that, please contact support." },
  { q: "Are your products authentic?", a: "100%. Every product is sourced directly from the brand or an authorized partner." },
];

function Help() {
  const [q, setQ] = useState("");
  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-14 text-center">
          <div className="text-xs uppercase tracking-wider text-primary font-semibold">Help center</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">How can we help?</h1>
          <div className="relative max-w-xl mx-auto mt-7">
            <Search className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="w-full h-14 pl-12 pr-4 rounded-full bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/30 shadow-soft" />
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {topics.map((t) => (
            <div key={t.title} className="bg-card border border-border rounded-2xl p-5 card-hover">
              <div className="h-10 w-10 rounded-full bg-gradient-blush flex items-center justify-center text-primary mb-3"><t.icon className="h-5 w-5" /></div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 max-w-3xl">
        <h2 className="font-display text-3xl mb-6">Frequently asked</h2>
        <div className="space-y-2">
          {filtered.map((f, i) => <FaqItem key={i} {...f} />)}
        </div>
        <div className="mt-10 bg-gradient-blush rounded-3xl p-8 text-center">
          <h3 className="font-display text-2xl">Still need help?</h3>
          <p className="text-muted-foreground mt-1">Our team is online 9am–9pm IST, every day.</p>
          <Link to="/contact" className="inline-flex mt-5 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium">Contact us</Link>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-2xl">
      <button onClick={() => setOpen(!open)} className="w-full p-5 flex items-center justify-between text-left">
        <span className="font-semibold">{q}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open && "rotate-180"}`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}
