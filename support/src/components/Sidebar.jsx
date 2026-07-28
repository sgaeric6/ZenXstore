import React from "react";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "250px",
        background: "#222",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h2>Support Panel</h2>

      <hr />

      <p>Dashboard</p>
      <p>Complaints</p>
      <p>Sell Requests</p>
      <p>Chats</p>
      <p>Ratings</p>
      <p>Profile</p>
    </aside>
  );
}
