import React from "react";
import axios from "axios";

export default function SellRequests() {
  const markBought = async () => {
    try {
      await axios.post("/api/support/sell/mark-bought", { id: "placeholder" });
      alert("Marked as Bought (placeholder)");
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const markDeclined = async () => {
    try {
      await axios.post("/api/support/sell/mark-declined", { id: "placeholder" });
      alert("Marked as Declined (placeholder)");
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  return (
    <div>

      <h1>Sell Requests</h1>

      <button onClick={markBought}>Bought</button>

      <button onClick={markDeclined}>Declined</button>

    </div>
  );
}
