import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { heroDetails } from "@/data/hero";
import HeroAnimation from "./HeroAnimation";
import GeometricBg from "@/components/GeometricBg";

const Hero: React.FC = async () => {
  const t = await getTranslations("hero");

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative pt-28 md:pt-36 pb-10 md:pb-20 px-5 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <GeometricBg variant="hero" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Tagline with decorative line */}
        <div className="flex items-center gap-4 mb-6">
          <p className="text-base md:text-lg font-semibold text-foreground">
            {t("tagline")}
          </p>
          <div className="hidden md:block flex-1 h-px bg-gray-300 max-w-xs" aria-hidden="true" />
        </div>

        {/* Massive heading — animated */}
        <HeroAnimation heading={t("heading")} />

        {/* Split layout: description left, image right */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mt-14 lg:mt-17 items-start">
          {/* Left: description + CTA + scroll arrow */}
          <div className="flex-1 max-w-md">
            <p className="text-foreground-accent leading-relaxed text-sm md:text-base text-justify">
              {t("description")}
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Link
                href="/#cta"
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-7 py-3 rounded-full transition-colors text-xs uppercase tracking-[0.15em]"
              >
                {t("ctaPrimary")}
              </Link>
              <Link
                href="/about"
                className="text-secondary hover:text-primary font-medium text-sm transition-colors"
              >
                {t("ctaSecondary")} &rarr;
              </Link>
            </div>
            {/* Scroll indicator */}
            <div className="mt-12 hidden lg:flex items-center gap-2 text-foreground-accent" aria-hidden="true">
              <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="animate-bounce"><path d="M6 2v8M6 10l-3-3M6 10l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="flex-1 relative">
            <Image
              src={heroDetails.heroImageSrc}
              width={720}
              height={480}
              quality={80}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
              priority
              alt="Pharmacovigilance consulting professionals in a laboratory setting"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
