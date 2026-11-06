import { createFileRoute, Link } from "@tanstack/react-router";
import { Edit3, MapPin, Plus, Bell, Heart, Package } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/profile")({ component: Profile, head: () => ({ meta: [{ title: "Profile — Lumora" }] }) });

function Profile() {
  const { user, wishlist, cartCount } = useApp();
  const [tab, setTab] = useState<"info"|"addresses"|"prefs">("info");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-hero rounded-3xl p-6 md:p-8 mb-6 flex flex-wrap items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-display text-3xl font-semibold">
          {(user?.name ?? "L")[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-3xl">{user?.name ?? "Guest"}</h1>
          <p className="text-muted-foreground text-sm">{user?.email ?? "Sign in to access your profile"}</p>
        </div>
        {!user && <Link to="/login" className="px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground font-medium">Sign in</Link>}
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        <StatCard icon={<Package className="h-5 w-5" />} label="Orders" value="12" to="/orders" />
        <StatCard icon={<Heart className="h-5 w-5" />} label="Wishlist" value={String(wishlist.length)} to="/wishlist" />
        <StatCard icon={<Bell className="h-5 w-5" />} label="Cart" value={String(cartCount)} to="/cart" />
      </div>

      <div className="border-b border-border flex gap-6 mb-6">
        {(["info","addresses","prefs"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`py-3 text-sm font-semibold border-b-2 -mb-px ${tab===t?"border-primary text-primary":"border-transparent text-muted-foreground"}`}>
            {t === "info" ? "Personal info" : t === "addresses" ? "Addresses" : "Preferences"}
          </button>
        ))}
      </div>

      {tab === "info" && (
        <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl">
          <div className="font-display text-xl mb-4">Personal information</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" defaultValue={user?.name ?? ""} />
            <Field label="Email" defaultValue={user?.email ?? ""} />
            <Field label="Phone" defaultValue="+91 98000 12345" />
            <Field label="Date of birth" type="date" defaultValue="1995-08-21" />
          </div>
          <button className="mt-5 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2"><Edit3 className="h-4 w-4" /> Save changes</button>
        </div>
      )}
      {tab === "addresses" && (
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
          {[
            { tag: "Home", body: "1701, Marine Heights, Marine Drive, Mumbai 400001" },
            { tag: "Work", body: "Floor 12, BKC Tower, Bandra-Kurla, Mumbai 400051" },
          ].map((a) => (
            <div key={a.tag} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between"><div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"><MapPin className="h-3 w-3" /> {a.tag}</div>
                <button className="text-xs text-primary font-medium">Edit</button></div>
              <p className="mt-2 text-sm">{a.body}</p>
            </div>
          ))}
          <button className="rounded-2xl border-2 border-dashed border-border p-5 text-sm font-medium text-muted-foreground hover:bg-muted/40 inline-flex items-center justify-center gap-2"><Plus className="h-4 w-4" /> Add new address</button>
        </div>
      )}
      {tab === "prefs" && (
        <div className="bg-card border border-border rounded-2xl p-6 max-w-2xl space-y-4">
          {[
            ["Email me about new drops", true],
            ["SMS order updates", true],
            ["Push notifications for sales", false],
            ["Personalized recommendations", true],
          ].map(([l, v]) => (
            <div key={l as string} className="flex items-center justify-between">
              <span className="text-sm">{l}</span>
              <input type="checkbox" defaultChecked={v as boolean} className="h-5 w-9 appearance-none rounded-full bg-muted relative cursor-pointer transition-colors checked:bg-primary before:absolute before:top-0.5 before:left-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, to }: { icon: React.ReactNode; label: string; value: string; to: string }) {
  return (
    <Link to={to} className="bg-card border border-border rounded-2xl p-5 card-hover flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-gradient-blush flex items-center justify-center text-primary">{icon}</div>
      <div><div className="font-display text-2xl">{value}</div><div className="text-xs text-muted-foreground">{label}</div></div>
    </Link>
  );
}
function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className="block"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span><input {...rest} className="mt-1.5 w-full h-11 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/30" /></label>;
}
