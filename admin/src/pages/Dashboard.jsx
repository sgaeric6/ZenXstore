import React from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "30px" }}>
          <h1>Dashboard</h1>

          <h3>Total Users</h3>

          <h3>Total Orders</h3>

          <h3>Total Revenue</h3>
        </div>
      </div>
    </div>
  );
}
