import Link from "next/link";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — Page Not Found | PVCON",
  description:
    "The page you are looking for does not exist. Return to PVCON for pharmacovigilance consulting, GxP auditing, and regulatory compliance services.",
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased flex flex-col min-h-screen bg-white text-[#0d1b2a]`}
      >
        {/* Minimal header */}
        <header className="px-6 py-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#202f63]">PVCON</span>
          </Link>
        </header>

        {/* 404 content */}
        <main className="flex-1 flex items-center justify-center px-5">
          <section className="relative">
            {/* Background dots */}
            <div
              className="absolute inset-0 opacity-80 -z-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 25%, #92b353 1px, transparent 1px), radial-gradient(circle at 75% 75%, #202f63 1px, transparent 1px)",
                backgroundSize: "120px 120px",
              }}
              aria-hidden="true"
            />

            <div className="text-center max-w-2xl mx-auto py-20">
              {/* Large 404 */}
              <h1 className="text-[8rem] md:text-[18rem] font-extrabold leading-none tracking-tighter text-[#202f63]/10 select-none">
                404
              </h1>

              {/* Message */}
              <div className="-mt-10 md:-mt-16">
                <h2 className="text-2xl md:text-3xl font-bold text-[#202f63] mb-4">
                  Page Not Found
                </h2>
                <p className="text-[#64748b] mb-8 leading-relaxed">
                  The page you are looking for might have been removed, had its
                  name changed, or is temporarily unavailable.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/"
                    className="inline-flex bg-[#202f63] hover:bg-[#202f63]/90 text-white font-semibold px-7 py-3 rounded-full transition-colors text-xs uppercase tracking-[0.15em]"
                  >
                    Back to Home
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex border border-[#202f63]/20 hover:border-[#202f63]/40 text-[#202f63] font-semibold px-7 py-3 rounded-full transition-colors text-xs uppercase tracking-[0.15em]"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Minimal footer */}
        <footer className="px-6 py-5 border-t border-gray-100 text-center text-sm text-[#64748b]">
          <p>
            &copy; {new Date().getFullYear()} PVCON. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
