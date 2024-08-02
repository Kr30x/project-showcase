import type { Metadata } from "next";
import { Anonymous_Pro, Inter } from "next/font/google";
import "./globals.css";

const inter = Anonymous_Pro({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "30 Days of Coding",
  description: "30 Days of Coding Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
