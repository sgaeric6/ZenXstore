export default function Features() {
  const features = [
    {
      title: "Secure Payments",
      desc: "All transactions are protected with escrow and secure payment verification.",
      icon: "🔒",
    },
    {
      title: "Instant Delivery",
      desc: "Receive digital products immediately after successful payment.",
      icon: "⚡",
    },
    {
      title: "Verified Sellers",
      desc: "Trade only with trusted and verified merchants on ZenXStore.",
      icon: "✅",
    },
    {
      title: "24/7 Support",
      desc: "Our support team is available around the clock to help you.",
      icon: "💬",
    },
  ];

  return (
    <section className="features">
      <h2>Why Choose ZenXStore?</h2>
      <p className="featuresSubtitle">
        Everything you need for safe and fast digital trading.
      </p>

      <div className="featureGrid">
        {features.map((item, index) => (
          <div className="featureCard" key={index}>
            <div className="featureIcon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
