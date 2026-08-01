"use client";

import { useState } from "react";
import axios from "axios";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !price) return alert("Please add title and price");
    setLoading(true);
    try {
      // Placeholder endpoint - replace with your own backend
      await axios.post("/api/sell", { title, price });
      alert("Sell request submitted (placeholder).");
      setTitle("");
      setPrice("");
    } catch (err) {
      console.error(err);
      alert("Sell request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Sell an Account</h1>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <br />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br />
      <br />
      <button onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
    </div>
  );
}
