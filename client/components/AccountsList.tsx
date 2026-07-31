"use client";

import { useEffect, useState } from "react";

type Account = {
  id: string;
  title: string;
  price?: number;
  level?: number;
  rank?: string;
  region?: string;
  diamonds?: number;
  images?: string[];
  status?: string;
  description?: string;
};

export default function AccountsList() {
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Account | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/listings")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.success) setAccounts(data.listings || []);
        else setAccounts([]);
      })
      .catch(() => setAccounts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading accounts…</div>;

  if (!accounts || accounts.length === 0) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h2>No accounts available</h2>
        <p>Admins haven't uploaded any accounts yet. Contact support for help.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))" }}>
        {accounts.map((a) => (
          <article key={a.id} style={{ border: "1px solid #e6e6e6", borderRadius: 8, padding: 12, background: "#fff" }}>
            <div style={{ height: 160, overflow: "hidden", borderRadius: 6, marginBottom: 8 }}>
              <img src={(a.images && a.images[0]) || "/placeholder.png"} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 style={{ margin: "6px 0" }}>{a.title}</h3>
            <div style={{ fontSize: 14, color: "#333", marginBottom: 6 }}>
              <strong>₦{a.price ?? "—"}</strong>
            </div>
            <div style={{ fontSize: 13, color: "#666" }}>
              Level: {a.level ?? "—"} • Rank: {a.rank ?? "—"}
              <div>Diamonds: {a.diamonds ?? 0}</div>
            </div>
            <div style={{ marginTop: 8 }}>
              <button onClick={() => setSelected(a)} style={{ width: "100%" }}>Buy Now</button>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div style={{ position: "fixed", left: 0, top: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 480, maxWidth: "95%", background: "#fff", padding: 16, borderRadius: 8 }}>
            <h3>Buy {selected.title}</h3>
            <p>Price: ₦{selected.price}</p>
            <p>{selected.description}</p>

            <label style={{ display: "block", marginTop: 8 }}>
              Your email (for invoice)
              <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", marginTop: 6 }} placeholder="you@example.com" />
            </label>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={() => { setSelected(null); setEmail(""); }}>Cancel</button>
              <button onClick={async () => {
                if (!email) return alert("Please enter your email for the invoice.");
                try {
                  const res = await fetch("/api/payments/initialize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ accountId: selected.id, email })
                  });
                  const data = await res.json();
                  if (data && data.authorization_url) {
                    window.location.href = data.authorization_url;
                  } else {
                    alert("Failed to initialize payment. Try again.");
                  }
                } catch (err) {
                  // eslint-disable-next-line no-console
                  console.error(err);
                  alert("Payment initialization failed.");
                }
              }} style={{ background: "#007bff", color: "#fff" }}>Proceed to Pay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
