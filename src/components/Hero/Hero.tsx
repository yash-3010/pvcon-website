// No "use client" needed here
import Image from "next/image";
import { heroDetails } from "@/data/hero";
import HeroAnimation from "./HeroAnimation";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative flex items-center justify-center pb-0 pt-32 md:pt-40 px-5"
    >
      {/* Background — pure CSS, no JS needed */}
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full" aria-hidden="true">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)]" aria-hidden="true" />

      <div className="text-center">
        {/* Only the animated text is client */}
        <HeroAnimation heading={heroDetails.heading} subheading={heroDetails.subheading} />

        {/* Image stays server-rendered, remove unoptimized */}
        <Image
          src={heroDetails.centerImageSrc}
          width={384}
          height={340}
          quality={85}          // 100 is overkill, 85 is visually identical but much smaller
          sizes="(max-width: 768px) 100vw, 384px"
          priority={true}
          // ❌ remove unoptimized={true} — this bypasses Next.js image optimization entirely
          alt="Pharmacovigilance consulting dashboard mockup"  // descriptive alt, not generic
          className="relative mx-auto z-10"
        />
      </div>
    </section>
  );
};

export default Hero;