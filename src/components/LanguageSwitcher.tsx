"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { HiOutlineGlobeAlt, HiChevronDown } from "react-icons/hi2";

const LanguageSwitcher: React.FC = () => {
  const t = useTranslations("languageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (locale: string) => {
    router.replace(pathname, { locale });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1 text-foreground hover:text-foreground-accent transition-colors text-sm px-2 py-1 rounded-md"
      >
        <HiOutlineGlobeAlt className="h-5 w-5" />
        <HiChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="absolute right-0 mt-1 min-w-[130px] bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50"
        >
          {routing.locales.map((locale) => (
            <li key={locale} role="option" aria-selected={false}>
              <button
                onClick={() => switchLocale(locale)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors text-foreground"
              >
                {t(`languages.${locale}`)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
