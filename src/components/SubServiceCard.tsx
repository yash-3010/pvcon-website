import FadeInView from "./FadeInView";

interface SubServiceCardProps {
  index: number;
  title: string;
  description: string | React.ReactNode;
  bullets?: string[];
}

const SubServiceCard: React.FC<SubServiceCardProps> = ({ index, title, description, bullets }) => (
  <FadeInView delay={index * 0.08}>
    <div className="relative p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group h-full flex flex-col">
      <div className="flex items-center gap-4 mb-5">
        <span className="text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-lg font-bold uppercase tracking-tight">{title}</h3>
      </div>
      <div className="text-foreground-accent text-sm leading-relaxed">{description}</div>
      {bullets && bullets.length > 0 && (
        <ul className="mt-4 space-y-2 flex-1">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-foreground-accent text-sm leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 opacity-40" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </FadeInView>
);

export default SubServiceCard;
