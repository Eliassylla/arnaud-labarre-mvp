import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arnaud Labarre – Menuiserie sur mesure en Belgique",
  description: "Créateur de mobilier en bois noble depuis 20 ans. Qualité artisanale et élégance intemporelle.",
  openGraph: {
    title: "Arnaud Labarre – Menuiserie d'exception",
    description: "Découvrez un artisan ébéniste passionné à Beersel. Mobilier sur mesure en bois noble, façonné selon les règles de l'art.",
    url: "https://arnaudlabarre.be",
    siteName: "Arnaud Labarre",
    locale: "fr_BE",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aperçu du site Arnaud Labarre",
      },
    ],
  },
  metadataBase: new URL("https://arnaudlabarre.be"),
  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <style dangerouslySetInnerHTML={{ __html: `
          /* Set background color immediately */
          html, body { background-color: #F8F5EF; }
          
          /* Prevent hero flash - simplest approach */
          section[id="accueil"] {
            opacity: 0;
          }
          
          /* Only make visible when JS loads the page */
          body.js-loaded section[id="accueil"] {
            opacity: 1;
            transition: opacity 0.1s ease-out;
          }
        `}} />
      </head>
      <body className="antialiased">
        <ScrollToTop />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
