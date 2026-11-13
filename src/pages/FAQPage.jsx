import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import FAQ from '../components/landing/FAQ';
import { motion } from 'framer-motion';

const FAQPage = () => {
  return (
    <div className="min-h-screen w-full bg-bg-dark text-text-main overflow-x-hidden selection:bg-neon-blue/30 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-40 pb-24 relative">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-gray-500/30 bg-gray-500/5 text-text-muted font-medium text-sm mb-8 tracking-wide uppercase"
          >
            Support
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-text-main"
          >
            Frequently Asked <span className="text-text-muted">Questions.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-muted text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Everything you need to know about NeuroOS, from basic features to advanced capabilities. Can't find the answer you're looking for? Feel free to chat with our AI assistant in the OS.
          </motion.p>
        </div>
        
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
