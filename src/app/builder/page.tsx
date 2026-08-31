
"use client";
import React, { useState } from "react";
import { SiteConfig } from "@/types";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Loader2, Sparkles } from "lucide-react";

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [industry, setIndustry] = useState("");
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt, industry }),
      });
      const data = await res.json();
      setConfig(data);
    } catch (err) {
      alert("Bir hata olustu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Control Panel */}
      <div className="fixed top-0 left-0 w-full h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-white">
          <Sparkles className="text-yellow-500" /> Aeltay Studio
        </div>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Sektör (Örn: Lüks Saat)" 
            className="px-4 py-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Nasil bir site istersiniz?" 
            className="px-4 py-2 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white w-80"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-lg font-medium hover:opacity-90 flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Sihri Baslat"}
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pt-20 min-h-screen">
        {config ? (
          <div className="shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-950">
            {config.blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} config={config} />
            ))}
          </div>
        ) : (
          <div className="h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-slate-400">
            <Sparkles size={48} className="mb-4 opacity-20" />
            <p className="text-xl">Hayalinizdeki siteyi olusturmak için yukariya direktiflerinizi yazin.</p>
          </div>
        )}
      </div>
    </div>
  );
}

