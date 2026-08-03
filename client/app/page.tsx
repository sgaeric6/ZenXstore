import Link from "next/link";

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
  // Filter to show only accounts uploaded by admins
  const adminListings = Array.isArray(listings) ? listings.filter((i) => i.seller?.role === "ADMIN") : [];
  const latest = adminListings.slice(0, 8);

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
    <main style={{ padding: 20 }}>
      <h1>Available Accounts (Admin uploads)</h1>

      <section className="listingsSection">
        <div className="sectionHeader">
          <h2>Latest Accounts</h2>
          <Link href="/listings">View all</Link>
        </div>

        <div className="cardsGrid">
          {latest.length === 0 && (
            <p className="muted">No admin-uploaded listings yet — check back later.</p>
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
    </main>
  );
}
