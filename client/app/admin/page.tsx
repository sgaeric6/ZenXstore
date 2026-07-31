"use client";

import { useState } from "react";

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [level, setLevel] = useState(1);
  const [rank, setRank] = useState("");
  const [region, setRegion] = useState("");
  const [diamonds, setDiamonds] = useState(0);
  const [files, setFiles] = useState(null);
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!key) return alert("Enter admin key");
    const fd = new FormData();
    fd.append("title", title);
    fd.append("price", String(price));
    fd.append("level", String(level));
    fd.append("rank", rank);
    fd.append("region", region);
    fd.append("diamonds", String(diamonds));
    if (files) {
      Array.from(files).forEach((f) => fd.append("images", f));
    }

    setMsg("Uploading...");

    try {
      const res = await fetch(`/api/listings?key=${encodeURIComponent(key)}`, {
        method: "POST",
        body: fd
      });
      const data = await res.json();
      if (data.success) {
        setMsg("Uploaded successfully.");
        setTitle("");
        setPrice(0);
        setFiles(null);
      } else {
        setMsg("Upload failed: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setMsg("Upload error");
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Admin Upload</h1>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 720 }}>
        <label>
          Admin Key
          <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="Enter admin key" />
        </label>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Price
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </label>
        <label>
          Level
          <input type="number" value={level} onChange={(e) => setLevel(Number(e.target.value))} />
        </label>
        <label>
          Rank
          <input value={rank} onChange={(e) => setRank(e.target.value)} />
        </label>
        <label>
          Region
          <input value={region} onChange={(e) => setRegion(e.target.value)} />
        </label>
        <label>
          Diamonds
          <input type="number" value={diamonds} onChange={(e) => setDiamonds(Number(e.target.value))} />
        </label>
        <label>
          Images
          <input type="file" multiple accept="image/*" onChange={(e) => setFiles(e.target.files)} />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Upload</button>
        </div>
      </form>

      {msg && <p>{msg}</p>}
    </main>
  );
}
