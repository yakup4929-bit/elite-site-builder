
"use client";
import React from "react";
import { motion } from "framer-motion";
import { SiteBlock } from "@/types";

interface AboutProps {
  block: SiteBlock;
  config: {
    primaryColor: string;
  };
}

export const About: React.FC<AboutProps> = ({ block, config }) => {
  const { title, description, image } = block.content;

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div 
              className="absolute -top-4 -left-4 w-full h-full border-2 rounded-3xl" 
              style={{ borderColor: config.primaryColor }}
            />
            <img 
              src={image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"} 
              alt="About Us" 
              className="relative z-10 rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {description}
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { label: "Experience", value: "15+ Years" },
                { label: "Projects", value: "500+ Completed" }
              ].map((stat, i) => (
                <div key={i} className="border-l-4 pl-4" style={{ borderColor: config.primaryColor }}>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

