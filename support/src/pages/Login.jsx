import React from "react";

export default function Login() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Support Login</h1>

      <input placeholder="Email" />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
      />

      <br /><br />

      <button>Login</button>
    </div>
  );
}
