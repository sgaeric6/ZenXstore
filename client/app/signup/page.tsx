export default function SignupPage() {
  return (
    <main style={{ padding: 30 }}>
      <h1>Create Account</h1>

      <input placeholder="Full Name" />

      <br />
      <br />

      <input placeholder="Email" />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
      />

      <br />
      <br />

      <button>Create Account</button>
    </main>
  );
}
