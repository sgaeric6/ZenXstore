"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please enter email and password");
    setLoading(true);
    try {
      // Placeholder endpoint - replace with your real backend route if different
      const res = await axios.post("/api/auth/login", { email, password });
      // Save token (placeholder). For production use HttpOnly cookies.
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Login failed (placeholder). Check backend or edit endpoint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
