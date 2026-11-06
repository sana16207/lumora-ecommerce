import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Clock, TrendingUp, Quote } from "lucide-react";
import { categories, heroSlides, products, testimonials, brandLogos } from "@/data/catalog";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [{ title: "Lumora — Considered Luxury, Curated Daily" }] }),
});

function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const deal = products[0];
  const trending = products.filter((p) => p.tags?.includes("trending")).slice(0, 4);
  const recommended = products.slice(2, 10);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="bg-gradient-hero">
          <div className="container mx-auto px-4 pt-10 lg:pt-16 pb-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur border border-border text-xs font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> {heroSlides[slide].eyebrow}
                </div>
                <h1 className="font-display text-5xl md:text-7xl leading-[1.05] font-semibold">
                  <span className="text-gradient">{heroSlides[slide].title}</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">{heroSlides[slide].subtitle}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link to={heroSlides[slide].href as never} className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:shadow-soft transition-all">
                    {heroSlides[slide].cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-background/60 backdrop-blur font-medium hover:bg-background transition-all">
                    Shop everything
                  </Link>
                </div>
                <div className="flex gap-2 pt-3">
                  {heroSlides.map((_, i) => (
                    <button key={i} onClick={() => setSlide(i)} className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-primary" : "w-1.5 bg-foreground/20"}`} aria-label={`slide ${i+1}`} />
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-blush rounded-[2.5rem] blur-2xl opacity-60" />
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-glow">
                  <img src={heroSlides[slide].image} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-glow w-44 hidden md:block">
                  <div className="text-xs text-muted-foreground">Today only</div>
                  <div className="font-display text-lg">Extra 20% off</div>
                  <div className="text-xs text-primary font-semibold">Code: LUMORA20</div>
                </div>
                <div className="absolute -top-4 -right-4 bg-gradient-mint rounded-2xl p-4 shadow-glow hidden md:block">
                  <div className="text-xs">Free shipping</div>
                  <div className="font-display text-sm font-semibold">on ₹1499+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-14">
        <SectionHead eyebrow="Shop by category" title="Find your edit" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-8">
          {categories.map((c) => (
            <Link key={c.slug} to="/products" search={{ category: c.slug } as never} className="group">
              <div className={`${c.gradient} aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-transform group-hover:scale-[1.03] shadow-soft`}>
                <span className="text-3xl">{c.icon}</span>
                <span className="text-sm font-semibold">{c.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo banners */}
      <section className="container mx-auto px-4 grid md:grid-cols-3 gap-4">
        {[
          { bg: "bg-gradient-blush", t: "Festive Drop", s: "Up to 60% off", c: "Shop now" },
          { bg: "bg-gradient-lavender", t: "Luxe Beauty", s: "Top labels under ₹999", c: "Discover" },
          { bg: "bg-gradient-mint", t: "Quiet Home", s: "Refresh your space", c: "Explore" },
        ].map((b) => (
          <Link key={b.t} to="/products" className={`${b.bg} rounded-3xl p-6 md:p-8 card-hover relative overflow-hidden`}>
            <div className="text-xs uppercase tracking-wider text-foreground/70">{b.t}</div>
            <div className="font-display text-2xl md:text-3xl mt-1">{b.s}</div>
            <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">{b.c} <ArrowRight className="h-4 w-4" /></div>
          </Link>
        ))}
      </section>

      {/* Deal of the day */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-primary rounded-3xl p-6 md:p-10 text-primary-foreground grid md:grid-cols-2 gap-8 items-center overflow-hidden relative">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-xs"><Clock className="h-3.5 w-3.5" /> Deal of the day · ends in 06:48:21</div>
            <h2 className="font-display text-3xl md:text-5xl mt-4 leading-tight">{deal.name}</h2>
            <p className="opacity-80 mt-2 max-w-md">{deal.description}</p>
            <div className="flex items-center gap-3 mt-5">
              <span className="text-3xl font-display font-semibold">₹{deal.price.toLocaleString()}</span>
              <span className="line-through opacity-60">₹{deal.originalPrice.toLocaleString()}</span>
              <span className="px-2 py-1 rounded-full bg-white/20 text-xs font-bold">SAVE {Math.round((1 - deal.price/deal.originalPrice)*100)}%</span>
            </div>
            <Link to="/products/$id" params={{ id: deal.id }} className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-background text-foreground font-medium">Grab the deal <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden">
            <img src={deal.image} alt={deal.name} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-6">
        <SectionHead eyebrow={<><TrendingUp className="h-3.5 w-3.5 inline mr-1" /> Trending now</>} title="What everyone's loving" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {trending.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Recommended */}
      <section className="container mx-auto px-4 py-16">
        <SectionHead eyebrow="For you" title="Recommended picks" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {recommended.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Brand strip */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {brandLogos.map((b) => (
            <div key={b} className="font-display text-lg md:text-xl text-muted-foreground/70 tracking-widest">{b}</div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <SectionHead eyebrow="Loved by 200k+" title="Stories from our community" />
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-3xl p-7 border border-border card-hover">
              <Quote className="h-7 w-7 text-primary mb-3" />
              <p className="leading-relaxed">"{t.text}"</p>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 pb-16">
        <div className="bg-gradient-blush rounded-3xl p-8 md:p-14 text-center">
          <h3 className="font-display text-3xl md:text-4xl">Join the Lumora list</h3>
          <p className="mt-2 text-muted-foreground max-w-lg mx-auto">Get exclusive early access to drops, members-only sales, and editor-curated picks.</p>
          <form onSubmit={(e) => { e.preventDefault(); }} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input type="email" required placeholder="your@email.com" className="flex-1 h-12 px-5 rounded-full bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
            <button className="h-12 px-7 rounded-full bg-gradient-primary text-primary-foreground font-medium">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: React.ReactNode; title: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="text-xs uppercase tracking-wider text-primary font-semibold">{eyebrow}</div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">{title}</h2>
      </div>
      <Link to="/products" className="hidden md:inline-flex items-center gap-1 text-sm font-medium hover:text-primary">View all <ArrowRight className="h-4 w-4" /></Link>
    </div>
  );
}
