"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Check, X, Sparkles, Languages, Zap, MoveHorizontal } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/marketing/SiteChrome";
import { useUiLocale } from "@/components/marketing/useUiLocale";
import { marketing, uiDir } from "@/lib/i18n/marketing";
import { LOCALE_CATALOGUE, LOCALE_COUNT } from "@/lib/i18n/locales";
import { PLANS, PLAN_ORDER, planName, planTagline } from "@/lib/plans";

/** Enough languages to make the breadth felt without turning the section into a directory. */
const SHOWCASE = LOCALE_CATALOGUE.slice(0, 28);

export default function Home() {
  const [locale, setLocale] = useUiLocale();
  const t = marketing(locale);

  return (
    <div dir={uiDir(locale)} className="min-h-screen bg-white dark:bg-slate-950">
      <SiteNav locale={locale} onLocaleChange={setLocale} />

      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(60rem 30rem at 50% -10%, #f59e0b, transparent), radial-gradient(40rem 24rem at 85% 20%, #6366f1, transparent)",
          }}
        />
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            <Sparkles size={13} className="text-amber-500" />
            {t.hero.eyebrow}
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            {t.hero.title}
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:opacity-90 transition-opacity"
            >
              {t.hero.primaryCta}
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              {t.hero.secondaryCta}
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-400">{t.hero.note}</p>
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-20">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800">
            {[
              { icon: Languages, value: t.proof.languages, label: t.proof.languagesLabel },
              { icon: Zap, value: t.proof.oneCall, label: t.proof.oneCallLabel },
              { icon: MoveHorizontal, value: t.proof.rtl, label: t.proof.rtlLabel },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white dark:bg-slate-950 px-6 py-7 text-center">
                <Icon size={18} className="mx-auto text-amber-500" aria-hidden />
                <dt className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{value}</dt>
                <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* -------------------------------------------------- written not translated */}
      <section id="urun" className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center">
            {t.difference.title}
          </h2>
          <p className="mt-3 text-center text-slate-500 dark:text-slate-400">{t.difference.lead}</p>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-7">
              <div className="flex items-center gap-2 text-slate-400">
                <X size={18} aria-hidden />
                <h3 className="font-semibold">{t.difference.translatedTitle}</h3>
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.difference.translatedBody}
              </p>
            </div>

            <div className="rounded-2xl border-2 border-amber-500/40 bg-white dark:bg-slate-950 p-7">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                <Check size={18} aria-hidden />
                <h3 className="font-semibold">{t.difference.generatedTitle}</h3>
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.difference.generatedBody}
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t.difference.closing}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- how it works */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center">{t.how.title}</h2>
        <p className="mt-3 text-center text-slate-500 dark:text-slate-400">{t.how.lead}</p>

        <ol className="mt-12 grid md:grid-cols-3 gap-6">
          {t.how.steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-7">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------------------- languages */}
      <section id="diller" className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center">
            {t.languages.title}
          </h2>
          <p className="mt-3 text-center text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t.languages.lead}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {SHOWCASE.map((l) => (
              <span
                key={l.code}
                lang={l.code}
                dir={l.dir}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300"
              >
                {l.nativeName}
              </span>
            ))}
            <span className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm text-slate-400">
              +{LOCALE_COUNT - SHOWCASE.length}
            </span>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <p className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 text-sm text-slate-600 dark:text-slate-400">
              {t.languages.rtlNote}
            </p>
            <p className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 text-sm text-slate-600 dark:text-slate-400">
              {t.languages.anyTagNote}
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- blocks */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center">{t.blocks.title}</h2>
        <p className="mt-3 text-center text-slate-500 dark:text-slate-400">{t.blocks.lead}</p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.blocks.items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ pricing teaser */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center">
            {t.pricingTeaser.title}
          </h2>
          <p className="mt-3 text-center text-slate-500 dark:text-slate-400">{t.pricingTeaser.lead}</p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLAN_ORDER.map((id) => {
              const plan = PLANS[id];
              return (
                <div
                  key={id}
                  className={`rounded-2xl border p-6 bg-white dark:bg-slate-950 ${
                    plan.recommended ? "border-amber-500/60 shadow-lg" : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">{planName(plan, locale)}</h3>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {plan.price.monthly}€
                    <span className="text-sm font-normal text-slate-400">{t.pricingPage.perMonth}</span>
                  </p>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {planTagline(plan, locale)}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t.pricingTeaser.compare}
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/fiyatlar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-900 transition-colors"
            >
              {t.pricingTeaser.cta}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- faq */}
      <section id="sss" className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white text-center">{t.faq.title}</h2>
        <div className="mt-10 divide-y divide-slate-200 dark:divide-slate-800">
          {t.faq.items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none font-medium text-slate-900 dark:text-white flex items-center justify-between gap-4">
                {item.q}
                <span className="text-slate-400 transition-transform group-open:rotate-45 shrink-0" aria-hidden>+</span>
              </summary>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- final cta */}
      <section className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{t.finalCta.title}</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">{t.finalCta.body}</p>
          <Link
            href="/builder"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:opacity-90 transition-opacity"
          >
            {t.finalCta.cta}
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </div>
  );
}
