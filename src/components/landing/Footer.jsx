import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-glass-border bg-panel py-12 relative z-10 text-text-main">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Logo & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-neon-blue flex items-center justify-center font-bold text-bg-dark text-xs">
              N
            </div>
            <span className="text-lg font-bold tracking-tight text-text-main">Neuro<span className="text-neon-blue">Agents</span></span>
          </Link>
          <div className="hidden md:block w-px h-5 bg-glass-border"></div>
          <div className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} NeuroAgents OS. All rights reserved.
          </div>
        </div>
        
        {/* Middle/Right: Internal Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-text-muted">
          <Link to="/features" className="hover:text-neon-blue transition-colors">Features</Link>
          <Link to="/pricing" className="hover:text-neon-blue transition-colors">Pricing</Link>
          <Link to="/technology" className="hover:text-neon-blue transition-colors">Technology</Link>
          <Link to="/docs" className="hover:text-neon-blue transition-colors">Docs</Link>
          <Link to="/agents" className="hover:text-neon-blue transition-colors">Agent Store</Link>
          <Link to="/faq" className="hover:text-neon-blue transition-colors">FAQ</Link>
          <Link to="/community" className="hover:text-neon-blue transition-colors">Community</Link>
          <Link to="/enterprise" className="hover:text-neon-blue transition-colors">Enterprise</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
