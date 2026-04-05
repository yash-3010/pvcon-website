import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-5">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, var(--primary) 1px, transparent 1px), radial-gradient(circle at 75% 75%, var(--secondary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative text-center max-w-lg mx-auto">
        {/* Large 404 */}
        <h1 className="text-[8rem] md:text-[12rem] font-extrabold leading-none tracking-tighter text-secondary/10 select-none">
          404
        </h1>

        {/* Message */}
        <div className="-mt-10 md:-mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
            Page Not Found
          </h2>
          <p className="text-foreground-accent mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex bg-secondary hover:bg-secondary/90 text-white font-semibold px-7 py-3 rounded-full transition-colors text-xs uppercase tracking-[0.15em]"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex border border-secondary/20 hover:border-secondary/40 text-secondary font-semibold px-7 py-3 rounded-full transition-colors text-xs uppercase tracking-[0.15em]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
