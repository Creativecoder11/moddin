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

export default function Home() {
  return (
    <>
      <Nav />
      <main>
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
