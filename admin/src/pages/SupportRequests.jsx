import React, { useState, useEffect } from "react";

export default function SupportRequests() {
  const [requests, setRequests] = useState(() => JSON.parse(localStorage.getItem("support_requests") || "[]"));

  useEffect(() => {
    localStorage.setItem("support_requests", JSON.stringify(requests));
  }, [requests]);

  function approve(req) {
    // move request to support users list
    const supports = JSON.parse(localStorage.getItem("support_users") || "[]");
    supports.push({ id: req.id, email: req.email, role: "SUPPORT", createdAt: new Date().toISOString() });
    localStorage.setItem("support_users", JSON.stringify(supports));

    // remove from requests
    setRequests((r) => r.filter((x) => x.id !== req.id));
    // eslint-disable-next-line no-alert
    alert(`Approved support user: ${req.email}`);
  }

  function reject(req) {
    setRequests((r) => r.filter((x) => x.id !== req.id));
  }

  if (!requests.length) return <div><h3>No support requests</h3></div>;

  return (
    <div>
      <h2>Support Requests</h2>
      <div style={{ display: "grid", gap: 8 }}>
        {requests.map((r) => (
          <div key={r.id} style={{ border: "1px solid #ddd", padding: 12 }}>
            <p><strong>{r.email}</strong></p>
            <p>Requested at: {new Date(r.createdAt).toLocaleString()}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => approve(r)}>Approve</button>
              <button onClick={() => reject(r)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
