import type { Metadata } from "next";
import { PT_Serif, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  subsets: ["latin"],
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
      <body id="top">{children}</body>
    </html>
  );
}
