"use client";
import type { SiteConfig } from "@/types";

/**
 * Generated sites survived only until the page reloaded, which made every other
 * feature impossible: editing, cost tracking and revision history all need a
 * site that still exists on the next visit.
 *
 * This is browser storage, deliberately: a real database has to be provisioned
 * in the account before it can be written to, and waiting for that would keep
 * the whole product one refresh away from losing your work. The shape here is
 * the shape a server store would use, so moving to one later is a change of
 * backend rather than a change of model.
 *
 * The limits are real and stated in the UI: sites live in one browser, are not
 * shared between devices, and vanish if site data is cleared.
 */

const KEY = "aeltay.sites";
const MAX_SITES = 60;

export interface SavedSite {
  id: string;
  /** Editable label; defaults to the generated brand name. */
  name: string;
  config: SiteConfig;
  createdAt: number;
  updatedAt: number;
  /** Model spend attributed to this site, in USD, across generation and edits. */
  costUsd: number;
  /** Everything the user typed and the assistant replied while editing. */
  messages: ChatMessage[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  at: number;
}

/**
 * Read through a cached snapshot so React can subscribe to this the way it
 * subscribes to any external store. getSnapshot must return a referentially
 * stable value or the component re-renders forever, so the parsed array is held
 * here and only replaced when something actually writes.
 */
let cache: SavedSite[] | null = null;
const listeners = new Set<() => void>();

function invalidate(): void {
  cache = null;
  listeners.forEach((listener) => listener());
}

export function subscribeToSites(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getSitesSnapshot(): SavedSite[] {
  cache ??= read().sort((a, b) => b.updatedAt - a.updatedAt);
  return cache;
}

const EMPTY: SavedSite[] = [];
/** The server has no browser storage, so it renders the empty state. */
export function getSitesServerSnapshot(): SavedSite[] {
  return EMPTY;
}

function read(): SavedSite[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedSite[]) : [];
  } catch {
    // Unreadable or blocked storage is treated as empty rather than fatal.
    return [];
  }
}

function write(sites: SavedSite[]): void {
  try {
    // Oldest entries fall off first: a quota error would otherwise lose the
    // save the user just made rather than one they had forgotten about.
    const trimmed = [...sites].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, MAX_SITES);
    window.localStorage.setItem(KEY, JSON.stringify(trimmed));
  } catch {
    // Nothing to do — the caller's in-memory copy is still correct for this visit.
  }
  invalidate();
}

export function listSites(): SavedSite[] {
  return read().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function loadSite(id: string): SavedSite | null {
  return read().find((s) => s.id === id) ?? null;
}

export function createSite(config: SiteConfig, costUsd: number): SavedSite {
  const now = Date.now();
  const site: SavedSite = {
    // The model's own id is not unique across generations, so it cannot be the key.
    id: `${now.toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    name: config.name,
    config,
    createdAt: now,
    updatedAt: now,
    costUsd,
    messages: [],
  };
  write([site, ...read()]);
  return site;
}

export function updateSite(
  id: string,
  patch: Partial<Pick<SavedSite, "config" | "name" | "messages">> & { addCostUsd?: number },
): SavedSite | null {
  const sites = read();
  const index = sites.findIndex((s) => s.id === id);
  if (index === -1) return null;

  const current = sites[index]!;
  const next: SavedSite = {
    ...current,
    ...(patch.config ? { config: patch.config } : {}),
    ...(patch.name ? { name: patch.name } : {}),
    ...(patch.messages ? { messages: patch.messages } : {}),
    costUsd: current.costUsd + (patch.addCostUsd ?? 0),
    updatedAt: Date.now(),
  };

  sites[index] = next;
  write(sites);
  return next;
}

export function deleteSite(id: string): void {
  write(read().filter((s) => s.id !== id));
}

/** Total spend across every stored site — what the credit meter reports. */
export function totalCostUsd(): number {
  return read().reduce((sum, s) => sum + s.costUsd, 0);
}

/** Sites created in the current calendar month, for the plan's monthly quota. */
export function sitesThisMonth(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  return read().filter((s) => s.createdAt >= start).length;
}
