import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Little World Made For You",
  description: "A special birthday surprise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}