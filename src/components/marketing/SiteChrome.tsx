"use client";
import React from "react";
import Link from "next/link";
import { Sparkles, Globe } from "lucide-react";
import { UI_LOCALES, type UiLocale } from "@/lib/i18n/ui";
import { describeLocale } from "@/lib/i18n/locales";
import { marketing } from "@/lib/i18n/marketing";

interface ChromeProps {
  locale: UiLocale;
  onLocaleChange: (next: UiLocale) => void;
}

export const SiteNav: React.FC<ChromeProps> = ({ locale, onLocaleChange }) => {
  const t = marketing(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white shrink-0">
          <Sparkles className="text-amber-500" size={20} />
          Aeltay Studio
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm text-slate-600 dark:text-slate-300">
          <Link href="/#urun" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.product}</Link>
          <Link href="/#diller" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.languages}</Link>
          <Link href="/fiyatlar" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.pricing}</Link>
          <Link href="/demo" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t.nav.demo}</Link>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <Globe size={15} aria-hidden />
            <span className="sr-only">Language</span>
            <select
              value={locale}
              onChange={(e) => onLocaleChange(e.target.value as UiLocale)}
              className="bg-transparent border border-slate-300 dark:border-slate-700 rounded-md px-2 py-1 dark:text-white"
            >
              {UI_LOCALES.map((code) => (
                <option key={code} value={code} className="text-slate-900">
                  {describeLocale(code).nativeName}
                </option>
              ))}
            </select>
          </label>
          <Link
            href="/builder"
            className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t.nav.start}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export const SiteFooter: React.FC<{ locale: UiLocale }> = ({ locale }) => {
  const t = marketing(locale);

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <Sparkles className="text-amber-500" size={20} />
            Aeltay Studio
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xs">{t.footer.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{t.footer.product}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/builder" className="hover:text-slate-900 dark:hover:text-white">{t.nav.start}</Link></li>
            <li><Link href="/fiyatlar" className="hover:text-slate-900 dark:hover:text-white">{t.nav.pricing}</Link></li>
            <li><Link href="/demo" className="hover:text-slate-900 dark:hover:text-white">{t.nav.demo}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{t.footer.legal}</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link href="/#sss" className="hover:text-slate-900 dark:hover:text-white">FAQ</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-5 text-sm text-slate-400">
          © {new Date().getFullYear()} Aeltay Studio. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};
