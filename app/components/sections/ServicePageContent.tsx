import type { ServicePageContent, ServicePageKey } from "@/app/data/service-pages";
import type { InquiryId } from "@/lib/lead-validation";
import { ServiceHero } from "./ServiceHero";
import { ServiceBody } from "./ServiceBody";
import { ServiceFaq } from "./ServiceFaq";
import { ServiceCta } from "./ServiceCta";

const INQUIRY_BY_PAGE: Record<ServicePageKey, InquiryId> = {
  whyBangladesh: "general",
  trade: "trade",
  investment: "investment",
  branding: "branding",
  policyAndAccess: "policy",
};

export function ServicePageContent({
  content,
  pageKey,
}: {
  content: ServicePageContent;
  pageKey?: ServicePageKey;
}) {
  return (
    <>
      <ServiceHero
        title={content.title}
        tagline={content.tagline}
        hero={content.hero}
        wireframeVariant={content.wireframeVariant}
        image={content.image}
      />
      <ServiceBody content={content} />
      <ServiceFaq faqs={content.faqs} />
      <ServiceCta
        title={content.cta.title}
        body={content.cta.body}
        buttonLabel={content.cta.buttonLabel}
        accent={content.hero.accent}
        inquiry={pageKey ? INQUIRY_BY_PAGE[pageKey] : "general"}
      />
    </>
  );
}
