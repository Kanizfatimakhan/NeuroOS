import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, Code2, Globe, FileText, Settings, User, Terminal, 
  FolderOpen, FolderKanban, ArrowLeft, FileCode, Zap, Play, Sparkles
} from 'lucide-react';
import useOsStore from '../store/osStore';

const iconMap = {
  Sparkles: Sparkles,
  Zap: Zap,
  Play: Play,
  Bot: Bot,
  Code2: Code2,
  Globe: Globe,
  FileText: FileText,
  Settings: Settings,
  Terminal: Terminal,
  FolderOpen: FolderOpen,
  FolderKanban: FolderKanban,
  ArrowLeft: ArrowLeft,
  FileCode: FileCode
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [hoverLogo, setHoverLogo] = useState(false);
  const { apps, openWindows, activeWindow, focusWindow, restoreWindow, openWindow, theme, setTheme } = useOsStore();

  const toggleTheme = () => {
    setTheme(theme === 'vision-light' ? 'dark' : 'vision-light');
  };

  return (
    <div className="w-16 h-full glass-panel border-r border-glass-border flex flex-col items-center py-4 z-50 bg-panel shadow-2xl relative">
      
      {/* Brand Icon / Back Button */}
      <button 
        onClick={() => navigate('/')}
        onMouseEnter={() => setHoverLogo(true)}
        onMouseLeave={() => setHoverLogo(false)}
        className="w-10 h-10 rounded-xl bg-neon-blue flex items-center justify-center mb-8 shadow-md cursor-pointer group relative hover:bg-red-500 transition-colors duration-300"
      >
        {hoverLogo ? <ArrowLeft className="w-5 h-5 text-bg-dark" /> : <span className="font-bold text-bg-dark text-sm">NA</span>}
        <div className="absolute left-14 px-2 py-1 bg-text-main text-bg-dark text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100]">
          Exit Workspace
        </div>
      </button>

      {/* App Launcher / Active Apps */}
      <div className="flex-1 flex flex-col items-center gap-4 w-full">
        {apps.filter(app => !app.hidden).map(app => {
          const IconComponent = iconMap[app.icon] || FileText;
          const windowState = openWindows.find(w => w.id === app.id);
          const isOpen = !!windowState;
          const isActive = activeWindow === app.id;

          return (
            <div key={app.id} className="relative group w-full flex justify-center">
              <button
                onClick={() => {
                  if (isOpen) {
                    if (windowState.minimized) restoreWindow(app.id);
                    else focusWindow(app.id);
                  } else {
                    openWindow(app.id);
                  }
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'bg-neon-blue/20 text-neon-blue shadow-sm border border-neon-blue/50' 
                    : 'text-text-muted hover:bg-glass hover:text-text-main border border-transparent'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </button>
              
              {/* Active Indicator */}
              {isOpen && (
                <div className={`absolute left-1 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all duration-300 ${isActive ? 'h-5 bg-neon-blue' : 'h-2 bg-text-muted'}`}></div>
              )}

              {/* Tooltip */}
              <div className="absolute left-14 px-2 py-1 bg-text-main text-bg-dark text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100]">
                {app.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* User Profile / Theme Toggle */}
      <div className="mt-auto flex flex-col gap-4">
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:bg-glass hover:text-text-main transition-colors cursor-pointer border border-transparent"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
