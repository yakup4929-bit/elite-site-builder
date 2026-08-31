
"use client";
import React from "react";
import { ResolvedBlock } from "@/types";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactProps {
  block: ResolvedBlock;
  config: {
    primaryColor: string;
  };
}

export const Contact: React.FC<ContactProps> = ({ block, config }) => {
  const { title, description } = block.content;

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative">
          <div 
            className="absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-20 rounded-full"
            style={{ backgroundColor: config.primaryColor }}
          />
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl font-bold mb-6">{title}</h2>
              <p className="text-slate-400 text-xl mb-12 leading-relaxed">
                {description}
              </p>
              <div className="space-y-6">
                {[
                  { icon: <Mail />, label: "Email", value: "contact@elite.com" },
                  { icon: <Phone />, label: "Phone", value: "+1 (555) 000-0000" },
                  { icon: <MapPin />, label: "Office", value: "New York, NY 10001" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-slate-900"
                      style={{ backgroundColor: `${config.primaryColor}30`, color: config.primaryColor }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">{item.label}</div>
                      <div className="text-lg font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2" style={{ "--tw-ring-color": config.primaryColor } as React.CSSProperties} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2" style={{ "--tw-ring-color": config.primaryColor } as React.CSSProperties} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2" style={{ "--tw-ring-color": config.primaryColor } as React.CSSProperties} />
                </div>
                <button 
                  className="w-full py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

