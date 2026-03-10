import { getTranslations } from "next-intl/server";
import { ctaDetails } from "@/data/cta";

const CTA: React.FC = async () => {
  const t = await getTranslations("cta");

  return (
    <section id="cta" className="mt-10 mb-5 lg:my-20">
      <div className="relative h-full w-full z-10 mx-auto py-12 sm:py-20">
        <div className="h-full w-full">
          <div className="rounded-3xl absolute inset-0 -z-10 h-full w-full bg-[#202f63] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:5rem_5rem]">
            <div className="rounded-3xl absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,#92b35320,transparent)]"></div>
          </div>
          <div className="h-full flex flex-col items-center justify-center text-white text-center px-5">
            <h2 className="text-2xl sm:text-3xl md:text-5xl md:leading-tight font-semibold mb-4 max-w-2xl">
              {t("heading")}
            </h2>
            <p className="mx-auto max-w-xl md:px-5">{t("subheading")}</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={ctaDetails.ctaUrl}
                className="bg-primary hover:bg-primary-accent text-black font-semibold px-8 py-3 rounded-full transition-colors"
              >
                {t("ctaLabel")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
