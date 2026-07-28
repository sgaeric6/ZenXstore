import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "ZenXStore",
  description: "Professional Free Fire Account Marketplace"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
