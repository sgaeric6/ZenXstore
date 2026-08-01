import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Buy from "./pages/Buy";

export default function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <main>
          <Buy />
        </main>
      </div>
    </div>
  );
}
