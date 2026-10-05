import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "locomotive-scroll/locomotive-scroll.css";
import { SmoothScroll } from "./components/providers/SmoothScroll";

// Self-hosted (latin subset) instead of next/font/google: fetching Google Fonts
// at build time fails under Turbopack on Vercel.
const ptSerif = localFont({
  variable: "--font-pt-serif",
  src: [
    { path: "./fonts/pt-serif-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/pt-serif-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/pt-serif-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/pt-serif-700-italic.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
});

const outfit = localFont({
  variable: "--font-outfit",
  src: "./fonts/outfit-latin-var.woff2",
  weight: "300 700",
  display: "swap",
});

const jetbrains = localFont({
  variable: "--font-jetbrains",
  src: "./fonts/jetbrains-mono-latin-var.woff2",
  weight: "400 500",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moddin — Bangladesh, Made Easier to Enter",
  description:
    "Moddin helps global investors, companies, and institutions understand Bangladesh, access the right stakeholders, and move from interest to execution.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${ptSerif.variable} ${outfit.variable} ${jetbrains.variable}`}
    >
      <body id="top">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
