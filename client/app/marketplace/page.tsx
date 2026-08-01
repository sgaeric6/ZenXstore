"use client";

import Link from "next/link";

export default function MarketplacePage() {
  // Minimal placeholder marketplace listing to ensure navigation works
  const sampleListings = [
    { id: "1", title: "FF Account - Level 70", price: "₦15,000" },
    { id: "2", title: "FF Account - Elite Bundle", price: "₦25,000" },
  ];

  return (
    <div style={{ padding: 30 }}>
      <h1>Marketplace</h1>

      <ul>
        {sampleListings.map((l) => (
          <li key={l.id} style={{ marginBottom: 12 }}>
            <strong>{l.title}</strong> - {l.price} &nbsp;
            <Link href={`/listings/${l.id}`}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
