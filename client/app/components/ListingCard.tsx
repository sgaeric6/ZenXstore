"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type Image = { url?: string };

type ListingItem = {
  id: string;
  reservedUntil?: string | null;
  status?: string;
  images?: Image[];
  title?: string;
  price?: number | string;
  amount?: number | string;
  region?: string;
  description?: string;
};

export default function ListingCard({ item }: { item: ListingItem }) {
  const [reservedUntil, setReservedUntil] = useState(item.reservedUntil || null);
  const [status, setStatus] = useState(item.status || "AVAILABLE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setReservedUntil(item.reservedUntil || null);
    setStatus(item.status || "AVAILABLE");
  }, [item]);

  const isReserved = () => {
    if (!reservedUntil) return false;
    const t = new Date(reservedUntil).getTime();
    return t > Date.now();
  };

  const fmt = (value: number | string | undefined) => {
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(Number(value));
    } catch (e) {
      return `₦${value}`;
    }
  };

  const handleReserve = async () => {
    setLoading(true);
    setError(null);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${base}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: item.id }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to reserve");
      }

      const data = await res.json();
      // expect server to return reservedUntil and status
      if (data.reservedUntil) setReservedUntil(data.reservedUntil);
      if (data.status) setStatus(data.status);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const imageUrl =
    item.images && item.images.length > 0 && item.images[0].url
      ? item.images[0].url
      : "/placeholder.svg";

  return (
    <article className="card">
      <Link href={`/listings/${item.id}`}>
        <div className="cardImageWrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={item.title || "account image"} />
        </div>
      </Link>

      <div className="cardBody">
        <h3>
          <Link href={`/listings/${item.id}`}>{item.title}</Link>
        </h3>

        <div className="cardMeta">
          <span className="price">{fmt(item.price ?? item.amount ?? 0)}</span>
          <span className="region">{item.region || "Unknown"}</span>
        </div>

        <p className="desc">{item.description?.slice(0, 100) || "No description"}</p>

        {isReserved() && (
          <div className="reservedNote">Reserved until {new Date(reservedUntil as string).toLocaleString()}</div>
        )}

        <div className="cardActions">
          <Link href={`/listings/${item.id}`}>
            <button className="greenBtn">View</button>
          </Link>

          <button
            className="outlineBtn"
            onClick={handleReserve}
            disabled={loading || status !== "AVAILABLE" || isReserved()}
          >
            {loading ? "Reserving..." : isReserved() || status !== "AVAILABLE" ? "Unavailable" : "Reserve"}
          </button>
        </div>

        {error && <div className="error">{error}</div>}
      </div>
    </article>
  );
}
