import React from "react";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        padding: "20px",
        background: "#fafafa",
        color: "#111",
        borderRight: "1px solid #eee"
      }}
    >
      <h3 style={{ marginTop: 0 }}>ZenXStore</h3>
      <hr />
      <p style={{ color: "#666" }}>Buy (static)</p>
      <p style={{ color: "#999", fontSize: 12, marginTop: 20 }}>
        All other pages and features have been hidden. No interactions are available.
      </p>
    </aside>
  );
}
