import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, ArrowRight, CheckCircle2, Code2, Laptop, Zap } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-bg-dark text-text-main transition-colors duration-300">
      {/* Background Radial Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-pink-500/10 blur-[150px] pointer-events-none rounded-full"></div>
      
      {/* Grid Pattern Underlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        
        {/* Simple Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 inline-flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-400 tracking-wide uppercase">
            In-Browser AI App Generator & Workspace
          </span>
        </motion.div>

        {/* Clear, Catchy Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-6 text-white"
        >
          Type your idea. <br />
          <span className="text-gradient">Watch it run live in 5 seconds.</span>
        </motion.h1>
        
        {/* Simple Explanation */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed"
        >
          NeuroOS is an <span className="text-white font-semibold">autonomous in-browser AI operating system</span>. No complex local environment setup required. Prompt what you need, and it <span className="text-white font-semibold">synthesizes code, mounts to virtual disk, and executes live interactive apps</span> instantly.
        </motion.p>

        {/* Big Action CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
        >
          <button 
            onClick={() => navigate('/os')}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-black text-base shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Free In Browser</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a 
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-white/30 text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:bg-slate-800"
          >
            <span>See How It Works</span>
          </a>
        </motion.div>

        {/* 3 Core Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Installation Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Real Live App Sandbox (Runs Code)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>One-Click HTML/Code Download</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
