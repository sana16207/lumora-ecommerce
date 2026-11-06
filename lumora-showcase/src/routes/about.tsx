import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Leaf, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({ component: About, head: () => ({ meta: [{ title: "About — Lumora" }] }) });

function About() {
  return (
    <div>
      <section className="bg-gradient-hero">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl text-center">
          <div className="text-xs uppercase tracking-wider text-primary font-semibold">About Lumora</div>
          <h1 className="font-display text-4xl md:text-6xl mt-3 leading-tight">A quieter, more considered way to shop.</h1>
          <p className="text-muted-foreground mt-5 text-lg">Lumora is a curated marketplace built around one belief — that the things we live with deserve more thought. Fewer, better choices, from labels we genuinely love.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-blush shadow-glow">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format" className="h-full w-full object-cover" alt="" />
        </div>
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Our story</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">Founded in 2024 by a small team of editors, designers and craftspeople, Lumora began as a list — of the brands we loved, the makers we trusted, and the pieces we kept reaching for. Today it's a destination where independent ateliers and iconic houses share the same shelf, each chosen by hand.</p>
          <h3 className="font-display text-2xl mt-8">Mission</h3>
          <p className="text-muted-foreground mt-3 leading-relaxed">To make considered shopping effortless — and to give the makers we love a platform that treats them, and their work, with care.</p>
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="container mx-auto px-4 py-16">
          <h2 className="font-display text-3xl md:text-4xl text-center mb-10">Why choose Lumora</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { i: <Sparkles className="h-5 w-5" />, t: "Hand-curated", d: "Every brand vetted by our editors." },
              { i: <ShieldCheck className="h-5 w-5" />, t: "100% Authentic", d: "Sourced from brands directly." },
              { i: <Leaf className="h-5 w-5" />, t: "Conscious shipping", d: "Plastic-free packaging." },
              { i: <Heart className="h-5 w-5" />, t: "Made with care", d: "Service that treats you like a guest." },
            ].map((b) => (
              <div key={b.t} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-gradient-blush mx-auto flex items-center justify-center text-primary mb-3">{b.i}</div>
                <div className="font-semibold">{b.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-4">
          {[["200k+","Members"],["12k+","Brands"],["1M+","Orders shipped"],["4.9★","Avg rating"]].map(([n, l]) => (
            <div key={l} className="bg-gradient-blush rounded-3xl p-6 text-center">
              <div className="font-display text-4xl">{n}</div>
              <div className="text-sm text-muted-foreground mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 text-center max-w-2xl">
        <h2 className="font-display text-3xl">Come shop the edit.</h2>
        <Link to="/products" className="inline-flex mt-5 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium">Explore products</Link>
      </section>
    </div>
  );
}
