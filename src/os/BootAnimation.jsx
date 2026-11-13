import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useOsStore from '../store/osStore';
import { Cpu, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

const bootLogs = [
  "Mounting VFS IndexedDB Core...",
  "Initializing Monaco Editor Engine...",
  "Calibrating Coder & Researcher AI Agents...",
  "Spinning Sandboxed Execution Runtime...",
  "NeuroOS v2.2 Ready."
];

const BootAnimation = () => {
  const setBooted = useOsStore(state => state.setBooted);
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev < bootLogs.length - 1 ? prev + 1 : prev));
    }, 280);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 15;
      });
    }, 180);

    const finishTimeout = setTimeout(() => {
      setBooted(true);
    }, 1600);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
      clearTimeout(finishTimeout);
    };
  }, [setBooted]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#050811] text-white select-none px-6"
    >
      {/* Background Ambience */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent blur-[140px] pointer-events-none"></div>

      {/* Center Hologram Logo */}
      <div className="relative mb-8 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="w-24 h-24 rounded-3xl border border-cyan-500/30 border-t-cyan-400 border-r-purple-500 shadow-[0_0_40px_rgba(0,240,255,0.25)] flex items-center justify-center"
        />
        <div className="absolute w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg font-black text-slate-950 text-xl tracking-tighter">
          NA
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden mb-5">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.5)]"
          initial={{ width: '10%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: "linear" }}
        />
      </div>

      {/* Streaming Terminal Boot Text */}
      <div className="h-6 flex items-center justify-center mb-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={logIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 text-xs font-mono text-cyan-400/90"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{bootLogs[logIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Instant Skip Button */}
      <button 
        onClick={() => setBooted(true)}
        className="px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400/50 text-xs text-slate-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
      >
        <span>Skip To Desktop</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};

export default BootAnimation;
