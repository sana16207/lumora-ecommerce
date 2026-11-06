import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Twitter, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({ component: Contact, head: () => ({ meta: [{ title: "Contact — Lumora" }] }) });

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="text-xs uppercase tracking-wider text-primary font-semibold">Talk to us</div>
        <h1 className="font-display text-4xl md:text-5xl mt-2">We're here to help.</h1>
        <p className="text-muted-foreground mt-3">Reach out with questions about orders, products or partnerships — our team responds within 24 hours.</p>
      </div>
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Message sent — we'll be in touch."); }} className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <F label="Your name" required />
            <F label="Email" type="email" required />
            <F label="Subject" className="sm:col-span-2" />
            <label className="block sm:col-span-2"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</span>
              <textarea rows={5} required className="mt-1.5 w-full p-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </label>
          </div>
          <button className="mt-5 px-6 h-11 rounded-full bg-gradient-primary text-primary-foreground font-medium">{sent ? "Message sent ✓" : "Send message"}</button>
        </form>
        <aside className="space-y-4">
          <ContactCard icon={<Mail className="h-5 w-5" />} title="Email" body="hello@lumora.shop" />
          <ContactCard icon={<Phone className="h-5 w-5" />} title="Phone" body="+91 22 4000 1701" />
          <ContactCard icon={<MapPin className="h-5 w-5" />} title="Office" body="Atelier Lumora, Marine Drive, Mumbai 400001, India" />
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="font-semibold mb-3">Follow us</div>
            <div className="flex gap-2">
              {[Instagram, Twitter, Facebook].map((I, i) => <a key={i} href="#" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted"><I className="h-4 w-4" /></a>)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
function F({ label, className, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <label className={`block ${className ?? ""}`}><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span><input {...rest} className="mt-1.5 w-full h-11 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/30" /></label>;
}
function ContactCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return <div className="bg-card border border-border rounded-2xl p-5 flex items-start gap-3">
    <div className="h-10 w-10 rounded-full bg-gradient-blush flex items-center justify-center text-primary shrink-0">{icon}</div>
    <div><div className="font-semibold text-sm">{title}</div><div className="text-sm text-muted-foreground mt-0.5">{body}</div></div>
  </div>;
}
