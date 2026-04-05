import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import FadeInView from "./FadeInView";
import SectionLabel from "./SectionLabel";
import { companyPresence } from "@/data/company/config";
import { countryCoordinates } from "@/data/company/country-coordinates";

/** Lazy-load the WebGL globe — no SSR, keeps bundle lean. */
const CobeGlobe = dynamic(() => import("./CobeGlobe"), { ssr: false });

/**
 * Curated subset of countries to show labels for.
 * Spread across continents for visual balance without clutter.
 */
const labelledCountries: Record<string, string> = {
  US: "USA",
  BR: "Brazil",
  GB: "UK",
  DE: "Germany",
  IN: "India",
  JP: "Japan",
  AE: "UAE",
  ZA: "South Africa",
  SG: "Singapore",
  SA: "Saudi Arabia",
  TR: "Turkey",
  CN: "China",
  MX: "Mexico",
  AU: "Australia",
};

/** Pre-compute markers at build time (server component). */
const markers = companyPresence
  .filter(({ code }) => code in countryCoordinates)
  .map(({ code }) => ({
    location: [countryCoordinates[code].lat, countryCoordinates[code].lng] as [number, number],
    size: 0.025,
    ...(code in labelledCountries ? { id: code } : {}),
  }));

/** Labels for CSS-anchor-positioned country names. */
const labels = Object.entries(labelledCountries).map(([id, label]) => ({ id, label }));

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
          <CobeGlobe markers={markers} labels={labels} />
        </FadeInView>

        {/* Stats banner — unchanged */}
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
