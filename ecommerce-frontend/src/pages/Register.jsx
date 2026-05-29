import { useState } from "react";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully!");
      window.location.href = "/login";
    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          width: "400px",
        }}
      >
        <h1>Register</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "14px", marginBottom: "16px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "14px", marginBottom: "16px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "14px", marginBottom: "16px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;