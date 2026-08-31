"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { SiteConfig } from "@/types";
import { SitePreview } from "@/components/SitePreview";
import { Loader2, Sparkles, X, Plus, AlertCircle } from "lucide-react";
import { LOCALE_CATALOGUE, combinedReach, describeLocale, isValidLocaleTag } from "@/lib/i18n/locales";
import {
  DENSITIES,
  DEFAULT_DENSITY,
  DEFAULT_TONE,
  TONES,
  choiceHint,
  choiceLabel,
} from "@/lib/options";
import { DEFAULT_UI_LOCALE, UI_LOCALES, t, type UiLocale } from "@/lib/i18n/ui";
import { PLANS, PLAN_ORDER, DEFAULT_PLAN, planName, planTagline, type PlanId } from "@/lib/plans";

export default function BuilderPage() {
  const [uiLocale, setUiLocale] = useState<UiLocale>(DEFAULT_UI_LOCALE);
  const [planId, setPlanId] = useState<PlanId>(DEFAULT_PLAN);
  const [prompt, setPrompt] = useState("");
  const [industry, setIndustry] = useState("");
  const [siteLocales, setSiteLocales] = useState<string[]>(["tr"]);
  const [tone, setTone] = useState(DEFAULT_TONE);
  const [density, setDensity] = useState(DEFAULT_DENSITY);
  const [localeDraft, setLocaleDraft] = useState("");
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [rejected, setRejected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const plan = PLANS[planId];
  const maxLocales = plan.limits.maxLocales;
  const canChooseLocales = plan.limits.choosableLocales;
  const localeSlotsLeft = maxLocales === "all" ? Infinity : maxLocales - siteLocales.length;

  // The first entry is the primary language; the rest follow it.
  const effectiveLocales = useMemo(
    () => (canChooseLocales ? siteLocales : plan.limits.fixedLocales),
    [canChooseLocales, siteLocales, plan],
  );

  // Speaker totals are indicative, so the figure is prefixed with "~" wherever shown.
  const reach = useMemo(() => combinedReach(effectiveLocales), [effectiveLocales]);

  const addLocale = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || !isValidLocaleTag(trimmed)) return;
    if (siteLocales.some((l) => l.toLowerCase() === trimmed.toLowerCase())) return;
    if (localeSlotsLeft <= 0) return;
    setSiteLocales((prev) => [...prev, trimmed]);
    setLocaleDraft("");
  };

  const removeLocale = (tag: string) => {
    // Keep at least one language — a site with none cannot be generated.
    setSiteLocales((prev) => (prev.length > 1 ? prev.filter((l) => l !== tag) : prev));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setRejected([]);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          industry,
          locales: effectiveLocales,
          defaultLocale: effectiveLocales[0],
          planId,
          tone,
          density,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? `HTTP ${res.status}`);
        return;
      }
      setConfig(data.config);
      setRejected(data.rejectedLocales ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="fixed top-0 left-0 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-white shrink-0 hover:opacity-80 transition-opacity"
            title={t(uiLocale, "backToSite")}
          >
            <Sparkles className="text-yellow-500" /> {t(uiLocale, "brand")}
          </Link>

          <div className="flex gap-3 items-center flex-wrap flex-1 justify-end">
            <input
              type="text"
              placeholder={t(uiLocale, "industryPlaceholder")}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
            <input
              type="text"
              placeholder={t(uiLocale, "promptPlaceholder")}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white w-80"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || prompt.trim() === ""}
              className="px-6 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-lg font-medium hover:opacity-90 flex items-center gap-2 disabled:opacity-40"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : null}
              {loading ? t(uiLocale, "generating") : t(uiLocale, "generate")}
            </button>
          </div>
        </div>

        <div className="px-6 pb-3 flex items-start gap-6 flex-wrap text-sm">
          <label className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">{t(uiLocale, "plan")}</span>
            <select
              value={planId}
              onChange={(e) => setPlanId(e.target.value as PlanId)}
              className="px-2 py-1 rounded-md border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            >
              {PLAN_ORDER.map((id) => (
                <option key={id} value={id}>
                  {planName(PLANS[id], uiLocale)} · {PLANS[id].price.monthly}
                  {PLANS[id].price.currency === "EUR" ? "€" : " " + PLANS[id].price.currency}
                </option>
              ))}
            </select>
            <span className="text-slate-400 hidden lg:inline">{planTagline(plan, uiLocale)}</span>
          </label>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500 dark:text-slate-400">{t(uiLocale, "languages")}</span>
            {effectiveLocales.map((tag, index) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 dark:text-white"
              >
                {describeLocale(tag).nativeName}
                {index === 0 && (
                  <span className="text-xs text-slate-400">({t(uiLocale, "primaryLanguage")})</span>
                )}
                {canChooseLocales && effectiveLocales.length > 1 && (
                  <button type="button" onClick={() => removeLocale(tag)} aria-label={"remove " + tag}>
                    <X size={12} className="text-slate-400 hover:text-slate-900 dark:hover:text-white" />
                  </button>
                )}
              </span>
            ))}

            {canChooseLocales ? (
              localeSlotsLeft > 0 && (
                <span className="inline-flex items-center gap-1">
                  <input
                    list="locale-catalogue"
                    value={localeDraft}
                    onChange={(e) => setLocaleDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addLocale(localeDraft);
                      }
                    }}
                    placeholder={t(uiLocale, "addLanguage")}
                    className="px-2 py-1 w-40 rounded-md border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => addLocale(localeDraft)}
                    className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label={t(uiLocale, "addLanguage")}
                  >
                    <Plus size={14} className="text-slate-500" />
                  </button>
                  <datalist id="locale-catalogue">
                    {LOCALE_CATALOGUE.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.nativeName}{" — "}{l.englishName}
                      </option>
                    ))}
                  </datalist>
                </span>
              )
            ) : (
              <span className="text-slate-400 italic">{t(uiLocale, "planLocked")}</span>
            )}
          </div>

          {/* Tone is a paid control; on plans without it the reason is shown rather
              than a dead dropdown the user cannot explain. */}
          <label className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">{t(uiLocale, "tone")}</span>
            {plan.limits.toneControl ? (
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                title={choiceHint(TONES.find((x) => x.id === tone)!, uiLocale)}
                className="px-2 py-1 rounded-md border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              >
                {TONES.map((choice) => (
                  <option key={choice.id} value={choice.id}>
                    {choiceLabel(choice, uiLocale)}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-slate-400 italic">{t(uiLocale, "toneLocked")}</span>
            )}
          </label>

          <label className="flex items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400">{t(uiLocale, "density")}</span>
            <select
              value={density}
              onChange={(e) => setDensity(e.target.value)}
              className="px-2 py-1 rounded-md border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            >
              {DENSITIES.map((choice) => (
                <option key={choice.id} value={choice.id}>
                  {choiceLabel(choice, uiLocale)}
                </option>
              ))}
            </select>
          </label>

          {reach > 0 && (
            <span className="text-slate-400">
              {t(uiLocale, "reach")}: ~{reach} {t(uiLocale, "reachUnit")}
            </span>
          )}

          <label className="flex items-center gap-2 ml-auto">
            <span className="text-slate-500 dark:text-slate-400">{t(uiLocale, "interfaceLanguage")}</span>
            <select
              value={uiLocale}
              onChange={(e) => setUiLocale(e.target.value as UiLocale)}
              className="px-2 py-1 rounded-md border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            >
              {UI_LOCALES.map((code) => (
                <option key={code} value={code}>
                  {describeLocale(code).nativeName}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="pt-36 min-h-screen">
        {error && (
          <div className="mx-6 mb-4 flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <strong>{t(uiLocale, "errorPrefix")}:</strong> {error}
            </div>
          </div>
        )}

        {rejected.length > 0 && (
          <div className="mx-6 mb-4 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
            {t(uiLocale, "localesDropped")}{" "}
            {rejected.map((tag) => describeLocale(tag).nativeName).join(", ")}
          </div>
        )}

        {config ? (
          <div className="shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-950">
            <SitePreview config={config} />
          </div>
        ) : (
          !error && (
            <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-slate-400">
              <Sparkles size={48} className="mb-4 opacity-20" />
              <p className="text-xl text-center px-6">{t(uiLocale, "emptyState")}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
