"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const COOKIE_CONSENT_KEY = "pvcon_cookie_consent";

const CookieConsent: React.FC = () => {
  const t = useTranslations("legal.consentBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX — don't flash immediately on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "all");
    setVisible(false);
    // Enable analytics if GA is loaded
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "essential");
    setVisible(false);
    // Disable analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Cookie icon + message */}
        <div className="flex items-start gap-3 flex-1">
          <svg
            className="w-6 h-6 text-primary shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <p className="text-sm text-foreground-accent leading-relaxed">
            {t("message")}{" "}
            <Link
              href="/cookie-policy"
              className="text-primary hover:text-primary-accent underline underline-offset-2 font-medium"
            >
              {t("learnMore")}
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 md:flex-none px-5 py-2.5 text-xs font-semibold uppercase tracking-wider border border-gray-200 hover:border-gray-300 text-foreground-accent hover:text-foreground rounded-full transition-colors"
          >
            {t("decline")}
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-secondary hover:bg-secondary/90 text-white rounded-full transition-colors"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
