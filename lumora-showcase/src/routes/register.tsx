import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthShell, Field, PrimaryButton } from "@/components/auth/AuthShell";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const { register } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  return (
    <AuthShell
      title="Create account"
      subtitle="Join Lumora"
      footer={
        <>
          Already a member?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Sign in
          </Link>
        </>
      }
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (p1 !== p2) {
            toast.error("Passwords don't match");
            return;
          }

          await register(name, email, p1);
          navigate({ to: "/" });
        }}
        className="space-y-4"
      >
        <Field
          label="Full name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Field
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Field
          label="Password"
          type="password"
          required
          value={p1}
          onChange={(e) => setP1(e.target.value)}
        />

        <Field
          label="Confirm Password"
          type="password"
          required
          value={p2}
          onChange={(e) => setP2(e.target.value)}
        />

        <PrimaryButton>Create account</PrimaryButton>
      </form>
    </AuthShell>
  );
}