import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({ meta: [{ title: "Terms & Conditions — Lumora" }] }),
});

function Terms() {
  const sections = [
    { h: "Acceptance", p: "By using Lumora you agree to these terms. If you do not, please discontinue use of the site." },
    { h: "Accounts", p: "You're responsible for maintaining the confidentiality of your account credentials and for any activity on your account." },
    { h: "Orders & pricing", p: "All orders are subject to acceptance. We reserve the right to refuse or cancel any order due to pricing errors, fraud or stock issues." },
    { h: "Intellectual property", p: "All content, branding and product imagery on Lumora is the property of Lumora Retail Pvt. Ltd. or its licensors." },
    { h: "Limitation of liability", p: "Lumora's liability is limited to the value of the products purchased. We are not liable for indirect or consequential losses." },
    { h: "Governing law", p: "These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Mumbai." },
  ];
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-xs uppercase tracking-wider text-primary font-semibold">Legal</div>
      <h1 className="font-display text-4xl md:text-5xl mt-2">Terms & conditions</h1>
      <p className="text-muted-foreground mt-2 text-sm">Last updated: May 2026</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => <section key={s.h}><h2 className="font-display text-2xl">{s.h}</h2><p className="text-muted-foreground mt-2 leading-relaxed">{s.p}</p></section>)}
      </div>
    </div>
  );
}
