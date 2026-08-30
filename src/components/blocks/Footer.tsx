
"use client";
import React from "react";
import { SiteBlock } from "@/types";

interface FooterProps {
  block: SiteBlock;
  config: {
    primaryColor: string;
  };
}

export const Footer: React.FC<FooterProps> = ({ block, config }) => {
  const { title } = block.content;

  return (
    <footer className="py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {title} <span style={{ color: config.primaryColor }}>.</span>
          </div>
          <div className="flex gap-8 text-slate-600 dark:text-slate-400 text-sm">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookies</a>
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

