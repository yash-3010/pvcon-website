"use client";

import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "./Container";
import { siteDetails } from "@/data/common/siteDetails";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const Header: React.FC = () => {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { text: t("company"), url: "/company" },
    { text: t("services"), url: "/services" },
    { text: t("about"), url: "/about" },
    { text: t("blog"), url: "/blog" },
    { text: t("gallery"), url: "/gallery" },
  ];

  return (
    <header
      className={`
        top-0 left-0 right-0 z-50 w-full transition-all duration-300
        ${isScrolled ? "fixed bg-white shadow-sm" : "absolute bg-transparent"}
      `}
    >
      <Container>
        <nav className="mx-auto flex justify-between items-center py-3 md:py-5">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.webp"
              width={38}
              height={28}
              quality={85}
              priority
              alt={`${siteDetails.siteName} logo`}
              className="flex items-center mb-0.5 gap-2 invert"
            />
            <span className="text-xl font-semibold text-foreground cursor-pointer">
              {siteDetails.siteName}
            </span>
          </Link>

          <ul className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="nav-link text-foreground text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-secondary"
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li><LanguageSwitcher /></li>
            <li>
              <Link
                href="/#cta"
                className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2.5 rounded-full transition-colors text-xs font-semibold uppercase tracking-[0.15em]"
              >
                {t("requestConsultation")}
              </Link>
            </li>
          </ul>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? <HiOutlineXMark className="h-6 w-6" aria-hidden="true" /> : <HiBars3 className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </Container>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-secondary block font-semibold text-sm uppercase tracking-wider"
                  onClick={toggleMenu}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#cta"
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-5 py-2.5 rounded-full block w-fit text-xs uppercase tracking-wider"
                onClick={toggleMenu}
              >
                {t("requestConsultation")}
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
