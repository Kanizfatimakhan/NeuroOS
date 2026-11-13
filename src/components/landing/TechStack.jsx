import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Database, Code, Zap, Layers, Sparkles } from 'lucide-react';

const technologies = [
  { name: "React 19", role: "Reactive UI Runtime", badge: "Core" },
  { name: "Monaco Editor", role: "VS Code Core Engine", badge: "IDE" },
  { name: "IndexedDB VFS", role: "Offline Browser Disk", badge: "Storage" },
  { name: "Xterm.js", role: "Full Terminal Emulation", badge: "CLI" },
  { name: "Three.js & R3F", role: "3D Spatial Atmosphere", badge: "Graphics" },
  { name: "Zustand State", role: "Reactive Window System", badge: "State" },
  { name: "Tailwind CSS v4", role: "Adaptive Design Tokens", badge: "Styling" },
  { name: "Babel Sandboxing", role: "In-Browser Execution", badge: "Compiler" }
];

const TechStack = () => {
  return (
    <section id="tech" className="relative z-10 py-24 bg-[#060913] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <div className="mb-16">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Engineering Primitives
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Built on <span className="text-gradient">Production-Grade Standards</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Zero bloat. Built with the fastest, battle-tested developer tools on the web.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-400/40 hover:bg-slate-900 transition-all text-left group shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {tech.badge}
                </span>
              </div>
              <h4 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {tech.name}
              </h4>
              <p className="text-xs text-slate-400 leading-snug">
                {tech.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
