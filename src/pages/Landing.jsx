import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import WhyNeuroOS from '../components/landing/WhyNeuroOS';
import ProductPreview from '../components/landing/ProductPreview';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import TechStack from '../components/landing/TechStack';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-bg-dark text-text-main overflow-x-hidden flex flex-col font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyNeuroOS />
        <ProductPreview />
        <HowItWorks />
        <Features />
        <TechStack />
        <Pricing />
        <FAQ />
        
        {/* Silicon Valley Final Conversion Banner */}
        <section className="py-28 relative z-10 border-t border-glass-border bg-panel overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 to-purple-600/15 blur-[120px] pointer-events-none rounded-full"></div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Cloud Launch • Zero Install Required</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
              Ready to build apps with <br />
              <span className="text-gradient">OmniAI in your browser?</span>
            </h2>

            <p className="text-slate-400 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Step into the next generation of in-browser software engineering. Test in the live sandbox, architect with AI, and download your apps today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/os')} 
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 font-black text-base hover:brightness-110 active:scale-95 transition-all shadow-[0_0_35px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch NeuroOS Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
