import React from "react";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        padding: "20px",
        background: "#111",
        color: "#fff"
      }}
    >
      <h2>ZenXStore</h2>

      <hr />

      <p>Dashboard</p>
      <p>Users</p>
      <p>Support</p>
      <p>Listings</p>
      <p>Refunds</p>
      <p>Transactions</p>
      <p>Analytics</p>
    </aside>
  );
}
