import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell, Field, PrimaryButton } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/reset-password")({ component: Reset, head: () => ({ meta: [{ title: "Reset password — Lumora" }] }) });

function Reset() {
  const navigate = useNavigate();
  const [p1, setP1] = useState(""); const [p2, setP2] = useState("");
  return (
    <AuthShell title="Set a new password" subtitle="Choose a strong password you haven't used before." footer={<Link to="/login" className="text-primary font-semibold">Back to sign in</Link>}>
      <form onSubmit={(e) => { e.preventDefault(); if (p1 !== p2) { toast.error("Passwords don't match"); return; } toast.success("Password updated"); navigate({ to: "/login" }); }} className="space-y-4">
        <Field label="New password" type="password" required minLength={6} value={p1} onChange={(e) => setP1(e.target.value)} />
        <Field label="Confirm new password" type="password" required value={p2} onChange={(e) => setP2(e.target.value)} />
        <PrimaryButton>Update password</PrimaryButton>
      </form>
    </AuthShell>
  );
}
