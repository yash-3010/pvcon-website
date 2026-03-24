import React from "react";
import { getTranslations } from "next-intl/server";

const Testimonials: React.FC = async () => {
  const t = await getTranslations("testimonials");
  const items = t.raw("items") as Array<{ role: string; company: string; message: string }>;

  return (
    <div className="grid gap-8 max-w-5xl w-full mx-auto lg:grid-cols-2">
      {items.map((testimonial, index) => (
        <div
          key={index}
          className="relative bg-white/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* Quote icon */}
          <svg
            className="w-10 h-10 text-primary/20 mb-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>

          {/* Testimonial message */}
          <p className="text-foreground-accent italic leading-relaxed text-[15px] md:text-base">
            {testimonial.message}
          </p>

          {/* Divider */}
          <div className="mt-6 mb-4 h-px bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

          {/* Attribution */}
          <div>
            <p className="text-sm font-semibold text-secondary">{testimonial.role}</p>
            <p className="text-xs text-foreground-accent mt-0.5">{testimonial.company}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
