import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: "Developer Free",
    price: "$0",
    period: "forever",
    description: "Full in-browser operating system with BYOK AI keys.",
    features: [
      "AI Studio & Autonomous Pipeline",
      "Live App Sandbox Runner",
      "Monaco VS Code Editor Engine",
      "IndexedDB Virtual Filesystem",
      "Local Code Import & Export",
      "Unlimited Gemini Free-Tier BYOK"
    ],
    buttonText: "Launch Free Workspace",
    popular: false,
    color: "border-white/10"
  },
  {
    name: "Autonomous Pro",
    price: "$19",
    period: "/month",
    description: "Hosted models, priority inference speed, and cloud snapshots.",
    features: [
      "Everything in Free",
      "Pre-Configured High-Speed LLMs",
      "Infinite Virtual Storage Cloud Sync",
      "Collaborative Shared Canvas",
      "Custom Theme Authoring Studio",
      "Priority Developer Discord Access"
    ],
    buttonText: "Start 14-Day Pro Trial",
    popular: true,
    color: "border-cyan-500/50 shadow-[0_0_35px_rgba(0,240,255,0.2)]"
  },
  {
    name: "Enterprise Fleet",
    price: "Custom",
    period: "annual",
    description: "Self-hosted VPC, dedicated agents, and SOC2 compliance.",
    features: [
      "Everything in Pro",
      "On-Premises Docker / VPC Deployment",
      "Fine-Tuned Internal Models (Llama 3)",
      "SAML SSO & Role-Based Access",
      "Dedicated Solutions Architect",
      "99.99% Guaranteed SLA"
    ],
    buttonText: "Talk to Enterprise Team",
    popular: false,
    color: "border-purple-500/30"
  }
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="relative z-10 py-24 bg-[#060913] text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Transparent Plans
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Simple, Developer-First <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Free forever for local development. Upgrade when you need hosted intelligence or enterprise VPCs.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-3xl bg-slate-900/80 border ${plan.color} flex flex-col justify-between shadow-2xl relative group`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-mono">{plan.period}</span>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {plan.description}
                </p>

                <div className="h-px w-full bg-white/10 mb-6"></div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => plan.name.includes('Enterprise') ? navigate('/enterprise') : navigate('/os')}
                className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 hover:brightness-110 shadow-[0_0_25px_rgba(0,240,255,0.3)]'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
                }`}
              >
                <span>{plan.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
