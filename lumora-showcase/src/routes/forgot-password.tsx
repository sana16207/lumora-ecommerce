import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell, Field, PrimaryButton } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/forgot-password")({ component: Forgot, head: () => ({ meta: [{ title: "Forgot password — Lumora" }] }) });

function Forgot() {
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false);
  return (
    <AuthShell title="Forgot password?" subtitle="We'll email you a link to reset it." footer={<Link to="/login" className="text-primary font-semibold">Back to sign in</Link>}>
      {sent ? (
        <div className="bg-gradient-mint rounded-2xl p-6 text-center">
          <div className="font-display text-xl">Check your inbox</div>
          <p className="text-sm mt-1 text-muted-foreground">We've sent a reset link to <strong>{email}</strong>.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Reset email sent"); }} className="space-y-4">
          <Field label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <PrimaryButton>Send reset link</PrimaryButton>
        </form>
      )}
    </AuthShell>
  );
}
