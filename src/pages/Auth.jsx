import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import useOsStore from '../store/osStore';

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, theme } = useOsStore();
  const navigate = useNavigate();

  // Where to redirect after login (default to OS if no specific path was requested)
  const from = location.state?.from?.pathname || '/os';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    const userName = isLogin ? 'Demo User' : (name || 'New User');
    login({ name: userName, email: email || 'user@neuroagents.ai' });
    navigate(from, { replace: true });
  };

  return (
    <div className={`min-h-screen w-full bg-bg-dark text-text-main flex items-center justify-center relative overflow-hidden theme-${theme}`}>
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-neon-purple/20 blur-[150px] rounded-full mix-blend-screen"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-neon-blue/20 blur-[150px] rounded-full mix-blend-screen"></div>

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-3 cursor-pointer z-50">
        <div className="w-10 h-10 rounded-xl bg-neon-blue flex items-center justify-center font-bold text-bg-dark shadow-[0_0_15px_rgba(0,122,255,0.3)]">
          N
        </div>
        <span className="text-xl font-bold tracking-tight">Neuro<span className="text-neon-blue">Agents</span></span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 bg-panel border border-glass-border rounded-3xl shadow-2xl backdrop-blur-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-text-muted">
            {isLogin ? "Enter your credentials to access your workspace." : "Join NeuroAgents to start building with AI."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input 
                  required 
                  type="text" 
                  placeholder="Full Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-blue/50 text-text-main transition-colors" 
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input 
              required 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-blue/50 text-text-main transition-colors" 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input 
              required 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-neon-blue/50 text-text-main transition-colors" 
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-sm text-neon-blue hover:underline">Forgot password?</a>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 rounded-xl bg-neon-blue text-bg-dark font-bold transition-all hover:brightness-110 shadow-[0_0_20px_rgba(0,122,255,0.3)] flex justify-center items-center gap-2 cursor-pointer mt-4"
          >
            {isLogin ? "Sign In" : "Sign Up"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-text-muted">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-neon-blue font-bold hover:underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
