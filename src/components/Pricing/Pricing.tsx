import { getTranslations } from "next-intl/server";
import PricingColumn from "./PricingColumn";
import { IPricing } from "@/types";

const Pricing: React.FC = async () => {
  const t = await getTranslations("pricing");
  const tiers = t.raw("tiers") as Array<{ name: string; price: string; features: string[] }>;

  const getStarted = t("getStarted");
  const features = t("features");
  const featuresSubtext = t("featuresSubtext");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {tiers.map((tier: IPricing, index: number) => (
        <PricingColumn
          key={tier.name}
          tier={tier}
          highlight={index === 1}
          getStarted={getStarted}
          features={features}
          featuresSubtext={featuresSubtext}
        />
      ))}
    </div>
  );
};

export default Pricing;
