import type { Metadata } from "next";
import { Outfit, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sima Mikaiil — AI Consultant & Creative Strategist",
  description: "AI consultant helping artists and businesses embrace artificial intelligence. Custom AI agents, brand strategy, prompt engineering, and workflow automation.",
  keywords: "AI consultant, creative strategist, AI agents, n8n automation, prompt engineering, personal branding, AI for artists",
  openGraph: {
    title: "Sima Mikaiil — AI Consultant & Creative Strategist",
    description: "AI consultant helping artists and businesses embrace artificial intelligence. Custom AI agents, brand strategy, prompt engineering, and workflow automation.",
    url: "https://simamikaiil.com",
    siteName: "Sima Mikaiil",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${playfair.variable} ${cormorant.variable} antialiased`}
        style={{ background: "#FAF3E0" }}
      >
        {children}
      </body>
    </html>
  );
}
