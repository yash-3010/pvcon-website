import { getTranslations } from "next-intl/server";

const Logos: React.FC = async () => {
  const t = await getTranslations("logos");
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;

  return (
    <section id="logos" className="py-20 px-5 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg font-medium">{t("tagline")}</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <p className="text-3xl font-bold text-secondary">{stat.value}</p>
              <p className="text-sm text-foreground-accent mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Logos;
