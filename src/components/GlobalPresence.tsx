import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import FadeInView from "./FadeInView";
import SectionLabel from "./SectionLabel";
import { globeMarkers, globeColors } from "@/data/company/globe-markers";

/** Lazy-load the WebGL globe — no SSR, keeps bundle lean. */
const Globe = dynamic(
  () => import("@/components/ui/cobe-globe").then((m) => m.Globe),
  { ssr: false }
);

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

        {/* Interactive globe with country labels */}
        <FadeInView delay={0.15}>
          <Globe
            markers={globeMarkers}
            className="max-w-[580px] mx-auto overflow-visible"
            markerColor={globeColors.markerColor}
            baseColor={globeColors.baseColor}
            glowColor={globeColors.glowColor}
            markerSize={0.025}
            mapSamples={24000}
          />
        </FadeInView>

        {/* Stats banner */}
        <FadeInView delay={0.25}>
          <section className="relative mt-8 z-10 px-5">
            <div className="max-w-5xl mx-auto">
              <FadeInView>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden shadow-lg">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="bg-secondary text-center py-4 px-4">
                      <div className="text-3xl lg:text-3xl font-bold text-white mb-1">
                        {t(`stats.${i}.value`)}
                      </div>
                      <div className="text-white/60 text-xs uppercase tracking-widest font-medium">
                        {t(`stats.${i}.label`)}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeInView>
            </div>
          </section>
        </FadeInView>
      </div>
    </section>
  );
};

export default GlobalPresence;
