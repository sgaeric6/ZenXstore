import React, { useState, useEffect } from "react";

export default function UploadAccount() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [level, setLevel] = useState(1);
  const [rank, setRank] = useState("");
  const [region, setRegion] = useState("");
  const [diamonds, setDiamonds] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // ensure array exists
    if (!localStorage.getItem("zenx_accounts")) localStorage.setItem("zenx_accounts", "[]");
  }, []);

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    Promise.all(
      files.map((f) => {
        return new Promise((res) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result);
          reader.readAsDataURL(f);
        });
      })
    ).then((dataUrls) => setImages(dataUrls));
  }

  function submit(e) {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem("zenx_accounts") || "[]");
    const acc = {
      id: Date.now(),
      title,
      price,
      level,
      rank,
      region,
      diamonds,
      images,
      status: "AVAILABLE",
      createdAt: new Date().toISOString()
    };
    accounts.unshift(acc);
    localStorage.setItem("zenx_accounts", JSON.stringify(accounts));
    // eslint-disable-next-line no-alert
    alert("Account uploaded (local demo). It will appear in Listings.");
    setTitle("");
    setPrice(0);
    setLevel(1);
    setRank("");
    setRegion("");
    setDiamonds(0);
    setImages([]);
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h2>Upload Account (Admin)</h2>
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
          <input type="number" value={level} onChange={(e) => setLevel(Number(e.target.value))} required />
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
          Images (multiple)
          <input type="file" multiple accept="image/*" onChange={handleFiles} />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Upload</button>
        </div>
      </form>

      <h3 style={{ marginTop: 20 }}>Preview</h3>
      <div style={{ display: "flex", gap: 8 }}>
        {images.map((src, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <img key={i} src={src} alt={`img-${i}`} style={{ width: 120, height: 80, objectFit: "cover" }} />
        ))}
      </div>
    </div>
  );
}
