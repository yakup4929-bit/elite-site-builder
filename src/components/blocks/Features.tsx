
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ResolvedBlock } from "@/types";
import { CheckCircle2 } from "lucide-react";

interface FeaturesProps {
  block: ResolvedBlock;
  config: {
    primaryColor: string;
  };
}

export const Features: React.FC<FeaturesProps> = ({ block, config }) => {
  const { title, items } = block.content;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            {title}
          </motion.h2>
          <div className="h-1 w-20 bg-slate-900 dark:bg-white mx-auto rounded-full" style={{ backgroundColor: config.primaryColor }} />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items?.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors"
                style={{ backgroundColor: `${config.primaryColor}20`, color: config.primaryColor }}
              >
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

