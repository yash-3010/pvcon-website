"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle";

const FAQ: React.FC = () => {
  const t = useTranslations("faq");
  const items = t.raw("items") as Array<{ question: string; answer: string }>;

  return (
    <section id="faq" className="py-10 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-10">
        <div>
          <p className="hidden lg:block text-xs font-semibold uppercase tracking-widest">
            {t("label")}
          </p>
          <SectionTitle>
            <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">
              {t("title")}
            </h2>
          </SectionTitle>
          <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
            {t("contact")}
          </p>
          <a
            href={`mailto:${t("email")}`}
            className="mt-3 block text-xl lg:text-4xl text-secondary font-semibold hover:underline text-center lg:text-left"
          >
            {t("email")}
          </a>
        </div>
        <div className="w-full lg:max-w-2xl mx-auto border-b">
          {items.map((faq, index) => (
            <div key={index} className="mb-7">
              <Disclosure>
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex items-center justify-between w-full px-4 pt-7 text-lg text-left border-t">
                      <span className="text-xl font-semibold">{faq.question}</span>
                      {open ? <BiMinus className="w-5 h-5 text-secondary" /> : <BiPlus className="w-5 h-5 text-secondary" />}
                    </DisclosureButton>
                    <DisclosurePanel className="px-4 pt-4 pb-2 text-base text-foreground-accent">
                      {faq.answer}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
