import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { testimonialAvatars } from "@/data/testimonials";

const Testimonials: React.FC = async () => {
  const t = await getTranslations("testimonials");
  const items = t.raw("items") as Array<{ name: string; role: string; message: string }>;

  return (
    <div className="grid gap-14 max-w-lg w-full mx-auto lg:gap-8 lg:grid-cols-3 lg:max-w-full">
      {items.map((testimonial, index) => (
        <div key={index}>
          <div className="flex items-center mb-4 w-full justify-center lg:justify-start">
            <Image
              src={testimonialAvatars[index]}
              alt={`${testimonial.name} avatar`}
              width={50}
              height={50}
              className="rounded-full shadow-md"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-secondary">{testimonial.name}</h3>
              <p className="text-sm text-foreground-accent">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-foreground-accent text-center lg:text-left">&quot;{testimonial.message}&quot;</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
