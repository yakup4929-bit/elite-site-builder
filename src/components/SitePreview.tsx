"use client";
import React, { useState } from "react";
import { SiteConfig, resolveBlock } from "@/types";
import { BlockRenderer } from "./BlockRenderer";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { localeDir } from "@/lib/i18n/locales";

/**
 * Owns the active language for a generated site: resolves each block's copy and
 * sets the text direction, so an RTL language lays out correctly without every
 * block component knowing about scripts.
 */
export const SitePreview: React.FC<{ config: SiteConfig }> = ({ config }) => {
  const [locale, setLocale] = useState(config.defaultLocale);

  // Derived rather than synced through an effect: a freshly generated site may
  // not carry the previously selected language, and falling back here means the
  // selection survives if a later site does carry it again.
  const active = config.locales.includes(locale) ? locale : config.defaultLocale;
  const dir = localeDir(active);

  return (
    <div dir={dir} lang={active}>
      {config.locales.length > 1 && (
        <div className="flex justify-end px-6 py-3 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <LocaleSwitcher
            locales={config.locales}
            active={active}
            onChange={setLocale}
            accentColor={config.primaryColor}
          />
        </div>
      )}
      {config.blocks.map((block) => (
        <BlockRenderer
          key={block.id}
          block={resolveBlock(block, active, config.defaultLocale)}
          config={config}
        />
      ))}
    </div>
  );
};
