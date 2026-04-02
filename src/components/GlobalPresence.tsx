import { getTranslations } from "next-intl/server";
import FadeInView from "./FadeInView";
import SectionLabel from "./SectionLabel";
import WorldMapSvg from "./WorldMapSvg";

const GlobalPresence: React.FC = async () => {
  const t = await getTranslations("globalPresence");

  return (
    <section className="relative py-16 lg:py-28 px-5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeInView>
          <SectionLabel center>{t("tag")}</SectionLabel>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-4">
            {t("heading")}
          </h2>
          <p className="text-foreground-accent text-center max-w-2xl mx-auto mb-14 text-sm leading-relaxed">
            {t("subtitle")}
          </p>
        </FadeInView>

        <FadeInView delay={0.15}>
          <WorldMapSvg />
        </FadeInView>

        {/* Stat cards */}
        <FadeInView delay={0.25}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 max-w-3xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <p className="text-4xl md:text-5xl font-extrabold text-secondary mb-1">
                  {t(`stats.${i}.value`)}
                </p>
                <p className="text-foreground-accent text-sm">
                  {t(`stats.${i}.label`)}
                </p>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
};

export default GlobalPresence;
