import React from "react";
import axios from "axios";

export default function Profile() {
  const handleEdit = () => {
    // Example redirect or open edit UI
    window.location.href = "/support/profile/edit";
  };

  const requestApproval = async () => {
    try {
      await axios.post("/api/support/profile/request-approval", {});
      alert("Approval requested (placeholder)");
    } catch (err) {
      console.error(err);
      alert("Request failed");
    }
  };

  return (
    <div>

      <h1>Support Profile</h1>

      <p>Status: Pending Admin Approval</p>

      <button onClick={handleEdit}>Edit Profile</button>

      <button onClick={requestApproval}>Request Approval</button>

    </div>
  );
}
