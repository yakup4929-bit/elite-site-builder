
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ResolvedBlock } from "@/types";

interface HeroProps {
  block: ResolvedBlock;
  config: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ block, config }) => {
  const { title, subtitle, description, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink } = block.content;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span 
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full"
            style={{ backgroundColor: `${config.primaryColor}20`, color: config.primaryColor }}
          >
            {subtitle}
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            {title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={ctaLink || "#"} 
              className="px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: config.primaryColor }}
            >
              {ctaText}
            </a>
            {secondaryCtaText && (
              <a
                href={secondaryCtaLink || "#more"}
                className="px-8 py-4 rounded-full font-semibold border transition-all hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {secondaryCtaText}
              </a>
            )}
          </div>
        </motion.div>
      </div>
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{ backgroundColor: config.primaryColor }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{ backgroundColor: config.secondaryColor }}
        />
      </div>
    </section>
  );
};

