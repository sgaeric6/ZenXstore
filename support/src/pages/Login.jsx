import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter email and password");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      // simple redirect to dashboard if present
      window.location.href = "/support/dashboard";
    } catch (err) {
      console.error(err);
      alert("Login failed (placeholder)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Support Login</h1>

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin} disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
    </div>
  );
}
