/** Subtle geometric background elements — large thin circles + small dots.
 *  Pure CSS/SVG, no JS, zero layout shift. Used site-wide for visual cohesion. */
const GeometricBg: React.FC<{ variant?: "hero" | "section" }> = ({ variant = "section" }) => {
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Large thin circle — left */}
        <div className="absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full border border-gray-200/60" />
        {/* Smaller circle — right */}
        <div className="absolute -right-20 bottom-10 w-[300px] h-[300px] rounded-full border border-gray-300/60" />
        {/* Tiny accent dot */}
        <div className="absolute right-1/4 top-20 w-2 h-2 rounded-full bg-gray-300/40" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb99_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb99_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Single large thin circle */}
      <div className="absolute -right-40 -top-40 w-[400px] h-[400px] rounded-full border border-gray-200/40" />
      {/* Small dot */}
      <div className="absolute left-1/3 bottom-10 w-1.5 h-1.5 rounded-full bg-secondary/30" />
    </div>
  );
};

export default GeometricBg;
