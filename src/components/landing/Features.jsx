import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, Code2, HardDrive, Terminal, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  return (
    <section id="features" className="relative z-10 py-24 bg-[#060913] text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Engineered For Autonomy
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Architecture of a <span className="text-gradient">Modern AI OS</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every layer of NeuroOS is designed to make multi-agent coding and browser execution seamless.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Large Bento Feature - Multi-Agent Studio */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 p-8 rounded-3xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-500/50 transition-all shadow-xl flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 blur-[100px] pointer-events-none rounded-full"></div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6 border border-purple-500/30">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Autonomous Agent Orchestration</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg mb-6">
                Chain specialized agents into a continuous assembly line. Researcher AI analyzes specifications, while Coder AI automatically drafts, refactors, and saves React code to the virtual filesystem.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-purple-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero-Shot App Generation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Live Gemini BYOK Model</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: App Sandbox Runner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-500/50 transition-all shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 border border-cyan-500/30">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Live App Sandbox Runner</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Instant in-browser compilation with React 18, Babel, and Tailwind CSS. Switch between mobile, tablet, and desktop viewports on the fly.
              </p>
            </div>

            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs font-mono text-cyan-400 flex items-center justify-between">
              <span>Interactive 60 FPS</span>
              <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 font-bold text-[10px]">Active</span>
            </div>
          </motion.div>

          {/* Card 3: Monaco Code Editor */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-slate-900/80 border border-blue-500/20 hover:border-blue-500/50 transition-all shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/30">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Monaco VS Code Engine</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                The identical editor engine powering VS Code. Full syntax highlighting, intelligent indentation, and instant multi-tab switching.
              </p>
            </div>

            <div className="text-xs font-mono text-slate-400">
              JS • JSX • JSON • HTML • CSS
            </div>
          </motion.div>

          {/* Card 4: Persistent VFS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/20 hover:border-emerald-500/50 transition-all shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/30">
                <HardDrive className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">IndexedDB Virtual Disk</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Your code and files are stored reliably in browser storage (IndexedDB). Upload real files from your PC or export your workspace anytime.
              </p>
            </div>

            <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span>Import & Export Enabled</span>
            </div>
          </motion.div>

          {/* Card 5: Terminal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl bg-slate-900/80 border border-green-500/20 hover:border-green-500/50 transition-all shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center mb-6 border border-green-500/30">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">System Command Line</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Xterm.js powered terminal. Run ls, cat, touch, open apps, switch global system themes, and inspect file trees from the console.
              </p>
            </div>

            <div className="text-xs font-mono text-green-400">
              $ help • ls • open • theme
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Features;
