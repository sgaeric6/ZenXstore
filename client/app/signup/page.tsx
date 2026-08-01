"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !name) return alert("Please fill all fields");
    setLoading(true);
    try {
      // Placeholder endpoint - replace with your real backend route
      await axios.post("/api/auth/register", { name, email, password });
      alert("Signup successful (placeholder). Please login.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Get Started</h1>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <br />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <br />
      <br />

      <button onClick={handleSignup} disabled={loading}>{loading ? "Signing up..." : "Sign up"}</button>
    </div>
  );
}
