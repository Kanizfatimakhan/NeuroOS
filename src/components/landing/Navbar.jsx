import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowRight, Play, Sparkles } from 'lucide-react';
import useOsStore from '../../store/osStore';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;
  const { theme, setTheme } = useOsStore();

  const toggleTheme = () => {
    setTheme(theme === 'vision-light' ? 'dark' : 'vision-light');
  };

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Agent Store', path: '/agents' },
    { name: 'Docs', path: '/docs' },
    { name: 'Enterprise', path: '/enterprise' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-panel/85 border-b border-glass-border backdrop-blur-2xl"
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center font-black text-bg-dark shadow-[0_0_20px_rgba(0,122,255,0.4)]">
            N
          </div>
          <span className="text-xl font-black tracking-tight text-text-main">
            Neuro<span className="text-neon-blue">Agents</span>
            <span className="ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-neon-blue/15 text-neon-blue border border-neon-blue/30 uppercase">OS</span>
          </span>
        </Link>

        {/* Middle: Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-text-muted">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`transition-all hover:text-neon-blue ${isActive(link.path) ? 'text-neon-blue font-bold' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-glass text-text-muted hover:text-text-main transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'vision-light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={() => navigate('/os')}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neon-blue text-bg-dark font-extrabold text-sm transition-all duration-300 hover:brightness-110 shadow-[0_0_20px_rgba(0,122,255,0.3)] cursor-pointer hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Workspace</span>
          </button>

          {/* Mobile menu hamburger toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-glass text-text-muted hover:text-text-main lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-glass-border bg-panel px-6 py-6 space-y-4"
          >
            <div className="flex flex-col space-y-3 text-sm font-semibold text-text-main">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-lg hover:bg-glass ${isActive(link.path) ? 'text-neon-blue font-bold bg-glass' : 'text-text-muted'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('/os'); }}
              className="w-full py-3 rounded-xl bg-neon-blue text-bg-dark font-black text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch NeuroOS Workspace</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
