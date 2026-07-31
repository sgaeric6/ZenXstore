"use client";

import AccountsList from "../components/AccountsList";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>Accounts for Sale</h1>
      <AccountsList />
    </main>
  );
}
