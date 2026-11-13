import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Zap, Terminal, Sparkles, Code2, Bot, Layers, ArrowRight } from 'lucide-react';

const ProductPreview = () => {
  const navigate = useNavigate();

  return (
    <section id="demo" className="py-20 relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Next-Gen Spatial Architecture
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-text-main">
            Not just another chat interface.<br />
            A <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-cyan-400 to-neon-purple">real working OS</span> for developers.
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Multi-agent pipeline orchestration, live code execution sandbox, Monaco VS Code editor, and offline virtual filesystem.
          </p>
        </div>
        
        {/* Interactive Showcase Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-glass-border shadow-[0_0_60px_rgba(0,122,255,0.2)] bg-panel backdrop-blur-2xl p-4 sm:p-6"
        >
          {/* Top Mock Window Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-glass-border mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="text-xs font-mono text-text-muted ml-3">workspace://neuro-agents/live-demo</span>
            </div>

            <button 
              onClick={() => navigate('/os')}
              className="px-4 py-1.5 rounded-xl bg-neon-blue text-bg-dark font-extrabold text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Launch Live Session</span>
            </button>
          </div>

          {/* Three Live Preview Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Multi-Agent Studio */}
            <div className="bg-panel border border-glass-border rounded-2xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-xl bg-neon-purple/15 text-neon-purple flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-text-main mb-1">AI Studio</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Researcher and Coder AI communicate in an autonomous sequence to write production-grade code.
                </p>
              </div>

              <div className="mt-4 p-3 bg-glass border border-glass-border rounded-xl font-mono text-[11px] text-neon-purple flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-purple animate-ping"></span>
                <span>Synthesizing React Component...</span>
              </div>
            </div>

            {/* 2. Monaco PromptLab */}
            <div className="bg-[#1e1e1e] border border-glass-border rounded-2xl p-5 flex flex-col justify-between shadow-sm text-slate-100">
              <div>
                <div className="w-10 h-10 rounded-xl bg-neon-blue/15 text-neon-blue flex items-center justify-center mb-3">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base mb-1">PromptLab Editor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real Monaco engine with syntax highlighting, line numbers, and live file persistence.
                </p>
              </div>

              <pre className="mt-4 p-3 bg-black/50 border border-slate-800 rounded-xl font-mono text-[10px] text-cyan-400 overflow-hidden">
                <code>{`export default function App() {\n  return <NeuroApp />;\n}`}</code>
              </pre>
            </div>

            {/* 3. Live App Runner */}
            <div className="bg-panel border border-cyan-500/30 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-3">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <h4 className="font-bold text-base text-text-main mb-1">Live Sandbox Runner</h4>
                <p className="text-xs text-text-muted leading-relaxed">
                  Instant execution in a sandboxed runtime. Test responsive layouts and export standalone HTML.
                </p>
              </div>

              <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl font-mono text-[11px] text-cyan-400 flex items-center justify-between">
                <span>Status: 60 FPS Online</span>
                <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 font-bold text-[10px]">Ready</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPreview;
