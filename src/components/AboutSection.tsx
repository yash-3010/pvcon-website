import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FadeInView from "./FadeInView";
import SectionLabel from "./SectionLabel";

const AboutSection: React.FC = async () => {
  const t = await getTranslations("aboutSection");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section id="about" className="relative bg-[#0d1117] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Left: image */}
        <div className="lg:w-1/2 relative min-h-[400px] p-4 lg:p-8 md:p-8 lg:min-h-[600px]">
          <Image
            src="/images/about3.webp"
            alt="PVCON pharmacovigilance consulting professional"
            width={800}
            height={600}
            quality={80}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Right: content */}
        <div className="lg:w-1/2 px-8 py-16 lg:px-16 lg:py-24 flex flex-col justify-center relative">
          <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full border border-white/10" aria-hidden="true" />

          <FadeInView>
            <SectionLabel light>{t("label")}</SectionLabel>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-10">
              {t("heading")}
            </h2>
          </FadeInView>

          <FadeInView delay={0.15}>
            <div className="border-l-2 border-white/20 pl-6 space-y-5">
              {paragraphs.map((text, i) => (
                <p key={i} className="text-white/70 leading-relaxed text-sm">{text}</p>
              ))}
            </div>
          </FadeInView>

          <FadeInView delay={0.25}>
            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center justify-center w-32 h-32 rounded-full border border-white/20 transition-colors text-xs hover:bg-primary hover:font-bold ease-in duration-300 text-gray-200/70 hover:text-[#0d1117] group"
              >
                {t("ctaLabel")}
                <span className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&nbsp;&#8599;</span>
              </Link>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
