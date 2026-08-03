"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CheckoutPage() {
  const search = useSearchParams();
  const router = useRouter();
  const orderId = search.get("orderId");

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [bank, setBank] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [message, setMessage] = useState(null);
  const [proofFile, setProofFile] = useState(null);
  const [providerRef, setProviderRef] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [notifying, setNotifying] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    if (!orderId) {
      setMessage("No orderId provided in query string.");
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/payments/checkout?orderId=${orderId}`, { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load checkout info");
        setOrder(data.order);
        setBank(data.bank);

        const reserved = new Date(data.order.reservedUntil);
        setCountdown(Math.max(0, reserved.getTime() - Date.now()));
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [orderId]);

  useEffect(() => {
    if (!countdown) return;
    const t = setInterval(() => {
      setCountdown((c) => {
        if (!c) return 0;
        const next = c - 1000;
        if (next <= 0) {
          clearInterval(t);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [countdown]);

  function formatTime(ms) {
    if (!ms) return "00:00";
    const total = Math.max(0, Math.floor(ms / 1000));
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  const copyAccount = async () => {
    if (!bank) return;
    try {
      await navigator.clipboard.writeText(bank.accountNumber);
      setMessage("Account number copied to clipboard");
    } catch (e) {
      setMessage("Copy failed");
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("token") || ""; // auth if used
      const res = await fetch(`${API_BASE}/api/payments/verify-manual`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ orderId, providerReference: providerRef })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Verification failed");
      setMessage("Payment verified — order completed.");
      // redirect to success or show delivery link
      setTimeout(() => router.push(`/orders/${orderId}`), 1200);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setVerifying(false);
    }
  };

  const handleNotify = async () => {
    if (!proofFile) {
      setMessage("Please attach payment proof before notifying admin.");
      return;
    }
    setNotifying(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("token") || "";
      const fd = new FormData();
      fd.append("orderId", orderId);
      fd.append("proof", proofFile);

      const res = await fetch(`${API_BASE}/api/payments/notify-admin`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Notify failed");
      setMessage("Admin notified. Your payment will be reviewed shortly.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setNotifying(false);
    }
  };

  if (loading) return <div className="container">Loading checkout...</div>;

  if (message) {
    // keep rendering but show message
  }

  return (
    <div className="checkout container">
      <h1>Checkout</h1>
      {message && <div className="message">{message}</div>}

      {!order && <div>No order found.</div>}

      {order && (
        <div className="checkoutCard">
          <div className="summary">
            <h2>{order.account?.title || "Item"}</h2>
            <div>Order ID: {order.id}</div>
            <div>Amount: ₦{order.amount}</div>
            <div>Status: {order.status}</div>
            <div>Time left to pay: {formatTime(countdown)}</div>
          </div>

          <div className="bankCard">
            <h3>Pay by bank transfer (OPay)</h3>
            <div>Bank: <strong>{bank?.bank}</strong></div>
            <div>Account name: <strong>{bank?.accountName}</strong></div>
            <div>
              Account number: <strong>{bank?.accountNumber}</strong>
              <button onClick={copyAccount} style={{ marginLeft: 8 }}>Copy</button>
            </div>
            <p>Please include your Order ID <strong>{order.id}</strong> in the transfer narration.</p>

            <div className="proofUpload">
              <label>Provider transaction reference (optional)</label>
              <input value={providerRef} onChange={(e) => setProviderRef(e.target.value)} placeholder="e.g. OPAY_TX_REF" />

              <label>Upload proof (screenshot)</label>
              <input type="file" accept="image/*,application/pdf" onChange={(e) => setProofFile(e.target.files[0])} />

              <div className="actions">
                <button onClick={handleVerify} disabled={verifying || !providerRef}>{verifying ? "Verifying..." : "Verify with reference"}</button>
                <button onClick={handleNotify} disabled={notifying}>{notifying ? "Notifying..." : "I have paid — Notify admin"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .container { padding: 20px; }
        .checkoutCard { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .bankCard { border: 1px solid #ddd; padding: 16px; border-radius: 8px; }
        .message { background: #f0f8ff; padding: 8px; margin-bottom: 12px; border-radius: 6px; }
        .actions { margin-top: 12px; display:flex; gap:8px }
      `}</style>
    </div>
  );
}
