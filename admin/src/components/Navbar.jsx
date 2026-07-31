import React, { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    let tagCount = Number(localStorage.getItem("site_tag_count") || 0);
    let adminCount = Number(localStorage.getItem("site_admin_count") || 0);

    function handleClick() {
      tagCount += 1;
      localStorage.setItem("site_tag_count", String(tagCount));

      if (tagCount >= 15 && !JSON.parse(localStorage.getItem("support_unlocked") || "false")) {
        localStorage.setItem("support_unlocked", "true");
        // lightweight notification
        // eslint-disable-next-line no-alert
        alert("Support has been unlocked for this session. Tap the floating support button to start a chat.");
      }

      adminCount += 1;
      localStorage.setItem("site_admin_count", String(adminCount));

      if (adminCount >= 20 && !JSON.parse(localStorage.getItem("admin_unlocked") || "false")) {
        localStorage.setItem("admin_unlocked", "true");
        // eslint-disable-next-line no-alert
        alert("Admin panel has been unlocked on this device. Visit the Admin Dashboard to find new admin tools.");
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <nav
      style={{
        padding: "20px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
    </nav>
  );
}
