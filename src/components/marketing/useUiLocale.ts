"use client";
import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_UI_LOCALE, isUiLocale, type UiLocale } from "@/lib/i18n/ui";

const STORAGE_KEY = "aeltay.uiLocale";

/**
 * localStorage is an external store, so it is read through useSyncExternalStore
 * rather than copied into state inside an effect. That avoids the cascading
 * render the effect version causes, and gives a correct server snapshot so the
 * server-rendered markup and the first client render agree.
 *
 * Every storage access is guarded: a private window, cleared site data, or a
 * browser configured to block site data makes the accessor itself throw, and a
 * language switcher is not worth breaking the page over.
 */

// getSnapshot must return a referentially stable value or React re-renders
// forever, so the parsed value is cached and only recomputed when it changes.
let cached: UiLocale = DEFAULT_UI_LOCALE;

function readStore(): UiLocale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next = stored && isUiLocale(stored) ? stored : DEFAULT_UI_LOCALE;
    if (next !== cached) cached = next;
  } catch {
    // Leave the last known value in place.
  }
  return cached;
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  // Keeps other tabs in step; `storage` does not fire in the tab that wrote.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getServerSnapshot(): UiLocale {
  return DEFAULT_UI_LOCALE;
}

export function useUiLocale(): [UiLocale, (next: UiLocale) => void] {
  const locale = useSyncExternalStore(subscribe, readStore, getServerSnapshot);

  const update = useCallback((next: UiLocale) => {
    cached = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference will not survive the visit; the page still works.
    }
    listeners.forEach((listener) => listener());
  }, []);

  return [locale, update];
}
