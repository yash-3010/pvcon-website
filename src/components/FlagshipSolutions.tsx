import { getTranslations } from "next-intl/server";
import FlagshipCards from "./FlagshipCards";

interface FlagshipService {
  key: string;
  href: string;
}

const flagshipServices: FlagshipService[] = [
  { key: "audit", href: "/services/gxp-audits" },
  { key: "pvoi", href: "/services/pv-consulting" },
  { key: "qms", href: "/services/pv-consulting" },
  { key: "training", href: "/services/training-upskilling" },
];

const FlagshipSolutions: React.FC = async () => {
  const t = await getTranslations("flagshipSolutions");

  const services = flagshipServices.map((s, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: t(`services.${s.key}.title`),
    description: t(`services.${s.key}.description`),
    href: s.href,
  }));

  return (
    <div className="relative">
      {/* SEO-visible heading rendered server-side (visually hidden, placed inside the dark section) */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-20 lg:pt-28 px-5 pointer-events-none">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">
            {t("label")}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight lg:my-8 text-white">
            {t("heading")}
          </h2>
          <p className="text-white/50 text-center max-w-2xl mx-auto text-sm leading-relaxed">
            {t("description")}
          </p>
        </div>
      </div>

      <FlagshipCards
        services={services}
        learnMore={t("learnMore")}
        cta={t("cta")}
        ctaHref="/services"
      />
    </div>
  );
};

export default FlagshipSolutions;
