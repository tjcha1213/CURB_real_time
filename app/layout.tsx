import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Curb — Massachusetts' unfinished bulky-waste story",
  description:
    "A data-journalism site on the gap between Massachusetts' 2022 Mattress Disposal Ban and the unregulated reality of furniture waste — and a proposed municipal pick-up + reuse platform.",
  metadataBase: new URL("https://furniture.local"),
  openGraph: {
    title: "The Curb — Massachusetts' unfinished bulky-waste story",
    description:
      "How Allston Christmas exposes a gap in bulky-waste policy, and what to do about it.",
    type: "article",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
