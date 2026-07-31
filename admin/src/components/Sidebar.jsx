import React from "react";

export default function Sidebar({ onNavigate }) {
  const isAdminUnlocked = JSON.parse(localStorage.getItem("admin_unlocked") || "false");

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        padding: "20px",
        background: "#111",
        color: "#fff",
        boxSizing: "border-box"
      }}
    >
      <h2 style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("dashboard")}>
        ZenXStore
      </h2>

      <hr style={{ borderColor: "#333" }} />

      <p style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("dashboard")}>Dashboard</p>
      <p style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("users")}>Users</p>
      <p style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("support")}>Support</p>
      <p style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("listings")}>Listings</p>
      <p style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("refunds")}>Refunds</p>
      <p style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("transactions")}>Transactions</p>
      <p style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("analytics")}>Analytics</p>

      {isAdminUnlocked && (
        <>
          <hr style={{ borderColor: "#333" }} />
          <h3>Hidden Admin Tools</h3>
          <p style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("upload")}>Upload Account</p>
          <p style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("supportRequests")}>Support Requests</p>
          <p style={{ cursor: "pointer" }} onClick={() => onNavigate && onNavigate("supportChats")}>Support Chats</p>
        </>
      )}
    </aside>
  );
}
