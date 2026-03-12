import FadeInView from "./FadeInView";
import GeometricBg from "./GeometricBg";

interface PageHeroProps {
  label: string;
  heading: string;
  subtitle: string;
}

/** Reusable hero-style header for inner pages (about, blog, etc.) */
const PageHero: React.FC<PageHeroProps> = ({ label, heading, subtitle }) => {
  return (
    <section
      aria-label={heading}
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-5 min-h-[70vh] flex flex-col justify-center overflow-hidden"
    >
      <GeometricBg variant="hero" />

      <div className="max-w-7xl mx-auto w-full">
        <FadeInView>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-accent">
              {label}
            </p>
            <div className="hidden md:block flex-1 h-px bg-gray-300 max-w-xs" aria-hidden="true" />
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.95] font-extrabold text-foreground uppercase tracking-tighter mb-8">
            {heading}
          </h1>
        </FadeInView>

        <FadeInView delay={0.2}>
          <p className="text-foreground-accent leading-relaxed text-base md:text-lg max-w-2xl">
            {subtitle}
          </p>
        </FadeInView>
      </div>
    </section>
  );
};

export default PageHero;
