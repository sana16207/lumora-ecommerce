import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, PrimaryButton } from "@/components/auth/AuthShell";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue shopping."
      footer={
        <>
          New to Lumora?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Create an account
          </Link>
        </>
      }
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (loading) return;

          setLoading(true);

          await login(email, pwd);

          setLoading(false);

          navigate({ to: "/" });
        }}
        className="space-y-4"
      >
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
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        <PrimaryButton>
          {loading ? "Signing in..." : "Sign in"}
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}

export default Login;