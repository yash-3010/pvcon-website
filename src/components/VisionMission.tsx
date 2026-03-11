import { getTranslations } from "next-intl/server";
import FadeInView from "./FadeInView";
import GeometricBg from "./GeometricBg";
import SectionLabel from "./SectionLabel";

const VisionMission: React.FC = async () => {
  const t = await getTranslations("visionMission");
  const items = t.raw("items") as Array<{ number: string; title: string; description: string }>;

  return (
    <section id="vision" className="relative py-16 lg:py-28 px-5 overflow-hidden">
      <GeometricBg />
      <div className="max-w-7xl mx-auto">
        <FadeInView>
          <SectionLabel center>{t("label")}</SectionLabel>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-16">
            {t("heading")}
          </h2>
        </FadeInView>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
          {items.map((item, i) => (
            <FadeInView key={item.number} delay={(i + 1) * 0.1}>
              <div className="relative p-8 lg:p-10 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    {item.number}
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">{item.title}</h3>
                </div>
                <p className="text-foreground-accent leading-relaxed text-sm">{item.description}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
