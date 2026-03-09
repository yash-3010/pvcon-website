import Link from "next/link";
import Image from "next/image";
import { heroDetails } from "@/data/hero";
import HeroAnimation from "./HeroAnimation";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative pt-28 md:pt-36 pb-10 md:pb-20 px-5 overflow-hidden"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-hero-background bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Animated heading — full width, massive */}
        <HeroAnimation heading={heroDetails.heading} />

        {/* Split layout: description left, image right */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mt-12 lg:mt-16 items-center">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-foreground-accent leading-relaxed max-w-lg mx-auto lg:mx-0">
              {heroDetails.subheading}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <Link
                href="/#cta"
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm uppercase tracking-wider"
              >
                Request Consultation
              </Link>
              <Link
                href="/about"
                className="text-secondary hover:text-primary font-medium text-sm transition-colors flex items-center gap-1"
              >
                Learn More
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="flex-1 relative">
            <Image
              src={heroDetails.centerImageSrc}
              width={560}
              height={400}
              quality={85}
              sizes="(max-width: 768px) 100vw, 560px"
              priority
              alt="Pharmacovigilance consulting dashboard mockup"
              className="relative mx-auto w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
    </section>
  );
};

export default Hero;
