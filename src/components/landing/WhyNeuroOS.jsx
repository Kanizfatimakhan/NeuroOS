import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ArrowRight, Zap, Code2, Play, Download, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhyNeuroOS = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#070b16] text-white border-y border-white/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Clear Value Proposition
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Why Use <span className="text-gradient">NeuroOS?</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are a senior software engineer or have never written a line of code — turn ideas into running software in 5 seconds.
          </p>
        </div>

        {/* Comparison: Old Way vs NeuroOS Way */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Traditional Way */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-slate-950/70 border border-red-500/20 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6 text-red-400 font-bold text-sm uppercase tracking-wider">
                <XCircle className="w-5 h-5" />
                <span>Traditional AI Chatbots</span>
              </div>

              <h3 className="text-xl font-bold mb-4 text-white">Raw Text Code In A Chat Box</h3>
              
              <ul className="space-y-3.5 text-sm text-slate-400 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>AI prints hundreds of lines of raw code, but it <strong>doesn't run anywhere</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>You have to configure local Node.js, install packages, and fix version conflicts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>One missing dependency or syntax error leads to hours of tedious debugging.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-mono">
              Outcome: Endless copy-pasting with no guarantee of working software.
            </div>
          </motion.div>

          {/* Card 2: NeuroOS Way */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-[80px] pointer-events-none rounded-full"></div>

            <div>
              <div className="flex items-center gap-2 mb-6 text-cyan-400 font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>NeuroOS (Live Web Computer)</span>
              </div>

              <h3 className="text-xl font-bold mb-4 text-white">Synthesizes Code + Executes Live Interactively</h3>
              
              <ul className="space-y-3.5 text-sm text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <span>Just describe your goal — <strong>OmniAI</strong> writes the code and writes to virtual disk.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <span><strong>Live Sandbox Runner</strong> launches the interactive app in real time — click and test immediately.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <span>Zero local setup — runs entirely within browser-isolated sandboxes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <span>Export with <strong>1-Click HTML Download</strong> to deploy or bundle anywhere.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 font-mono">
              Outcome: Fully working interactive web application in 5 seconds flat.
            </div>
          </motion.div>

        </div>

        {/* 3 Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
            <h4 className="font-bold text-base text-white mb-2">👨‍💻 For Developers</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prototype, test, and validate React components and micro-tools in seconds without spinning up localhost.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
            <h4 className="font-bold text-base text-white mb-2">🎓 For Learners & Students</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The fastest way to master React, Tailwind, and algorithms — inspect live code changes alongside real-time rendering.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
            <h4 className="font-bold text-base text-white mb-2">🚀 For Creators & Founders</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate calculators, lead forms, interactive dashboards, or quiz apps and export production-ready HTML embeds.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyNeuroOS;
