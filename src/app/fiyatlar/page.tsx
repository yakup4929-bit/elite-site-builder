"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/marketing/SiteChrome";
import { useUiLocale } from "@/components/marketing/useUiLocale";
import { marketing } from "@/lib/i18n/marketing";
import {
  PLANS,
  PLAN_ORDER,
  planName,
  planTagline,
  planAudience,
  yearlySavingPercent,
  type Plan,
  type Quota,
} from "@/lib/plans";

type Billing = "monthly" | "yearly";

export default function PricingPage() {
  const [locale, setLocale] = useUiLocale();
  const [billing, setBilling] = useState<Billing>("yearly");
  const t = marketing(locale);
  const p = t.pricingPage;

  const priceOf = (plan: Plan) =>
    billing === "monthly" ? plan.price.monthly : plan.price.yearlyMonthly;

  const quota = (value: Quota) => (value === "all" ? p.unlimited : String(value));

  const yesNo = (value: boolean) =>
    value ? (
      <Check size={16} className="mx-auto text-emerald-600 dark:text-emerald-500" aria-label={p.included} />
    ) : (
      <Minus size={16} className="mx-auto text-slate-300 dark:text-slate-700" aria-label={p.notIncluded} />
    );

  const rows: Array<{ label: string; render: (plan: Plan) => React.ReactNode }> = [
    { label: p.rows.sitesPerMonth, render: (pl) => quota(pl.limits.sitesPerMonth) },
    { label: p.rows.maxLocales, render: (pl) => quota(pl.limits.maxLocales) },
    { label: p.rows.blocks, render: (pl) => quota(pl.limits.maxBlocks) },
    { label: p.rows.themeVariants, render: (pl) => String(pl.limits.themeVariants) },
    { label: p.rows.regenerateBlock, render: (pl) => yesNo(pl.limits.regenerateBlock) },
    { label: p.rows.toneControl, render: (pl) => yesNo(pl.limits.toneControl) },
    {
      label: p.rows.export,
      render: (pl) =>
        pl.limits.export === false
          ? yesNo(false)
          : pl.limits.export === "html"
            ? p.exportKinds.html
            : p.exportKinds.nextjs,
    },
    { label: p.rows.removeBranding, render: (pl) => yesNo(pl.limits.removeBranding) },
    { label: p.rows.customDomain, render: (pl) => yesNo(pl.limits.customDomain) },
    { label: p.rows.whiteLabel, render: (pl) => yesNo(pl.limits.whiteLabel) },
    { label: p.rows.apiAccess, render: (pl) => yesNo(pl.limits.apiAccess) },
    { label: p.rows.support, render: (pl) => p.supportLevels[pl.limits.support] },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SiteNav locale={locale} onLocaleChange={setLocale} />

      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">{p.title}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{p.lead}</p>

        {/* billing toggle */}
        <div
          role="group"
          className="mt-8 inline-flex rounded-xl border border-slate-200 dark:border-slate-800 p-1 bg-slate-50 dark:bg-slate-900"
        >
          {(["monthly", "yearly"] as Billing[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setBilling(mode)}
              aria-pressed={billing === mode}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                billing === mode
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {mode === "monthly" ? p.monthly : p.yearly}
            </button>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- plan cards */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 items-start">
          {PLAN_ORDER.map((id) => {
            const plan = PLANS[id];
            const saving = yearlySavingPercent(plan);
            return (
              <div
                key={id}
                className={`relative rounded-2xl border p-7 bg-white dark:bg-slate-950 ${
                  plan.recommended
                    ? "border-amber-500/60 shadow-xl lg:scale-[1.03]"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {p.recommended}
                  </span>
                )}

                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{planName(plan, locale)}</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{planAudience(plan, locale)}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{priceOf(plan)}€</span>
                  <span className="text-sm text-slate-400">{p.perMonth}</span>
                </div>
                {billing === "yearly" ? (
                  <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-500">
                    {p.savePrefix.replace("{n}", String(saving))} · {p.billedYearly}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-slate-400">&nbsp;</p>
                )}

                <p className="mt-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed min-h-[3.5rem]">
                  {planTagline(plan, locale)}
                </p>

                <Link
                  href="/builder"
                  className={`mt-6 block text-center px-5 py-3 rounded-xl font-semibold transition-opacity ${
                    plan.recommended
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
                      : "border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  {p.choose}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------- comparison table */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">{p.comparisonTitle}</h2>

          {/* Wide table scrolls inside its own container so the page body never does. */}
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <table className="w-full min-w-[42rem] text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th scope="col" className="px-5 py-4 text-left font-semibold text-slate-500 dark:text-slate-400">
                    {p.featureColumn}
                  </th>
                  {PLAN_ORDER.map((id) => (
                    <th
                      key={id}
                      scope="col"
                      className="px-5 py-4 text-center font-semibold text-slate-900 dark:text-white whitespace-nowrap"
                    >
                      {planName(PLANS[id], locale)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="px-5 py-3.5 text-left font-normal text-slate-600 dark:text-slate-400">
                      {row.label}
                    </th>
                    {PLAN_ORDER.map((id) => (
                      <td key={id} className="px-5 py-3.5 text-center text-slate-900 dark:text-white">
                        {row.render(PLANS[id])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- no free tier */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{p.noFreeTitle}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">{p.noFreeBody}</p>
      </section>

      {/* ---------------------------------------------------------------------- faq */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">{t.faq.title}</h2>
        <div className="mt-8 divide-y divide-slate-200 dark:divide-slate-800">
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

      <SiteFooter locale={locale} />
    </div>
  );
}
