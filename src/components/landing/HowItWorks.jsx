import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, Code2, Play, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: "01",
    icon: Sparkles,
    color: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
    title: "Define Your Goal",
    description: "Type an app vision or feature in AI Studio (e.g. 'Build an interactive Pomodoro timer')."
  },
  {
    step: "02",
    icon: Bot,
    color: "text-purple-400 bg-purple-500/15 border-purple-500/30",
    title: "Researcher AI Architects",
    description: "Extracts technical specs, state requirements, and layout parameters autonomously."
  },
  {
    step: "03",
    icon: Code2,
    color: "text-blue-400 bg-blue-500/15 border-blue-500/30",
    title: "Coder AI Synthesizes",
    description: "Generates complete, self-contained React code and commits it directly to the virtual disk."
  },
  {
    step: "04",
    icon: Play,
    color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
    title: "Run Live in Sandbox",
    description: "Interact with the generated app live, test responsiveness, and export standalone HTML."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#060913] text-white">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Workflow Mechanics
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            From Natural Language to <span className="text-gradient">Live Running Code</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            How the autonomous agents cooperate to deliver working software.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between shadow-xl relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-cyan-400 transition-colors font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
