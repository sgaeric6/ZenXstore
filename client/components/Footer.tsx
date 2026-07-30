import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footerTop">

        <div className="footerBrand">

          <h2>
            Zen<span>X</span>Store
          </h2>

          <p>
            Nigeria's premium marketplace for buying and selling
            digital products securely with instant payments.
          </p>

        </div>

        <div>

          <h3>Marketplace</h3>

          <Link href="/buy">Buy</Link>

          <Link href="/sell">Sell</Link>

          <Link href="/listings">Listings</Link>

        </div>

        <div>

          <h3>Company</h3>

          <Link href="/support">Support</Link>

          <Link href="/about">About</Link>

          <Link href="/contact">Contact</Link>

        </div>

        <div>

          <h3>Legal</h3>

          <Link href="#">Privacy</Link>

          <Link href="#">Terms</Link>

          <Link href="#">Cookies</Link>

        </div>

      </div>

      <div className="footerBottom">

        <p>
          © 2026 ZenXStore. All Rights Reserved.
        </p>

        <div className="socials">

          <span>🌐</span>

          <span>📘</span>

          <span>📷</span>

          <span>✉️</span>

        </div>

      </div>

    </footer>
  );
}
