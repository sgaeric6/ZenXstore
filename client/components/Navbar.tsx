"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navContainer">

        <Link href="/" className="logo">
          <span className="logoGlow">Z</span>
          <span>ZenXStore</span>
        </Link>

        <nav className="navLinks">
          <Link href="/">Home</Link>
          <Link href="/buy">Buy</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/listings">Marketplace</Link>
          <Link href="/support">Support</Link>
        </nav>

        <div className="navButtons">
          <Link href="/login">
            <button className="loginBtn">
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className="signupBtn">
              Get Started
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
}
