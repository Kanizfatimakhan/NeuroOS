import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import TechStack from '../components/landing/TechStack';
import { motion } from 'framer-motion';

const TechnologyPage = () => {
  return (
    <div className="min-h-screen w-full bg-bg-dark text-text-main overflow-x-hidden selection:bg-neon-blue/30 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-40 pb-24 relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-purple/20 blur-[150px] rounded-full pointer-events-none opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple font-medium text-sm mb-8 tracking-wide uppercase shadow-[0_0_20px_rgba(157,0,255,0.2)]"
          >
            Engineering
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-text-main"
          >
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500">Performance.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-muted text-xl max-w-3xl mx-auto leading-relaxed"
          >
            NeuroOS leverages modern web standards to deliver an uncompromising desktop experience in the browser. 60 FPS animations, reactive state management, and real-time 3D rendering.
          </motion.p>
        </div>
        
        <TechStack />
      </main>
      <Footer />
    </div>
  );
};

export default TechnologyPage;
