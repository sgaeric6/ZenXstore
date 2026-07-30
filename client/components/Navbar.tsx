"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">

      <div className="navContainer">

        <Link href="/" className="logo">

          <div className="logoGlow">
            ZX
          </div>

          <span>
            Zen<span className="green">X</span>Store
          </span>

        </Link>

        <nav className="navLinks">

          <Link href="/">Home</Link>

          <Link href="/marketplace">Marketplace</Link>

          <Link href="/categories">Categories</Link>

          <Link href="/sell">Sell</Link>

          <Link href="/support">Support</Link>

        </nav>

        <div className="navButtons">

          <button className="loginBtn">
            Login
          </button>

          <button className="signupBtn">
            Get Started
          </button>

        </div>

      </div>

    </header>
  );
}
