import type { Metadata } from "next";
import { Ticker } from "./components/chrome/Ticker";
import { Nav } from "./components/chrome/Nav";
import { Footer } from "./components/chrome/Footer";
import { Hero } from "./components/sections/Hero";
import { Opportunity } from "./components/sections/Opportunity";
import { Role } from "./components/sections/Role";
import { PhotoBand } from "./components/sections/PhotoBand";
import { Services } from "./components/sections/Services";
import { Who } from "./components/sections/Who";
import { Insights } from "./components/sections/Insights";
import { FinalCta } from "./components/sections/FinalCta";

// Title and openGraph come from the root layout; the home page only adds its canonical.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Ticker />
        <Opportunity />
        <Role />
        <PhotoBand />
        <Services />
        <Who />
        <Insights />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
