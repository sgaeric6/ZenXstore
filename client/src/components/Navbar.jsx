import React from "react";

export default function Navbar() {
  return (
    <header className="zx-navbar">
      <div className="zx-navbar-inner">
        <div className="zx-logo">ZenXStore</div>

        <div className="zx-search">
          <input placeholder="Search games, cards, accounts..." />
        </div>

        <div className="zx-actions">
          <button className="icon-btn" aria-label="notifications">🔔</button>
          <button className="icon-btn" aria-label="theme">🌗</button>
          <div className="avatar" title="Admin">A</div>
        </div>
      </div>
    </header>
  );
}
