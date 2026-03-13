import FadeInView from "./FadeInView";

interface SubServiceCardProps {
  index: number;
  title: string;
  description: string;
}

const SubServiceCard: React.FC<SubServiceCardProps> = ({ index, title, description }) => (
  <FadeInView delay={index * 0.08}>
    <div className="relative p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group h-full">
      <div className="flex items-center gap-4 mb-5">
        <span className="text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-lg font-bold uppercase tracking-tight">{title}</h3>
      </div>
      <p className="text-foreground-accent text-sm leading-relaxed">{description}</p>
    </div>
  </FadeInView>
);

export default SubServiceCard;
