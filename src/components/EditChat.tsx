"use client";
import React, { useEffect, useRef, useState } from "react";
import { Send, Loader2, MessageSquare, AlertCircle } from "lucide-react";
import type { SiteConfig } from "@/types";
import type { ChatMessage } from "@/lib/storage";
import { t } from "@/lib/i18n/ui";

interface EditChatProps {
  config: SiteConfig;
  messages: ChatMessage[];
  uiLocale: string;
  planId: string;
  /** True when the plan allows editing; the composer is replaced with a note otherwise. */
  enabled: boolean;
  onApplied: (config: SiteConfig, messages: ChatMessage[], costUsd: number) => void;
}

export const EditChat: React.FC<EditChatProps> = ({
  config,
  messages,
  uiLocale,
  planId,
  enabled,
  onApplied,
}) => {
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  // Follows the conversation as it grows, the way a chat is expected to behave.
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, busy]);

  const send = async () => {
    const text = draft.trim();
    if (!text || busy) return;

    setBusy(true);
    setError(null);
    const sent: ChatMessage = { role: "user", text, at: Date.now() };
    setDraft("");

    try {
      const res = await fetch("/api/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config,
          message: text,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          planId,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data?.error === "PLAN_UPGRADE_REQUIRED"
            ? t(uiLocale, "editLocked")
            : (data?.error ?? `HTTP ${res.status}`),
        );
        // The message is kept in the box so the user does not have to retype it.
        setDraft(text);
        return;
      }

      const replied: ChatMessage = { role: "assistant", text: data.reply, at: Date.now() };
      onApplied(data.config, [...messages, sent, replied], data.costUsd ?? 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setDraft(text);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col h-full border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <MessageSquare size={16} className="text-slate-400" aria-hidden />
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          {t(uiLocale, "editTitle")}
        </h2>
      </div>

      <div ref={scroller} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && !busy && (
          <p className="text-sm text-slate-400 leading-relaxed">{t(uiLocale, "editHint")}</p>
        )}

        {messages.map((m, i) => (
          <div
            key={`${m.at}-${i}`}
            className={`text-sm rounded-xl px-3 py-2 max-w-[92%] leading-relaxed ${
              m.role === "user"
                ? "ms-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "me-auto bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            }`}
          >
            {m.text}
          </div>
        ))}

        {busy && (
          <div className="me-auto flex items-center gap-2 text-sm text-slate-400">
            <Loader2 size={14} className="animate-spin" aria-hidden />
            {t(uiLocale, "editWorking")}
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-sm rounded-xl px-3 py-2 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300">
            <AlertCircle size={15} className="shrink-0 mt-0.5" aria-hidden />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        {enabled ? (
          <div className="flex gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                // Enter sends; Shift+Enter writes a new line, as in every chat.
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              rows={2}
              placeholder={t(uiLocale, "editPlaceholder")}
              className="flex-1 resize-none px-3 py-2 text-sm rounded-lg border border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={busy || draft.trim() === ""}
              aria-label={t(uiLocale, "editSend")}
              className="px-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 disabled:opacity-40"
            >
              <Send size={16} className="rtl:rotate-180" aria-hidden />
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">{t(uiLocale, "editLocked")}</p>
        )}
      </div>
    </div>
  );
};
