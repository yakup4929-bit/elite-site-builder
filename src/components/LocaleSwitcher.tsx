"use client";
import React from "react";
import { Globe } from "lucide-react";
import { describeLocale } from "@/lib/i18n/locales";

interface LocaleSwitcherProps {
  locales: string[];
  active: string;
  onChange: (locale: string) => void;
  /** Used to tint the active pill so the switcher matches the generated site. */
  accentColor?: string;
}

/**
 * Shown only when a site carries more than one language — a switcher with a
 * single option is noise.
 */
export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({ locales, active, onChange, accentColor }) => {
  if (locales.length < 2) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Globe size={16} className="text-slate-400 shrink-0" aria-hidden />
      <div className="flex gap-1 flex-wrap">
        {locales.map((tag) => {
          const info = describeLocale(tag);
          const isActive = tag === active;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onChange(tag)}
              lang={tag}
              aria-current={isActive ? "true" : undefined}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "text-white font-medium"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
              style={isActive ? { backgroundColor: accentColor ?? "#0f172a" } : undefined}
            >
              {info.nativeName}
            </button>
          );
        })}
      </div>
    </div>
  );
};
