import FadeInView from "./FadeInView";
import { Link } from "@/i18n/navigation";

interface CtaCardProps {
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Reusable navy CTA card — shared by the homepage CTA section and the about page footer CTA.
 *  Keeps the gradient + grid background CSS in one place. */
const CtaCard: React.FC<CtaCardProps> = ({ heading, description, ctaLabel, ctaHref }) => (
  <div className="relative rounded-3xl overflow-hidden py-16 sm:py-24 px-8">
    {/* Navy background + subtle grid + green radial glow */}
    <div
      className="absolute inset-0 -z-10 bg-[#202f63]
        bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
        bg-[size:5rem_5rem]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,#92b35320,transparent)]" />
    </div>

    <div className="flex flex-col items-center text-center text-white">
      <FadeInView>
        <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-4 max-w-2xl">
          {heading}
        </h2>
        <p className="mx-auto max-w-xl md:px-5 text-white/70 mb-6">{description}</p>
        <Link
          href={ctaHref}
          className="inline-flex bg-primary hover:bg-primary-accent text-black font-semibold px-8 py-3 rounded-full transition-colors"
        >
          {ctaLabel}
        </Link>
      </FadeInView>
    </div>
  </div>
);

export default CtaCard;
