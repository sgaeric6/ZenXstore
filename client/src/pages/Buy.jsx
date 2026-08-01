import React from "react";

export default function Buy() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
      <h1>Buy</h1>

      <p>
        Welcome. This page is static and intentionally non-interactive. No login, checkout, or dynamic features are available on this site.
      </p>

      <section style={{ marginTop: 20 }}>
        <h2>Available Accounts</h2>

        <p style={{ color: "#666" }}>
          For demonstration, account listings are shown as static text only. Admin uploads and account details are not available here.
        </p>

        <div style={{ background: "#f8f8f8", padding: 16, borderRadius: 6, marginTop: 12 }}>
          <p><strong>Example Account 1</strong></p>
          <p>Title: Demo Account A — Price: ₦0 — Description: Static listing</p>
        </div>

        <div style={{ background: "#f8f8f8", padding: 16, borderRadius: 6, marginTop: 8 }}>
          <p><strong>Example Account 2</strong></p>
          <p>Title: Demo Account B — Price: ₦0 — Description: Static listing</p>
        </div>
      </section>

      <footer style={{ marginTop: 30, color: "#999" }}>
        <small>Site is intentionally static. No actions available.</small>
      </footer>
    </main>
  );
}
