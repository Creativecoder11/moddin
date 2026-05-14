import type { ServicePageContent, ServicePageKey } from "@/app/data/service-pages";
import { ServiceHero } from "./ServiceHero";
import { ServiceContext } from "./ServiceContext";
import { ServiceFeatures } from "./ServiceFeatures";
import { ServiceFaq } from "./ServiceFaq";
import { ServiceCta } from "./ServiceCta";

export function ServicePageContent({
  content,
}: {
  content: ServicePageContent;
  pageKey?: ServicePageKey;
}) {
  const contextBlocks = content.blocks.slice(0, 2);
  const featureBlocks = content.blocks.slice(2);

  return (
    <>
      <ServiceHero
        title={content.title}
        hero={content.hero}
        wireframeVariant={content.wireframeVariant}
        image={content.image}
      />
      {contextBlocks.length === 2 && (
        <ServiceContext
          block1={contextBlocks[0]}
          block2={contextBlocks[1]}
          accent={content.hero.accent}
          variant={content.wireframeVariant}
        />
      )}
      {featureBlocks.length > 0 && (
        <ServiceFeatures
          blocks={featureBlocks}
          accent={content.hero.accent}
          variant={content.wireframeVariant}
        />
      )}
      <ServiceFaq faqs={content.faqs} />
      <ServiceCta
        title={content.cta.title}
        body={content.cta.body}
        buttonLabel={content.cta.buttonLabel}
      />
    </>
  );
}
