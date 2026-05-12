import { Ticker } from "../components/chrome/Ticker";
import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";

export const metadata = {
  title: "Country Branding & Positioning — Moddin",
  description: "Shape how Bangladesh is understood globally—through clear investment narratives, sector positioning, and investor-facing communication.",
};

export default function BrandingPage() {
  return (
    <>
      <Ticker />
      <Nav />
      <main className="pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-[clamp(40px,8vw,80px)] text-ink mb-6">Country Branding & Positioning</h1>
        <p className="text-stone max-w-2xl text-lg">
          Shape how Bangladesh is understood globally—through clear investment narratives, sector positioning, and investor-facing communication.
        </p>
      </main>
      <Footer />
    </>
  );
}
