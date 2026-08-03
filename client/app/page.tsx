import Link from "next/link";
import Features from "../components/Features";

async function fetchListings() {
  try {
    const res = await fetch("/api/listings", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.listings || [];
  } catch (err) {
    console.error("Failed to fetch listings", err);
    return [];
  }
}

export default async function Home() {
  const listings = await fetchListings();
  const latest = Array.isArray(listings) ? listings.slice(0, 8) : [];

  const fmt = (value) => {
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
      }).format(Number(value));
    } catch (e) {
      return `₦${value}`;
    }
  };

  return (
    <main>
      <section className="hero">
        <div className="heroContent">
          <span className="heroBadge">🚀 Trusted by 50,000+ Users</span>

          <h1>
            The Future of
            <span> Digital Marketplace</span>
          </h1>

          <p>
            Buy and sell Free Fire and other game accounts securely. Admins upload
            account details and images — buyers reserve, pay, and receive credentials
            securely after successful payment.
          </p>

          <div className="heroButtons">
            <Link href="/buy">
              <button className="greenBtn">Start Buying</button>
            </Link>

            <Link href="/sell">
              <button className="outlineBtn">Sell Now</button>
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

      <section className="listingsSection">
        <div className="sectionHeader">
          <h2>Latest Accounts</h2>
          <Link href="/listings">View all</Link>
        </div>

        <div className="cardsGrid">
          {latest.length === 0 && (
            <p className="muted">No listings yet — check back later.</p>
          )}

          {latest.map((item) => {
            const imageUrl =
              item.images && item.images.length > 0 && item.images[0].url
                ? item.images[0].url
                : "/placeholder.png";

            return (
              <article key={item.id} className="card">
                <Link href={`/listings/${item.id}`}>
                  <div className="cardImageWrapper">
                    <img src={imageUrl} alt={item.title || "account image"} />
                  </div>
                </Link>

                <div className="cardBody">
                  <h3>
                    <Link href={`/listings/${item.id}`}>{item.title}</Link>
                  </h3>

                  <div className="cardMeta">
                    <span className="price">{fmt(item.price ?? item.amount ?? 0)}</span>
                    <span className="region">{item.region || "Unknown"}</span>
                  </div>

                  <p className="desc">{item.description?.slice(0, 100) || "No description"}</p>

                  <div className="cardActions">
                    <Link href={`/listings/${item.id}`}>
                      <button className="greenBtn">View</button>
                    </Link>

                    <Link href={`/buy?account=${item.id}`}>
                      <button className="outlineBtn">Reserve</button>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Features />
    </main>
  );
}
