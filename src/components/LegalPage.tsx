import React from "react";
import FadeInView from "./FadeInView";
import GeometricBg from "./GeometricBg";
import PageHero from "./PageHero";

interface LegalSection {
  title: string;
  content: string;
}

interface LegalPageProps {
  label: string;
  heading: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

/** Reusable layout for legal/policy pages (privacy, terms, cookies, disclaimer, impressum). */
const LegalPage: React.FC<LegalPageProps> = ({
  label,
  heading,
  subtitle,
  lastUpdated,
  sections,
}) => {
  return (
    <>
      <PageHero label={label} heading={heading} subtitle={subtitle} />

      <section className="relative py-16 lg:py-24 px-5 overflow-hidden">
        <GeometricBg />
        <div className="max-w-4xl mx-auto">
          <FadeInView>
            <p className="text-sm text-foreground-accent mb-12 border-l-2 border-primary pl-4">
              {lastUpdated}
            </p>
          </FadeInView>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <FadeInView key={index} delay={Math.min(index * 0.05, 0.3)}>
                <div className="group">
                  <h2 className="text-xl md:text-2xl font-bold text-secondary mb-4 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="prose prose-sm md:prose-base max-w-none text-foreground-accent leading-relaxed">
                    {section.content.split("\n\n").map((paragraph, pIdx) => {
                      // Handle markdown-style bold text
                      const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
                      return (
                        <p key={pIdx} className="mb-3">
                          {parts.map((part, partIdx) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                              return (
                                <strong key={partIdx} className="text-foreground font-semibold">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            // Handle list items (lines starting with -)
                            if (part.includes("\n-")) {
                              const lines = part.split("\n");
                              return (
                                <span key={partIdx}>
                                  {lines[0] && <span>{lines[0]}</span>}
                                  <span className="block mt-2 space-y-1.5">
                                    {lines.slice(1).map((line, lineIdx) => {
                                      if (line.startsWith("- ")) {
                                        const lineParts = line.slice(2).split(/(\*\*[^*]+\*\*)/g);
                                        return (
                                          <span key={lineIdx} className="flex items-start gap-2">
                                            <svg
                                              className="w-4 h-4 text-primary mt-0.5 shrink-0"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                            >
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                            <span>
                                              {lineParts.map((lp, lpIdx) =>
                                                lp.startsWith("**") && lp.endsWith("**") ? (
                                                  <strong key={lpIdx} className="text-foreground font-semibold">
                                                    {lp.slice(2, -2)}
                                                  </strong>
                                                ) : (
                                                  <span key={lpIdx}>{lp}</span>
                                                )
                                              )}
                                            </span>
                                          </span>
                                        );
                                      }
                                      return line ? <span key={lineIdx}>{line}</span> : null;
                                    })}
                                  </span>
                                </span>
                              );
                            }
                            return <span key={partIdx}>{part}</span>;
                          })}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalPage;
