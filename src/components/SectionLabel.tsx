/** Reusable section label/tag — small uppercase text above section headings.
 *  Used site-wide to maintain consistent label styling in one place. */
interface SectionLabelProps {
  children: React.ReactNode;
  center?: boolean;
  /** Override text colour for dark backgrounds (e.g. navy/dark sections) */
  light?: boolean;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ children, center = false, light = false }) => (
  <p
    className={[
      "text-xs font-semibold uppercase tracking-[0.2em] mb-3",
      light ? "text-white/50" : "text-foreground-accent",
      center ? "text-center" : "",
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </p>
);

export default SectionLabel;
