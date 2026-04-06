import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FadeInView from "./FadeInView";
import SectionLabel from "./SectionLabel";
import { FiArrowRight, FiCpu, FiFileText, FiClock, FiGlobe } from "react-icons/fi";

const spotlightIcons = [FiCpu, FiFileText, FiClock, FiGlobe];

const PsmfSpotlight: React.FC = async () => {
  const t = await getTranslations("productSpotlight");

  return (
    <section className="relative overflow-hidden">
      {/* Navy background with grid pattern */}
      <div
        className="absolute inset-0 -z-10 bg-[#202f63]
          bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
          bg-[size:5rem_5rem]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_50%,#92b35315,transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div className="lg:w-3/5">
            <FadeInView>
              <div className="flex items-center gap-3 mb-6">
                <SectionLabel light>{t("tag")}</SectionLabel>
                <span className="text-[10px] font-bold mb-3 uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full">
                  {t("badge")}
                </span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                {t("heading")}
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-xl">
                {t("description")}
              </p>
            </FadeInView>

            <FadeInView delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {(["01", "02", "03", "04"] as const).map((key, i) => {
                  const Icon = spotlightIcons[i];
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-white/90 text-sm font-medium">
                        {t(`features.${key}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </FadeInView>

            <FadeInView delay={0.25}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products/psmf-manager"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-accent text-black font-semibold px-8 py-3 rounded-full transition-colors"
                >
                  {t("cta")}
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={t("secondaryUrl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-3 rounded-full transition-colors"
                >
                  {t("secondaryCta")} ↗
                </a>
              </div>
            </FadeInView>
          </div>

          {/* Visual column — platform preview mockup */}
          <div className="lg:w-2/5">
            <FadeInView delay={0.2}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                    <div className="ml-4 flex-1 h-6 rounded-md bg-white/10 flex items-center px-3">
                      <span className="text-white/40 text-[10px] font-mono">psmfmanager.com</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-32 rounded bg-white/10" />
                      <div className="flex gap-2">
                        <div className="h-6 w-6 rounded bg-primary/30" />
                        <div className="h-6 w-6 rounded bg-white/10" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-16 rounded-lg bg-primary/15 flex flex-col items-center justify-center">
                        <div className="text-primary text-xs font-bold">98%</div>
                        <div className="text-white/30 text-[8px]">Compliance</div>
                      </div>
                      <div className="h-16 rounded-lg bg-white/10 flex flex-col items-center justify-center">
                        <div className="text-white/70 text-xs font-bold">v3.2</div>
                        <div className="text-white/30 text-[8px]">Current</div>
                      </div>
                      <div className="h-16 rounded-lg bg-white/10 flex flex-col items-center justify-center">
                        <div className="text-white/70 text-xs font-bold">24</div>
                        <div className="text-white/30 text-[8px]">Changes</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 rounded bg-white/10 w-full" />
                      <div className="h-3 rounded bg-white/10 w-4/5" />
                      <div className="h-3 rounded bg-primary/20 w-3/5" />
                      <div className="h-3 rounded bg-white/10 w-full" />
                      <div className="h-3 rounded bg-white/10 w-2/3" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <div className="h-8 flex-1 rounded-lg bg-primary/25 flex items-center justify-center">
                        <span className="text-primary text-[10px] font-bold">Generate PDF</span>
                      </div>
                      <div className="h-8 flex-1 rounded-lg bg-white/10 flex items-center justify-center">
                        <span className="text-white/40 text-[10px] font-bold">Review Changes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow behind mockup */}
                <div
                  className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl"
                  aria-hidden="true"
                />
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsmfSpotlight;
