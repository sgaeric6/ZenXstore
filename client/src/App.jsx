import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div style={{ background: '#071024', minHeight: '100vh', color: '#e6eef8' }}>
      <Navbar />
      <main>
        <Hero />
        <section style={{padding: '40px', maxWidth: 1100, margin: '0 auto'}}>
          <h2 style={{marginBottom: 12}}>Preview content</h2>
          <p style={{opacity: 0.85}}>This page includes the new Navbar and Hero components for a quick visual preview. Run the client dev server to view it in your browser and capture a screenshot.</p>
        </section>
      </main>
    </div>
  );
}
