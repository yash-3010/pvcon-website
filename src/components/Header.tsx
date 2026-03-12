"use client";

import React, { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import { FiChevronDown } from "react-icons/fi";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "./Container";
import { siteDetails } from "@/data/common/siteDetails";
import { serviceCategories } from "@/data/services/config";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const Header: React.FC = () => {
  const t = useTranslations("nav");
  const tSvc = useTranslations("services");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  /* Desktop hover dropdown */
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const openDropdown = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setDesktopDropdownOpen(true);
  };
  const closeDropdown = () => {
    hoverTimeout.current = setTimeout(() => setDesktopDropdownOpen(false), 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setMobileServicesOpen(false);
  };

  const plainMenuItems = [
    { text: t("company"), url: "/company" },
    { text: t("about"), url: "/about" },
    { text: t("blog"), url: "/blog" },
    { text: t("gallery"), url: "/gallery" },
  ];

  const serviceLinks = serviceCategories.map((s) => ({
    text: tSvc(`${s.slug}.title`),
    url: `/services/${s.slug}`,
  }));

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

          {/* ── Desktop nav ──────────────────────────────────── */}
          <ul className="hidden md:flex space-x-8 items-center">
            {/* Company link */}
            <li>
              <Link
                href={plainMenuItems[0].url}
                className="nav-link text-foreground text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-secondary"
              >
                {plainMenuItems[0].text}
              </Link>
            </li>

            {/* Services with dropdown */}
            <li
              ref={dropdownRef}
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              <Link
                href="/services"
                className="nav-link text-foreground text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-secondary inline-flex items-center gap-1"
              >
                {t("services")}
                <FiChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${desktopDropdownOpen ? "rotate-180" : ""}`}
                />
              </Link>

              {/* Dropdown panel */}
              <div
                className={`
                  absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200
                  ${desktopDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}
                `}
              >
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[260px]">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.url}
                      href={link.url}
                      className="block px-5 py-2.5 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {link.text}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      href="/services"
                      className="block px-5 py-2.5 text-xs font-semibold text-primary uppercase tracking-wider"
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            {/* Rest of nav links */}
            {plainMenuItems.slice(1).map((item) => (
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

          {/* ── Mobile hamburger ─────────────────────────────── */}
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

      {/* ── Mobile menu ────────────────────────────────────── */}
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
            {/* Company */}
            <li>
              <Link
                href={plainMenuItems[0].url}
                className="text-foreground hover:text-secondary block font-semibold text-sm uppercase tracking-wider"
                onClick={toggleMenu}
              >
                {plainMenuItems[0].text}
              </Link>
            </li>

            {/* Services — expandable */}
            <li>
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="text-foreground hover:text-secondary font-semibold text-sm uppercase tracking-wider flex items-center gap-1 w-full text-left"
              >
                {t("services")}
                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileServicesOpen && (
                <ul className="mt-2 ml-4 space-y-2 border-l-2 border-primary/20 pl-4">
                  {serviceLinks.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        className="text-foreground-accent hover:text-primary block text-sm"
                        onClick={toggleMenu}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/services"
                      className="text-primary font-semibold block text-xs uppercase tracking-wider"
                      onClick={toggleMenu}
                    >
                      View All →
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Rest of nav links */}
            {plainMenuItems.slice(1).map((item) => (
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
