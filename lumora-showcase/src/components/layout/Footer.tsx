import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Mail, Apple, Shield, Truck, RefreshCw, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-border">
        {[
          { icon: <Truck className="h-5 w-5" />, t: "Free Shipping", d: "On orders over ₹1499" },
          { icon: <RefreshCw className="h-5 w-5" />, t: "Easy Returns", d: "30-day return policy" },
          { icon: <Shield className="h-5 w-5" />, t: "Authentic Only", d: "100% verified brands" },
          { icon: <Lock className="h-5 w-5" />, t: "Secure Payments", d: "256-bit encrypted" },
        ].map((b) => (
          <div key={b.t} className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-blush flex items-center justify-center text-primary">{b.icon}</div>
            <div><div className="font-semibold text-sm">{b.t}</div><div className="text-xs text-muted-foreground">{b.d}</div></div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-14 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="text-gradient font-display font-bold text-2xl mb-3">LUMORA</div>
          <p className="text-sm text-muted-foreground max-w-sm mb-5">A curated marketplace for considered luxury — fashion, beauty, home and tech, from independent ateliers to iconic houses.</p>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed ✨"); setEmail(""); }} className="flex gap-2 max-w-sm">
            <div className="relative flex-1">
              <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="your@email.com" className="w-full h-11 pl-9 pr-3 rounded-full bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
            <button className="px-5 h-11 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium hover:shadow-glow transition-all">Join</button>
          </form>
          <div className="flex gap-3 mt-5">
            {[Instagram, Twitter, Facebook, Youtube].map((I, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="social">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <a href="#" className="flex items-center gap-2 px-4 h-11 rounded-xl bg-foreground text-background text-xs"><Apple className="h-5 w-5" /><div className="text-left leading-tight"><div className="opacity-70">Download</div><div className="font-semibold">App Store</div></div></a>
            <a href="#" className="flex items-center gap-2 px-4 h-11 rounded-xl bg-foreground text-background text-xs"><span className="text-lg">▶</span><div className="text-left leading-tight"><div className="opacity-70">Get on</div><div className="font-semibold">Google Play</div></div></a>
          </div>
        </div>

        <FCol title="Shop" links={[["New In","/products"],["Women","/products"],["Men","/products"],["Beauty","/products"],["Home","/products"],["Sale","/products"]]} />
        <FCol title="Help" links={[["Help Center","/help"],["Shipping","/shipping"],["Returns","/returns"],["Track Order","/orders"],["Contact","/contact"]]} />
        <FCol title="Company" links={[["About","/about"],["Careers","/about"],["Privacy","/privacy"],["Terms","/terms"],["Press","/about"]]} />
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2026 Lumora Retail Pvt. Ltd. — Crafted with care.</div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/shipping" className="hover:text-foreground">Shipping</Link>
            <Link to="/returns" className="hover:text-foreground">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider mb-4">{title}</div>
      <ul className="space-y-2.5">
        {links.map(([l, h]) => (
          <li key={l}><Link to={h} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}
