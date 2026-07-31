import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Analytics from "./Analytics";
import UploadAccount from "./UploadAccount";
import SupportRequests from "./SupportRequests";
import SupportChats from "./SupportChats";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onNavigate={(p) => setPage(p)} />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          {page === "dashboard" && (
            <>
              <h1>Dashboard</h1>

              <h3>Total Users</h3>

              <h3>Total Orders</h3>

              <h3>Total Revenue</h3>
            </>
          )}

          {page === "analytics" && <Analytics />}

          {page === "upload" && <UploadAccount />}

          {page === "supportRequests" && <SupportRequests />}

          {page === "supportChats" && <SupportChats />}

          {page === "support" && (
            <div>
              <h1>Support</h1>
              <p>Use the floating support button at the bottom-right (if unlocked) to create a support request or chat.</p>
            </div>
          )}

          {page === "listings" && (
            <div>
              <h1>Listings</h1>
              <p>These are the accounts uploaded by admins.</p>
              <ListingsPreview />
            </div>
          )}

          {page === "refunds" && (
            <div>
              <h1>Refund Requests</h1>
              <p>Manage refund requests here.</p>
            </div>
          )}

          {page === "transactions" && (
            <div>
              <h1>Transactions</h1>
              <p>Transaction history will appear here.</p>
            </div>
          )}
        </div>
      </div>

      <SupportFloating />
    </div>
  );
}

function ListingsPreview() {
  const items = JSON.parse(localStorage.getItem("zenx_accounts") || "[]");

  if (!items.length) {
    return (
      <div style={{ padding: 20, border: "1px dashed #ccc" }}>
        <h3>No accounts available</h3>
        <p>
          Admins have not uploaded any accounts yet. If you are a user wanting to sell an account, please contact support via the floating support button.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
      {items.map((it) => (
        <div key={it.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 6, background: "#fff" }}>
          <img src={it.images && it.images[0]} alt="thumb" style={{ width: "100%", height: 120, objectFit: "cover" }} />
          <h4>{it.title}</h4>
          <p>Price: {it.price}</p>
          <p>Level: {it.level} • Rank: {it.rank}</p>
          <p>Diamonds: {it.diamonds}</p>
          <p>Status: {it.status || "AVAILABLE"}</p>
        </div>
      ))}
    </div>
  );
}

function SupportFloating() {
  const supportUnlocked = JSON.parse(localStorage.getItem("support_unlocked") || "false");
  const [open, setOpen] = useState(false);

  if (!supportUnlocked) return null;

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          width: 64,
          height: 64,
          borderRadius: 32,
          background: "#007bff",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}
        title="Contact Support"
      >
        Support
      </div>

      {open && <SupportModal onClose={() => setOpen(false)} />}
    </div>
  );
}

function SupportModal({ onClose }) {
  const [page, setPage] = useState("start");

  return (
    <div style={{ position: "fixed", right: 20, bottom: 100, width: 360, maxWidth: "90%", background: "#fff", border: "1px solid #ccc", borderRadius: 8, padding: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>Support</strong>
        <button onClick={onClose}>Close</button>
      </div>

      {page === "start" && (
        <div>
          <p>Welcome to support. Choose an action:</p>
          <button onClick={() => setPage("request")}>Create Support Account Request</button>
          <button onClick={() => setPage("message")}>Message Support</button>
        </div>
      )}

      {page === "request" && <SupportSignup onDone={() => setPage("message")} />}

      {page === "message" && <InlineChat />}
    </div>
  );
}

function SupportSignup({ onDone }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();
    const requests = JSON.parse(localStorage.getItem("support_requests") || "[]");
    requests.push({ id: Date.now(), email, password, createdAt: new Date().toISOString() });
    localStorage.setItem("support_requests", JSON.stringify(requests));
    // eslint-disable-next-line no-alert
    alert("Support request created. An admin will review and approve you.");
    onDone && onDone();
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
      </label>
      <div>
        <button type="submit">Request Support Access</button>
      </div>
    </form>
  );
}

function InlineChat() {
  const [msgs, setMsgs] = useState(() => JSON.parse(localStorage.getItem("support_inline_msgs") || "[]"));
  const [text, setText] = useState("");

  function send() {
    if (!text) return;
    const next = [...msgs, { id: Date.now(), text, from: "user", at: new Date().toISOString() }];
    setMsgs(next);
    localStorage.setItem("support_inline_msgs", JSON.stringify(next));
    setText("");
  }

  return (
    <div>
      <div style={{ maxHeight: 200, overflow: "auto", border: "1px solid #eee", padding: 8 }}>
        {msgs.map((m) => (
          <div key={m.id} style={{ marginBottom: 6 }}>
            <small>{m.from}</small>
            <div>{m.text}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} style={{ flex: 1 }} />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
