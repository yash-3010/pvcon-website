import { getTranslations } from "next-intl/server";
import { benefitsConfig } from "@/data/home/benefits";
import { IBenefit } from "@/types";
import BenefitSection from "./BenefitSection";

const Benefits: React.FC = async () => {
  const t = await getTranslations("benefits");
  const items = t.raw("items") as Array<{
    title: string;
    description: string;
    bullets: Array<{ title: string; description: string }>;
  }>;

  const benefits: IBenefit[] = items.map((item, i) => ({
    title: item.title,
    description: item.description,
    imageSrc: benefitsConfig[i].imageSrc,
    bullets: item.bullets.map((b, j) => ({
      title: b.title,
      description: b.description,
      icon: benefitsConfig[i].bulletIcons[j],
    })),
  }));

  return (
    <div id="services" role="region" aria-labelledby="services-heading">
      <h2 id="services-heading" className="sr-only">{t("srHeading")}</h2>
      {benefits.map((item, index) => (
        <BenefitSection key={index} benefit={item} imageAtRight={index % 2 !== 0} />
      ))}
    </div>
  );
};

export default Benefits;
