import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({ meta: [{ title: "Privacy Policy — Lumora" }] }),
});

function Privacy() {
  const sections = [
    { h: "Information we collect", p: "We collect your name, email, address, phone and order history to fulfill your purchases and improve our service." },
    { h: "How we use it", p: "To process orders, communicate about them, personalize recommendations, and (with your consent) send marketing communications." },
    { h: "Sharing", p: "We share only with logistics partners, payment processors and analytics providers under strict confidentiality." },
    { h: "Cookies", p: "We use cookies to keep you signed in and to understand how you use our site. You can opt out of analytics in your preferences." },
    { h: "Your rights", p: "You can access, correct or delete your data at any time from your profile, or by writing to privacy@lumora.shop." },
  ];
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-xs uppercase tracking-wider text-primary font-semibold">Policy</div>
      <h1 className="font-display text-4xl md:text-5xl mt-2">Privacy policy</h1>
      <p className="text-muted-foreground mt-2 text-sm">Last updated: May 2026</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => <section key={s.h}><h2 className="font-display text-2xl">{s.h}</h2><p className="text-muted-foreground mt-2 leading-relaxed">{s.p}</p></section>)}
      </div>
    </div>
  );
}
