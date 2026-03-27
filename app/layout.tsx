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
  openGraph: {
    title: "Prima del Verbo",
    description: "Non stai cercando risposte. Stai ricordando.",
    siteName: "Prima del Verbo",
    locale: "it_IT",
    type: "website",
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
