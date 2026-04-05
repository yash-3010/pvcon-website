"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

interface ServiceCard {
  num: string;
  title: string;
  description: string;
  href: string;
}

interface FlagshipCardsProps {
  services: ServiceCard[];
  learnMore: string;
  cta: string;
  ctaHref: string;
}

/* ── Animated grid dot background ─────────────────────────── */
function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base dark */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(146,179,83,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(146,179,83,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow — top left primary accent */}
      <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/[0.06] blur-[120px]" />

      {/* Radial glow — bottom right secondary */}
      <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-secondary/[0.08] blur-[100px]" />

      {/* Dot accent */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

/* ── Individual card ──────────────────────────────────────── */
function ServiceTile({
  service,
  index,
  learnMore,
}: {
  service: ServiceCard;
  index: number;
  learnMore: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
    <Link
      href={service.href}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-7 sm:p-8 backdrop-blur-sm transition-colors duration-300 hover:border-primary/30 hover:from-white/[0.08] hover:to-white/[0.04] min-h-[260px]"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
      </div>

      {/* Corner accents on hover */}
      <div className="pointer-events-none absolute inset-0 hidden group-hover:block" aria-hidden="true">
        <div className="absolute -left-[3px] -top-[3px] h-2.5 w-2.5 rounded-sm bg-primary/60" />
        <div className="absolute -right-[3px] -top-[3px] h-2.5 w-2.5 rounded-sm bg-primary/60" />
        <div className="absolute -left-[3px] -bottom-[3px] h-2.5 w-2.5 rounded-sm bg-primary/60" />
        <div className="absolute -right-[3px] -bottom-[3px] h-2.5 w-2.5 rounded-sm bg-primary/60" />
      </div>

      {/* Number watermark */}
      <span
        className="absolute top-4 right-5 text-[5rem] font-black leading-none text-white/[0.03] select-none pointer-events-none group-hover:text-primary/[0.06] transition-colors duration-500"
        aria-hidden="true"
      >
        {service.num}
      </span>

      {/* Content */}
      <div className="relative z-10">
        {/* Number badge */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-xs font-bold text-primary tracking-wider group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
            {service.num}
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent group-hover:from-primary/20 transition-colors duration-300" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-3 group-hover:text-primary/90 transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-sm leading-relaxed text-white/50 group-hover:text-white/65 transition-colors duration-300">
          {service.description}
        </p>
      </div>

      {/* Learn more link */}
      <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 group-hover:text-primary group-hover:gap-3 transition-all duration-300">
        {learnMore}
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
    </motion.div>
  );
}

/* ── Main exported component ──────────────────────────────── */
export default function FlagshipCards({
  services,
  learnMore,
  cta,
  ctaHref,
}: FlagshipCardsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 px-5 overflow-hidden"
    >
      <GridBackground />

      <div className="max-w-7xl mx-auto">
        {/* Spacer for server-rendered heading above */}
        <div className="mb-16 lg:mb-20 pt-24 lg:pt-28" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <ServiceTile
              key={service.num}
              service={service}
              index={i}
              learnMore={learnMore}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-accent text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm tracking-wide"
          >
            {cta}
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
