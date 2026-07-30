import Link from "next/link";
import Features from "../components/Features";

export default function Home() {
  return (
    <main>
      <section className="hero">

        <div className="heroContent">

          <span className="heroBadge">
            🚀 Trusted by 50,000+ Users
          </span>

          <h1>
            The Future of
            <span> Digital Marketplace</span>
          </h1>

          <p>
            Buy and sell gift cards, software, digital accounts,
            subscriptions and more with instant payments and
            military-grade security.
          </p>

          <div className="heroButtons">

            <Link href="/buy">
              <button className="greenBtn">
                Start Buying
              </button>
            </Link>

            <Link href="/sell">
              <button className="outlineBtn">
                Sell Now
              </button>
            </Link>

          </div>

          <div className="heroStats">

            <div>
              <h2>₦120M+</h2>
              <span>Transactions</span>
            </div>

            <div>
              <h2>50K+</h2>
              <span>Customers</span>
            </div>

            <div>
              <h2>99.9%</h2>
              <span>Success Rate</span>
            </div>

          </div>

        </div>

        <div className="heroCard">

          <div className="tradeCard">

            <h3>Latest Trades</h3>

            <div className="trade">
              <span>Netflix Premium</span>
              <strong>₦6,500</strong>
            </div>

            <div className="trade">
              <span>Spotify Premium</span>
              <strong>₦2,800</strong>
            </div>

            <div className="trade">
              <span>Canva Pro</span>
              <strong>₦3,200</strong>
            </div>

            <div className="trade">
              <span>ChatGPT Plus</span>
              <strong>₦18,000</strong>
            </div>

          </div>

        </div>

      </section>

      <Features />

    </main>
  );
}
