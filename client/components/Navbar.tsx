import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 50px",
        background: "#111827",
        alignItems: "center"
      }}
    >
      <h2>ZenXStore</h2>

      <div
        style={{
          display: "flex",
          gap: "20px"
        }}
      >
        <Link href="/">Home</Link>
        <Link href="/buy">Buy</Link>
        <Link href="/sell">Sell</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
