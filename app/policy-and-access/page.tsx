import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";
import { ServicePageContent } from "../components/sections/ServicePageContent";
import { SERVICE_PAGE_CONTENT } from "@/app/data/service-pages";
import { pageMetadata } from "@/app/data/seo";

const content = SERVICE_PAGE_CONTENT.policyAndAccess;

export const metadata = pageMetadata({
  title: content.metadata.title,
  description: content.metadata.description,
  path: "/policy-and-access",
});

export default function PolicyAndAccessPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <ServicePageContent content={content} pageKey="policyAndAccess" />
      </main>
      <Footer />
    </>
  );
}
