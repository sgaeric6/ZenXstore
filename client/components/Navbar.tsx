"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar" style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
      <div className="navContainer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px" }}>
        <Link href="/" className="logo" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#111" }}>
          <div className="logoGlow" style={{ width: 36, height: 36, borderRadius: 8, background: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>ZX</div>
          <span style={{ fontWeight: 600 }}>Zen<span style={{ color: "#0b8" }}>X</span>Store</span>
        </Link>

        <nav className="navLinks" style={{ display: "flex", gap: 16 }}>
          <Link href="/">Home</Link>
          <Link href="/listings">Marketplace</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/support">Support</Link>
        </nav>

      </div>
    </header>
  );
}
