import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Can I run and interact with generated code directly inside the browser?",
    answer: "Yes! NeuroOS includes a built-in Live Sandbox App Runner powered by React 18, Babel, and Tailwind CSS. When Coder AI or the AI Studio generates an app, you can click, test responsive views (Desktop/Tablet/Mobile), view console logs, and export standalone HTML."
  },
  {
    question: "Do I need to pay or provide an API key to test the agents?",
    answer: "No. NeuroOS operates with high-quality simulated mock intelligence out-of-the-box. If you want unrestricted, live AI reasoning, you can bring your own free Google Gemini API key (BYOK) in the Settings app. Your key stays 100% locally in your browser."
  },
  {
    question: "Where are my workspace files stored?",
    answer: "NeuroOS uses an IndexedDB Virtual Filesystem (VFS) directly inside your browser. Your files persist across page refreshes and browser restarts without sending your proprietary code to any external backend."
  },
  {
    question: "Can I import existing code or export my projects?",
    answer: "Absolutely. The File Explorer allows you to upload real .js, .json, and text files from your PC into the OS. You can also download single files or export your entire workspace bundle in one click."
  },
  {
    question: "How do the multi-agent pipelines work?",
    answer: "In the AI Studio, you provide a single goal. Researcher AI formulates the technical specifications and UX schema, then hands the task over to Coder AI. Coder AI writes the component code, saves it to index.js, and automatically triggers the live sandbox preview."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faq" className="relative z-10 py-24 bg-[#060913] text-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Frequently Asked
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Common <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know about the NeuroOS environment.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-900 border-cyan-500/40 shadow-xl' 
                    : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center focus:outline-none cursor-pointer gap-4"
                >
                  <span className="font-bold text-base md:text-lg text-white">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen ? 'bg-cyan-500/20 text-cyan-400 rotate-180' : 'bg-white/5 text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-6 text-slate-300 text-sm leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
