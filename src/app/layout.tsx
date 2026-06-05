import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

// Display: festival-loud condensed sans
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

// Body: clean modern sans
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "July 3rd Kickback '26",
  description:
    "Year three. Friday, July 3, 2026. Mobile Bay. One night only.",
  openGraph: {
    title: "July 3rd Kickback '26",
    description: "Year three. Friday, July 3, 2026. Mobile Bay. One night only.",
    url: "https://kickback26.com",
    siteName: "July 3rd Kickback '26",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bay-deep text-sand">
        {children}
      </body>
    </html>
  );
}
