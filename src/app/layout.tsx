import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
