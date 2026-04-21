import { Ticker } from "../components/chrome/Ticker";
import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";
import { Gap } from "../components/sections/Gap";

export const metadata = {
  title: "Why Bangladesh — Moddin",
  description: "Understanding the Bangladesh gap and opportunity.",
};

export default function WhyBangladeshPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <main>
        {/* Using Gap component with consistent design tokens as the homepage */}
        <Gap />
      </main>
      <Footer />
    </>
  );
}
