import React, { useState, useEffect } from 'react';
import DesktopBackground from '../three/DesktopBackground';
import WindowManager from './WindowManager';
import CommandPalette from './CommandPalette';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import useOsStore from '../store/osStore';
import { sound } from '../utils/sound';
import { 
  Code2, FolderOpen, Settings, Bot, Terminal, Globe, 
  Sparkles, ArrowRight, FolderKanban, FileCode, Zap, Play, 
  Sun, Moon, LayoutGrid, Maximize2, Minimize2,
  Columns, ExternalLink, Command, ShieldCheck, Download, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const dockApps = [
  { id: 'omni-agent', name: 'Omni AI (All-in-One)', icon: Sparkles, color: 'text-cyan-400 bg-cyan-500/20' },
  { id: 'live-preview', name: 'App Runner', icon: Play, color: 'text-purple-400 bg-purple-500/20' },
  { id: 'code-editor', name: 'PromptLab', icon: FileCode, color: 'text-blue-400 bg-blue-500/15' },
  { id: 'file-explorer', name: 'Files', icon: FolderOpen, color: 'text-emerald-400 bg-emerald-500/15' },
  { id: 'project-manager', name: 'Tasks', icon: FolderKanban, color: 'text-amber-400 bg-amber-500/15' },
  { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'text-green-400 bg-green-500/15' },
  { id: 'orchestrator', name: 'Studio', icon: Zap, color: 'text-pink-400 bg-pink-500/15' },
  { id: 'settings', name: 'Settings', icon: Settings, color: 'text-slate-300 bg-slate-500/15' },
];

const Desktop = () => {
  useKeyboardShortcuts();
  const navigate = useNavigate();
  const { 
    openWindow, openWindows, closeWindow, updateWindowPosition, 
    updateWindowSize, activeWindow, theme, setTheme, user 
  } = useOsStore();

  const [time, setTime] = useState(new Date());
  const [quickInput, setQuickInput] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-open Split Studio layout on initial boot if no windows are open
  useEffect(() => {
    const hasAutoOpened = sessionStorage.getItem('neuroos_workspace_auto_opened');
    if (!hasAutoOpened && openWindows.length === 0) {
      sessionStorage.setItem('neuroos_workspace_auto_opened', 'true');
      applyStudioLayout();
    }
  }, []);

  // Preset Layout 1: Omni Studio (Left: OmniAI All-in-One, Right: Live App Runner)
  const applyStudioLayout = () => {
    openWindow('omni-agent');
    openWindow('live-preview');
    const screenW = window.innerWidth;
    const isMobile = screenW < 768;
    const screenH = window.innerHeight - 80;
    
    setTimeout(() => {
      if (isMobile) {
        updateWindowPosition('omni-agent', { x: 0, y: 0 });
        updateWindowSize('omni-agent', { width: screenW, height: screenH });
        updateWindowPosition('live-preview', { x: 0, y: 0 });
        updateWindowSize('live-preview', { width: screenW, height: screenH });
      } else {
        const halfW = Math.floor(screenW / 2) - 10;
        updateWindowPosition('omni-agent', { x: 10, y: 38 });
        updateWindowSize('omni-agent', { width: halfW, height: screenH });
        updateWindowPosition('live-preview', { x: halfW + 15, y: 38 });
        updateWindowSize('live-preview', { width: halfW, height: screenH });
      }
    }, 50);
  };

  // Preset Layout 2: IDE Layout (Left: PromptLab Monaco, Right: Sandbox)
  const applyIdeLayout = () => {
    openWindow('code-editor');
    openWindow('live-preview');
    const screenW = window.innerWidth;
    const isMobile = screenW < 768;
    const screenH = window.innerHeight - 80;
    
    setTimeout(() => {
      if (isMobile) {
        updateWindowPosition('code-editor', { x: 0, y: 0 });
        updateWindowSize('code-editor', { width: screenW, height: screenH });
        updateWindowPosition('live-preview', { x: 0, y: 0 });
        updateWindowSize('live-preview', { width: screenW, height: screenH });
      } else {
        const halfW = Math.floor(screenW / 2) - 10;
        updateWindowPosition('code-editor', { x: 10, y: 38 });
        updateWindowSize('code-editor', { width: halfW, height: screenH });
        updateWindowPosition('live-preview', { x: halfW + 15, y: 38 });
        updateWindowSize('live-preview', { width: halfW, height: screenH });
      }
    }, 50);
  };

  // Preset Layout 3: Agent Pair (Coder + Researcher)
  const applyAgentsLayout = () => {
    openWindow('coder-agent');
    openWindow('research-agent');
    const screenW = window.innerWidth;
    const isMobile = screenW < 768;
    const screenH = window.innerHeight - 80;
    
    setTimeout(() => {
      if (isMobile) {
        updateWindowPosition('coder-agent', { x: 0, y: 0 });
        updateWindowSize('coder-agent', { width: screenW, height: screenH });
        updateWindowPosition('research-agent', { x: 0, y: 0 });
        updateWindowSize('research-agent', { width: screenW, height: screenH });
      } else {
        const halfW = Math.floor(screenW / 2) - 10;
        updateWindowPosition('coder-agent', { x: 10, y: 38 });
        updateWindowSize('coder-agent', { width: halfW, height: screenH });
        updateWindowPosition('research-agent', { x: halfW + 15, y: 38 });
        updateWindowSize('research-agent', { width: halfW, height: screenH });
      }
    }, 50);
  };

  const closeAllWindows = () => {
    openWindows.forEach(w => closeWindow(w.id));
  };

  const toggleTheme = () => {
    sound.playClick();
    setTheme(theme === 'vision-light' ? 'dark' : 'vision-light');
  };

  const handleQuickCommand = (e) => {
    if (e.key === 'Enter' && quickInput.trim()) {
      const q = quickInput.toLowerCase();
      if (q.includes('run') || q.includes('preview')) openWindow('live-preview');
      else if (q.includes('studio') || q.includes('orchestrat')) openWindow('orchestrator');
      else if (q.includes('code') || q.includes('editor')) openWindow('code-editor');
      else if (q.includes('term')) openWindow('terminal');
      else if (q.includes('file')) openWindow('file-explorer');
      else if (q.includes('project') || q.includes('task')) openWindow('project-manager');
      else if (q.includes('research')) openWindow('research-agent');
      else if (q.includes('omni') || q.includes('all')) openWindow('omni-agent');
      else openWindow('omni-agent');
      setQuickInput('');
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden text-text-main select-none flex flex-col ${
      theme === 'vision-light' ? 'bg-slate-100' : 'bg-[#050811]'
    }`}>
      <DesktopBackground />

      {/* Top Glass Menu Bar */}
      <div className={`h-9 w-full border-b backdrop-blur-2xl px-4 flex items-center justify-between text-xs font-medium z-50 select-none shadow-sm transition-colors ${
        theme === 'vision-light' 
          ? 'bg-white/80 border-slate-200/80 text-slate-700' 
          : 'bg-slate-950/75 border-white/10 text-slate-300'
      }`}>
        {/* Left: Brand & Presets */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            title="Exit to Landing Page"
          >
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-black text-slate-950 text-[10px]">
              NA
            </div>
            <span className={`font-extrabold tracking-tight ${theme === 'vision-light' ? 'text-slate-900' : 'text-white'}`}>NeuroOS</span>
          </button>

          <div className={`h-4 w-px hidden sm:block ${theme === 'vision-light' ? 'bg-slate-300' : 'bg-white/10'}`}></div>

          {/* Quick Layout Presets Switcher */}
          <div className={`hidden sm:flex items-center gap-1.5 ${theme === 'vision-light' ? 'text-slate-600' : 'text-slate-400'}`}>
            <button 
              onClick={applyStudioLayout}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer text-[11px] ${
                theme === 'vision-light' ? 'hover:bg-slate-200 hover:text-slate-900' : 'hover:bg-white/10 hover:text-white'
              }`}
              title="Split: AI Studio + Sandbox Runner"
            >
              <Columns className="w-3.5 h-3.5 text-cyan-500" />
              <span>Studio Split</span>
            </button>

            <button 
              onClick={applyIdeLayout}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer text-[11px] ${
                theme === 'vision-light' ? 'hover:bg-slate-200 hover:text-slate-900' : 'hover:bg-white/10 hover:text-white'
              }`}
              title="Split: PromptLab IDE + Sandbox"
            >
              <Columns className="w-3.5 h-3.5 text-blue-500" />
              <span>IDE Split</span>
            </button>

            <button 
              onClick={applyAgentsLayout}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer text-[11px] ${
                theme === 'vision-light' ? 'hover:bg-slate-200 hover:text-slate-900' : 'hover:bg-white/10 hover:text-white'
              }`}
              title="Pair: Coder AI + Researcher AI"
            >
              <Bot className="w-3.5 h-3.5 text-purple-500" />
              <span>Agent Pair</span>
            </button>
          </div>
        </div>

        {/* Center: Command Palette Trigger Button (Raycast style) */}
        <button 
          onClick={() => setIsCommandPaletteOpen(true)}
          className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-xl border transition-all cursor-pointer shadow-inner ${
            theme === 'vision-light' 
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' 
              : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
          }`}
        >
          <Search className="w-3.5 h-3.5 text-cyan-500" />
          <span className="text-[11px] font-sans">Command Palette & Presets...</span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
            theme === 'vision-light' ? 'bg-slate-200 text-slate-700 border-slate-300' : 'bg-white/10 text-slate-300 border-white/10'
          }`}>
            ⌘K
          </span>
        </button>

        {/* Right Info & Controls */}
        <div className="flex items-center gap-3">
          {openWindows.length > 0 && (
            <button 
              onClick={closeAllWindows}
              className={`px-2 py-0.5 rounded text-[11px] hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer ${
                theme === 'vision-light' ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Close All ({openWindows.length})
            </button>
          )}

          <div className={`hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono ${
            theme === 'vision-light' ? 'bg-slate-200/80 border-slate-300 text-slate-700' : 'bg-white/5 border-white/10 text-slate-400'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>60 FPS</span>
          </div>

          <button 
            onClick={toggleTheme}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              theme === 'vision-light' 
                ? 'bg-slate-200 border-slate-300 text-amber-600 hover:bg-slate-300' 
                : 'bg-white/10 border-white/10 text-slate-300 hover:text-white hover:bg-white/20'
            }`}
            title="Toggle Light / Dark Theme"
          >
            {theme === 'vision-light' ? <Sun className="w-4 h-4 fill-amber-500 text-amber-500" /> : <Moon className="w-4 h-4 text-cyan-300" />}
          </button>

          <div className={`font-mono text-xs font-bold pl-1 ${theme === 'vision-light' ? 'text-slate-800' : 'text-white'}`}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
      
      {/* Workspace Area */}
      <div className="flex-1 relative overflow-hidden">
        
        {/* Curated Interactive Empty Desktop */}
        {openWindows.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 select-none z-10 overflow-y-auto">
            <div className="flex flex-col items-center text-center w-full max-w-3xl pointer-events-auto">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <Sparkles className="w-3.5 h-3.5" />
                Workspace Operational • No Active Windows
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3">
                What should we <span className="text-gradient">build today?</span>
              </h1>
              
              <p className="text-slate-400 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
                Launch an autonomous orchestration, code in PromptLab, or test responsive web apps in the live sandbox.
              </p>

              {/* Quick Prompt Launcher Bar */}
              <div className="w-full max-w-lg bg-slate-900/90 border border-white/10 rounded-2xl p-2.5 mb-8 shadow-2xl flex items-center gap-3">
                <Command className="w-4 h-4 text-cyan-400 ml-2 shrink-0" />
                <input 
                  type="text" 
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  onKeyDown={handleQuickCommand}
                  placeholder="Type a mission, or 'studio', 'run', 'code', 'term'..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                  autoFocus
                />
                <button 
                  onClick={() => handleQuickCommand({ key: 'Enter' })}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:brightness-110 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  Launch
                </button>
              </div>

              {/* 3 Prominent Quick Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div 
                  onClick={applyStudioLayout}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-1 text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1">Launch Studio Split</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">AI Orchestrator on left, Sandbox Live Preview on right.</p>
                </div>

                <div 
                  onClick={applyIdeLayout}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:-translate-y-1 text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1">Full IDE Split</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Monaco VS Code editor paired with live web app compiler.</p>
                </div>

                <div 
                  onClick={() => openWindow('file-explorer')}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:-translate-y-1 text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1">Files & Import</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Upload code from PC or export bundled zip/JSON workspaces.</p>
                </div>
              </div>

            </div>
          </div>
        )}

        <WindowManager />
      </div>

      {/* Raycast Style Global Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />

      {/* Floating Apple Vision / macOS Glass Dock */}
      <div className="h-16 w-full flex items-center justify-center z-50 pointer-events-none pb-3 px-2">
        <div className={`pointer-events-auto border backdrop-blur-2xl px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto custom-scrollbar transition-all ${
          theme === 'vision-light'
            ? 'bg-white/85 border-slate-300/80 shadow-[0_15px_40px_rgba(0,0,0,0.15)]'
            : 'bg-slate-950/85 border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.7)]'
        }`}>
          {dockApps.map(app => {
            const Icon = app.icon;
            const isOpen = openWindows.some(w => w.id === app.id);
            const isActive = activeWindow === app.id;

            return (
              <div key={app.id} className="relative group flex flex-col items-center">
                <button
                  onClick={() => { sound.playClick(); openWindow(app.id); }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-125 hover:-translate-y-2.5 active:scale-95 ${app.color} ${
                    isActive ? 'ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.4)]' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>

                {/* Active Underdot */}
                {isOpen && (
                  <span className={`w-1 h-1 rounded-full mt-1 transition-all ${
                    isActive ? 'bg-cyan-500 scale-125' : (theme === 'vision-light' ? 'bg-slate-400' : 'bg-slate-400')
                  }`}></span>
                )}

                {/* Hover Tooltip */}
                <div className={`absolute -top-9 px-2.5 py-1 border text-[11px] font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg ${
                  theme === 'vision-light' 
                    ? 'bg-white border-slate-300 text-slate-800' 
                    : 'bg-slate-900 border-white/10 text-white'
                }`}>
                  {app.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
