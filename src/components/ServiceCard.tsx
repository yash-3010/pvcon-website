import type { IconType } from "react-icons";
import { Link } from "@/i18n/navigation";
import FadeInView from "./FadeInView";
import { FiArrowRight } from "react-icons/fi";

interface ServiceCardProps {
  slug: string;
  icon: IconType;
  title: string;
  description: string;
  subcategories: string[];
  learnMoreLabel: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  slug,
  icon: Icon,
  title,
  description,
  subcategories,
  learnMoreLabel,
  delay = 0,
}) => (
  <FadeInView delay={delay}>
    <Link
      href={`/services/${slug}`}
      className="group block h-full p-8 lg:p-10 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all bg-white"
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold uppercase tracking-tight">{title}</h3>
      </div>

      <p className="text-foreground-accent text-sm leading-relaxed mb-6">
        {description}
      </p>

      {subcategories.length > 0 && (
        <ul className="space-y-2 mb-6">
          {subcategories.map((sub) => (
            <li key={sub} className="flex items-start gap-2 text-sm text-foreground-accent">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {sub}
            </li>
          ))}
        </ul>
      )}

      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
        {learnMoreLabel}
        <FiArrowRight className="w-4 h-4" />
      </span>
    </Link>
  </FadeInView>
);

export default ServiceCard;
