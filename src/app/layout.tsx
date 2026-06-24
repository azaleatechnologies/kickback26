import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "July 3rd Kickback '26",
  description: "Year three. Friday, July 3, 2026. Mobile Bay.",
  openGraph: {
    title: "July 3rd Kickback '26",
    description: "Year three. Friday, July 3, 2026. Mobile Bay.",
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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
