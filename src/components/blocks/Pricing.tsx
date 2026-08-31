
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ResolvedBlock } from "@/types";
import { Check } from "lucide-react";

interface PricingProps {
  block: ResolvedBlock;
  config: {
    primaryColor: string;
  };
}

export const Pricing: React.FC<PricingProps> = ({ block, config }) => {
  const { title, items } = block.content;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{title}</h2>
          <div className="h-1 w-20 bg-slate-900 dark:bg-white mx-auto rounded-full" style={{ backgroundColor: config.primaryColor }} />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items?.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-3xl border transition-all ${
                index === 1 
                ? "bg-white dark:bg-slate-800 border-transparent shadow-2xl scale-105 relative" 
                : "bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
              }`}
            >
              {index === 1 && (
                <span 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-center mb-4 text-slate-900 dark:text-white">{plan.title}</h3>
              <div className="text-center mb-8">
                <span className="text-5xl font-extrabold text-slate-900 dark:text-white">${plan.description}</span>
                <span className="text-slate-500 dark:text-slate-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["Unlimited Projects", "AI Integration", "Priority Support", "Custom Domain"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Check size={18} style={{ color: config.primaryColor }} />
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  index === 1 
                  ? "text-white" 
                  : "border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                style={index === 1 ? { backgroundColor: config.primaryColor } : {}}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

