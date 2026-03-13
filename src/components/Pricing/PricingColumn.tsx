import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IPricing } from "@/types";

interface Props {
  tier: IPricing;
  highlight?: boolean;
  getStarted: string;
  features: string;
  featuresSubtext: string;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight, getStarted, features: featuresLabel, featuresSubtext }) => {
  const { name, price, features } = tier;

  return (
    <div className={clsx("w-full max-w-sm mx-auto rounded-2xl border lg:max-w-full transition-all", {
      "bg-secondary border-secondary shadow-xl shadow-secondary/20": highlight,
      "bg-white border-gray-200 hover:border-primary/30 hover:shadow-sm": !highlight
    })}>
      <div className={clsx("p-6 border-b rounded-t-2xl", { "border-white/10": highlight, "border-gray-200": !highlight })}>
        <h3 className={clsx("text-2xl font-semibold mb-4 tracking-tight", { "text-white": highlight })}>{name}</h3>
        <p className={clsx("text-3xl md:text-5xl font-bold mb-6 tracking-tight", { "text-primary": highlight })}>
          <span>
            {typeof price === "number" ? `$${price}` : price}
          </span>
          {typeof price === "number" && <span className={clsx("text-lg font-normal", { "text-white/50": highlight, "text-gray-400": !highlight })}>/mo</span>}
        </p>
        <button className={clsx("w-full py-3 px-4 rounded-full transition-colors font-semibold text-sm", {
          "bg-primary hover:bg-primary-accent text-black": highlight,
          "bg-hero-background hover:bg-gray-200 text-foreground": !highlight
        })}>
          {getStarted}
        </button>
      </div>
      <div className="p-6 mt-1">
        <p className={clsx("text-xs font-semibold uppercase tracking-wider mb-1", { "text-white/70": highlight, "text-foreground-accent": !highlight })}>{featuresLabel}</p>
        <p className={clsx("text-sm mb-5", { "text-white/60": highlight, "text-foreground-accent": !highlight })}>{featuresSubtext}</p>
        <ul className="space-y-3.5 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <BsFillCheckCircleFill className={clsx("h-4 w-4 mt-0.5 flex-shrink-0", { "text-primary": highlight, "text-secondary": !highlight })} />
              <span className={clsx("text-sm", { "text-white/80": highlight, "text-foreground-accent": !highlight })}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingColumn;
