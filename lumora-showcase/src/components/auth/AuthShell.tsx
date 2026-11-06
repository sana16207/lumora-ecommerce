import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="hidden lg:block relative bg-gradient-hero">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md">
            <Link to="/" className="text-gradient font-display font-bold text-3xl">LUMORA</Link>
            <h2 className="font-display text-4xl mt-8 leading-tight">Step into a more considered way to shop.</h2>
            <p className="text-muted-foreground mt-4">From independent ateliers to iconic houses — Lumora is your edit of the world's most loved labels.</p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[["200k+","Members"],["12k+","Brands"],["4.9★","Avg rating"]].map(([n,l]) => (
                <div key={l} className="bg-background/70 backdrop-blur rounded-2xl p-4 border border-border">
                  <div className="font-display text-2xl">{n}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden text-gradient font-display font-bold text-2xl">LUMORA</Link>
          <h1 className="font-display text-3xl md:text-4xl mt-4">{title}</h1>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
          <div className="mt-7">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted-foreground text-center">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input {...props} className="mt-1.5 w-full h-12 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-all" />
    </label>
  );
}

export function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className="w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-medium hover:shadow-glow transition-all">{children}</button>;
}
