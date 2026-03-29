import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Prima del Verbo",
  description: "Non stai cercando risposte. Stai ricordando.",
  metadataBase: new URL("https://primadelverbo.it"),
  openGraph: {
    title: "Prima del Verbo",
    description: "Non stai cercando risposte. Stai ricordando.",
    url: "https://primadelverbo.it",
    siteName: "Prima del Verbo",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Prima del Verbo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prima del Verbo",
    description: "Non stai cercando risposte. Stai ricordando.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: "https://primadelverbo.it",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${cormorant.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
