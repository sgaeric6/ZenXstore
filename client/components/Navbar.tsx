export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px"
      }}
    >
      <h2>ZenXStore</h2>

      <div>
        Home | Buy | Sell | Login
      </div>
    </nav>
  );
}
