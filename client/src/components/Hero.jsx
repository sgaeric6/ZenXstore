import React from "react";
import "../styles/hero.css";

export default function Hero() {
  return (
    <section className="zx-hero">
      <div className="zx-hero-gradient" />

      <div className="zx-hero-inner">
        <div className="hero-content">
          <h1>Buy digital accounts & gift cards — instantly</h1>
          <p className="lead">
            Verified sellers · Instant delivery · Secure payments
          </p>
          <div className="hero-ctas">
            <button className="btn primary">Shop Featured Deals</button>
            <button className="btn ghost">How it works</button>
          </div>
        </div>

        <div className="floating-cards" aria-hidden>
          <div className="card card-1">
            <div className="card-logo">Netflix</div>
            <div className="card-price">₦2,000</div>
            <div className="card-badge">-20%</div>
          </div>

          <div className="card card-2">
            <div className="card-logo">Spotify</div>
            <div className="card-price">₦1,500</div>
            <div className="card-badge">Popular</div>
          </div>

          <div className="card card-3">
            <div className="card-logo">Canva</div>
            <div className="card-price">₦800</div>
            <div className="card-badge">Hot</div>
          </div>
        </div>
      </div>
    </section>
  );
}
