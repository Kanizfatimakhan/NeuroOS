import React from 'react';
import { motion } from 'framer-motion';
import useOsStore from '../store/osStore';
import { Sparkles, Terminal, Globe, FolderOpen, ArrowRight } from 'lucide-react';

const Onboarding = ({ windowData }) => {
  const { user, completeOnboarding, closeWindow } = useOsStore();

  const handleFinish = () => {
    completeOnboarding();
    closeWindow(windowData.id);
  };

  return (
    <div className="h-full w-full bg-bg-dark text-text-main flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="flex-1 overflow-y-auto p-8 relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,122,255,0.3)]"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-lg mb-10"
        >
          <h2 className="text-3xl font-bold mb-3 tracking-tight">Welcome, {user?.name?.split(' ')[0] || 'User'}!</h2>
          <p className="text-text-muted text-lg">
            You are now inside the NeuroAgents Multi-Agent Workspace. Here's a quick guide to get you started.
          </p>
        </motion.div>

        <div className="w-full max-w-2xl space-y-4">
          
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-panel border border-glass-border rounded-xl p-5 flex items-start gap-5 hover:border-neon-blue/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center shrink-0 border border-neon-blue/20">
              <FolderOpen className="w-6 h-6 text-neon-blue" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main mb-1">1. Use the Sidebar</h3>
              <p className="text-sm text-text-muted">
                Look at the left edge of your screen. The sidebar contains your apps, settings, and file explorer. Click any icon to launch a new window.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-panel border border-glass-border rounded-xl p-5 flex items-start gap-5 hover:border-neon-purple/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-neon-purple/10 flex items-center justify-center shrink-0 border border-neon-purple/20">
              <Globe className="w-6 h-6 text-neon-purple" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main mb-1">2. Command Your Agents</h3>
              <p className="text-sm text-text-muted">
                Open the Coder AI or Researcher AI apps to give tasks to your autonomous agents. They will work in the background and report back to you.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-panel border border-glass-border rounded-xl p-5 flex items-start gap-5 hover:border-green-500/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
              <Terminal className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main mb-1">3. Manage the OS</h3>
              <p className="text-sm text-text-muted">
                Drag windows by their top title bar, resize them from the bottom right corner, and organize your workspace exactly how you want it.
              </p>
            </div>
          </motion.div>

        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 mb-8"
        >
          <button 
            onClick={handleFinish}
            className="px-8 py-3.5 rounded-xl bg-neon-blue text-bg-dark font-bold hover:brightness-110 shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
          >
            Start Building
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
