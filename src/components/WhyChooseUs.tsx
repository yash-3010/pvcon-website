import Image from "next/image";
import { getTranslations } from "next-intl/server";
import FadeInView from "./FadeInView";

const WhyChooseUs: React.FC = async () => {
  const t = await getTranslations("whyChooseUs");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section id="why-us" className="relative py-16 lg:py-28 px-5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Left: image */}
        <div className="flex-1 min-h-[350px] lg:min-h-[450px] w-full flex justify-center">
          <Image
            src="/images/wcu1.webp"
            alt="PVCON pharmacovigilance consulting"
            width={600}
            height={400}
            quality={80}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain mx-auto"
            loading="lazy"
          />
        </div>

        {/* Right: content */}
        <div className="flex-1">
          <FadeInView>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-8">
              {t("heading")}
            </h2>
          </FadeInView>

          <FadeInView delay={0.15}>
            <div className="space-y-6">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-foreground-accent text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
