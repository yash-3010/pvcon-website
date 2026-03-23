import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FadeInView from "./FadeInView";
import SectionLabel from "./SectionLabel";
import {
  FiShield,
  FiSearch,
  FiFolder,
  FiBookOpen,
  FiArrowRight,
} from "react-icons/fi";
import type { IconType } from "react-icons";

interface FlagshipService {
  key: string;
  icon: IconType;
  href: string;
}

const flagshipServices: FlagshipService[] = [
  { key: "qppv", icon: FiShield, href: "/services/pv-consulting" },
  { key: "audit", icon: FiSearch, href: "/services/gxp-audits" },
  { key: "psmf", icon: FiFolder, href: "/services/psmf" },
  { key: "training", icon: FiBookOpen, href: "/services/training-capability-development" },
];

const FlagshipSolutions: React.FC = async () => {
  const t = await getTranslations("flagshipSolutions");

  return (
    <section className="relative py-20 lg:py-32 px-5 overflow-hidden">
      {/* Subtle radial glow behind hub */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/[0.04] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <FadeInView>
          <SectionLabel center>{t("label")}</SectionLabel>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-4">
            {t("heading")}
          </h2>
          <p className="text-foreground-accent text-center max-w-2xl mx-auto mb-20 text-sm leading-relaxed">
            {t("description")}
          </p>
        </FadeInView>

        {/* ── Desktop hub layout (3-column) ──────────────────── */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] gap-x-12 items-center">
          {/* Left column — cards 1 & 3 (right-aligned toward center) */}
          <div className="space-y-10 z-10">
            <FadeInView delay={0.1}>
              <ServiceTile service={flagshipServices[0]} t={t} align="right" num="01" />
            </FadeInView>
            <FadeInView delay={0.3}>
              <ServiceTile service={flagshipServices[2]} t={t} align="right" num="03" />
            </FadeInView>
          </div>

          {/* Center — image hub */}
          <FadeInView delay={0.15}>
            <div className="relative flex items-center justify-center">
              {/* Outer decorative rings */}
              <div className="absolute w-80 h-80 rounded-full border border-dashed border-primary/15 animate-pulse" aria-hidden="true" />
              <div className="absolute w-96 h-96 rounded-full border border-primary/[0.07] animate-pulse" aria-hidden="true" />

              {/* Connector dots on the ring (N, E, S, W) */}
              {[
                "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
                "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
              ].map((pos, i) => (
                <span
                  key={i}
                  className={`absolute w-2.5 h-2.5 rounded-full bg-primary/30 ${pos}`}
                  style={{ zIndex: 2 }}
                  aria-hidden="true"
                />
              ))}

              {/* Main circle with image */}
              <div className="relative w-64 h-64 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center z-10">
                <div className="w-44 h-44 flex items-center justify-center">
                  <Image
                    src="/images/flagship-hands.webp"
                    alt="PVCON collaborative pharmacovigilance partnership"
                    width={280}
                    height={280}
                    className="object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Inner glow */}
                <div
                  className="absolute -inset-6 rounded-full bg-primary/[0.06] blur-2xl -z-10"
                  aria-hidden="true"
                />
              </div>
            </div>
          </FadeInView>

          {/* Right column — cards 2 & 4 (left-aligned toward center) */}
          <div className="space-y-10">
            <FadeInView delay={0.2}>
              <ServiceTile service={flagshipServices[1]} t={t} align="left" num="02" />
            </FadeInView>
            <FadeInView delay={0.4}>
              <ServiceTile service={flagshipServices[3]} t={t} align="left" num="04" />
            </FadeInView>
          </div>
        </div>

        {/* ── Mobile / tablet layout ─────────────────────────── */}
        <div className="lg:hidden">
          {/* Centered image */}
          <FadeInView>
            <div className="flex justify-center mb-12">
              <div className="relative w-44 h-44 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center">
                <div className="w-28 h-28 flex items-center justify-center">
                  <Image
                    src="/images/flagship-hands.webp"
                    alt="PVCON collaborative pharmacovigilance partnership"
                    width={180}
                    height={180}
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <div
                  className="absolute -inset-4 rounded-full border border-dashed border-primary/15"
                  aria-hidden="true"
                />
              </div>
            </div>
          </FadeInView>

          {/* Service cards — 2×2 on tablet, 1-col on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {flagshipServices.map((service, i) => (
              <FadeInView key={service.key} delay={i * 0.1}>
                <ServiceTile service={service} t={t} num={String(i + 1).padStart(2, "0")} />
              </FadeInView>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeInView delay={0.5}>
          <div className="mt-20 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm tracking-wide"
            >
              {t("cta")}
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};

/* ── Service tile ──────────────────────────────────────────── */
interface TileProps {
  service: FlagshipService;
  t: Awaited<ReturnType<typeof getTranslations>>;
  align?: "left" | "right";
  num: string;
}

function ServiceTile({ service, t, align, num }: TileProps) {
  const Icon = service.icon;
  const isRight = align === "right";

  return (
    <Link href={service.href} className="group block">
      <div
        className={[
          "relative p-6 lg:p-8 rounded-2xl border border-gray-100 bg-white",
          "hover:border-primary/30 hover:shadow-lg transition-all duration-300",
          isRight ? "lg:text-right" : "",
        ].join(" ")}
      >
        {/* Number watermark */}
        <span
          className={[
            "absolute top-4 text-6xl font-black text-primary/[0.06] leading-none select-none pointer-events-none",
            isRight ? "left-4" : "right-4",
          ].join(" ")}
          aria-hidden="true"
        >
          {num}
        </span>

        <div
          className={[
            "flex items-center gap-3 mb-3",
            isRight ? "lg:flex-row-reverse" : "",
          ].join(" ")}
        >
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold tracking-tight">
            {t(`services.${service.key}.title`)}
          </h3>
        </div>

        <p className="text-foreground-accent text-sm leading-relaxed mb-4">
          {t(`services.${service.key}.description`)}
        </p>

        <div
          className={[
            "flex items-center gap-1.5 text-primary text-xs font-semibold uppercase tracking-widest group-hover:gap-2.5 transition-all",
            isRight ? "lg:justify-end" : "",
          ].join(" ")}
        >
          {t("learnMore")}
          <FiArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}

export default FlagshipSolutions;
