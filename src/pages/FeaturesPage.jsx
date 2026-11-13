import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import Features from '../components/landing/Features';
import { motion } from 'framer-motion';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen w-full bg-bg-dark text-text-main overflow-x-hidden selection:bg-neon-blue/30 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-40 pb-24 relative">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue font-medium text-sm mb-8 tracking-wide uppercase shadow-[0_0_20px_rgba(0,243,255,0.2)]"
          >
            Core Capabilities
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-text-main"
          >
            Intelligent Tools, <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Limitless Potential.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-muted text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Experience a full desktop environment directly in your browser. NeuroOS features an advanced window manager, an AI assistant, and a full suite of developer tools designed for maximum productivity.
          </motion.p>
        </div>
        
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
