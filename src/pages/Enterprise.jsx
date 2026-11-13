import React, { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Server, Users, X, CheckCircle2, Building, Mail, User, MessageSquare } from 'lucide-react';
import useOsStore from '../store/osStore';

const Enterprise = () => {
  const theme = useOsStore(state => state.theme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 2000);
  };

  return (
    <div className={`min-h-screen w-full bg-bg-dark text-text-main overflow-x-hidden flex flex-col theme-${theme}`}>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative">
        <div className="absolute top-0 right-0 w-full max-w-2xl h-[500px] bg-neon-purple/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="flex-1">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                  NeuroAgents for <span className="text-neon-purple">Enterprise</span>
                </h1>
                <p className="text-text-muted text-xl mb-8 leading-relaxed max-w-xl">
                  Scale your AI workforce with enterprise-grade security, custom LLM deployments, and priority 24/7 support.
                </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => { setIsModalOpen(true); setFormState('idle'); }}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-neon-purple text-white font-bold transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(157,0,255,0.3)] cursor-pointer text-sm sm:text-base"
                >
                  Contact Sales
                </button>
                <button 
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-glass border border-glass-border font-bold transition-colors hover:bg-panel cursor-pointer text-sm sm:text-base"
                >
                  View Specs
                </button>
              </div>
              </motion.div>
            </div>
            <div className="flex-1 w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="bg-panel border border-glass-border p-8 rounded-3xl shadow-2xl relative"
              >
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-neon-purple/30 to-neon-blue/30 blur-lg -z-10"></div>
                <h3 className="text-2xl font-bold mb-6">Enterprise Capabilities</h3>
                <ul className="space-y-4">
                  {["VPC Deployment Options", "SOC2 Type II Certified", "Custom Base Models (Llama, GPT-4)", "Dedicated Account Manager", "SAML SSO & Role-based Access"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-muted text-lg">
                      <CheckCircle2 className="text-neon-purple w-6 h-6 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-glass border border-glass-border p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-xl bg-neon-blue/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-neon-blue" />
              </div>
              <h4 className="text-xl font-bold mb-3">Bank-Grade Security</h4>
              <p className="text-text-muted">All data is encrypted at rest and in transit. Your AI prompts never leave your private tenant.</p>
            </div>
            <div className="bg-glass border border-glass-border p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-xl bg-neon-purple/10 flex items-center justify-center mb-6">
                <Server className="w-8 h-8 text-neon-purple" />
              </div>
              <h4 className="text-xl font-bold mb-3">On-Premise Ready</h4>
              <p className="text-text-muted">Deploy NeuroOS entirely within your own data centers for complete compliance control.</p>
            </div>
            <div className="bg-glass border border-glass-border p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-xl bg-neon-blue/10 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-neon-blue" />
              </div>
              <h4 className="text-xl font-bold mb-3">Unlimited Seats</h4>
              <p className="text-text-muted">Scale your engineering team without worrying about per-seat licensing costs.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Interactive Sales Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-panel border border-glass-border rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-glass text-text-muted transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {formState === 'idle' || formState === 'loading' ? (
                <>
                  <h3 className="text-3xl font-bold mb-2">Talk to Sales</h3>
                  <p className="text-text-muted mb-8">We'll help you find the right setup for your team.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input required type="text" placeholder="Full Name" className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-purple/50 text-text-main" />
                    </div>
                    
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input required type="email" placeholder="Work Email" className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-purple/50 text-text-main" />
                    </div>
                    
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input required type="text" placeholder="Company Name" className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-purple/50 text-text-main" />
                    </div>
                    
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-text-muted" />
                      <textarea placeholder="How can we help?" rows="3" className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-purple/50 text-text-main resize-none"></textarea>
                    </div>

                    <button 
                      disabled={formState === 'loading'}
                      type="submit" 
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(157,0,255,0.3)] flex justify-center items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formState === 'loading' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : "Submit Request"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-3">Request Received!</h3>
                  <p className="text-text-muted">Our enterprise team will get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="mt-8 px-8 py-3 rounded-xl bg-glass border border-glass-border hover:bg-panel transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Enterprise;
