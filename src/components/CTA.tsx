import { getTranslations } from "next-intl/server";
import { ctaDetails } from "@/data/common/cta";
import CtaCard from "./CtaCard";

const CTA: React.FC = async () => {
  const t = await getTranslations("cta");

  return (
    <section id="cta" className="mt-10 mb-5 lg:my-20">
      <CtaCard
        heading={t("heading")}
        description={t("subheading")}
        ctaLabel={t("ctaLabel")}
        ctaHref={ctaDetails.ctaUrl}
      />
    </section>
  );
};

export default CTA;
