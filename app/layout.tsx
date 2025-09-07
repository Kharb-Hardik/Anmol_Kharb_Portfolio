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
  title: "Anmol Kharb | Professional Badminton Athlete",
  description: "The official portfolio of Anmol Kharb, India's rising badminton star. Discover her journey, watch highlights, and view her achievements.",
  keywords: ["Anmol Kharb", "Badminton", "India", "Athlete", "Professional Badminton", "BWF", "Indian Sport", "Badminton Player"],
  authors: [{ name: "Anmol Kharb" }],
  openGraph: {
    type: "website",
    url: "https://yourwebsite.com/", 
    title: "Anmol Kharb | Professional Badminton Athlete",
    description: "The official portfolio of Anmol Kharb, India's rising badminton star.",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Anmol Kharb on the badminton court",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@Kharbanmol", 
    title: "Anmol Kharb | Professional Badminton Athlete",
    description: "The official portfolio of Anmol Kharb, India's rising badminton star.",
    images: ["https://yourwebsite.com/og-image.jpg"], 
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
        className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
