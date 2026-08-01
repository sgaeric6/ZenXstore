import React from "react";
import axios from "axios";

export default function Complaints() {
  const openComplaint = async () => {
    try {
      await axios.post("/api/support/tickets", { subject: "New complaint", description: "Placeholder" });
      alert("Complaint opened (placeholder)");
    } catch (err) {
      console.error(err);
      alert("Could not open complaint");
    }
  };

  const resolveComplaint = async () => {
    try {
      // Placeholder: you should pass a ticket id
      await axios.post("/api/support/tickets/resolve", { id: "placeholder" });
      alert("Complaint resolved (placeholder)");
    } catch (err) {
      console.error(err);
      alert("Resolve failed");
    }
  };

  return (
    <div>
      <h1>Complaints</h1>

      <button onClick={openComplaint}>Open Complaint</button>

      <button onClick={resolveComplaint}>Resolve</button>

    </div>
  );
}
