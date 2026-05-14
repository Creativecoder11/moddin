import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";
import { ServicePageContent } from "../components/sections/ServicePageContent";
import { SERVICE_PAGE_CONTENT } from "@/app/data/service-pages";

const content = SERVICE_PAGE_CONTENT.branding;

export const metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function BrandingPage() {
  return (
    <>
      <Nav />
      <main>
        <ServicePageContent content={content} pageKey="branding" />
      </main>
      <Footer />
    </>
  );
}
