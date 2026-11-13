import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Sparkles, Terminal, Code2, Play, FolderOpen, 
  Settings, Sun, Moon, Download, Layers, X, ArrowRight, Zap, FolderKanban
} from 'lucide-react';
import useOsStore from '../store/osStore';
import { sound } from '../utils/sound';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const { openWindow, setTheme, theme, fileSystem, updateFileContent } = useOsStore();

  useEffect(() => {
    if (isOpen) {
      sound.playPop();
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const runSampleApp = (prompt, code) => {
    sound.playSuccess();
    updateFileContent('index.js', code);
    openWindow('live-preview');
    onClose();
  };

  const sampleApps = [
    {
      id: 'demo-calc',
      title: 'Generate & Run: Glassmorphism Calculator',
      category: 'AI Presets',
      icon: Sparkles,
      color: 'text-cyan-400',
      action: () => runSampleApp('Calculator', `function App() {
  const [calc, setCalc] = React.useState('0');
  const press = (v) => setCalc(prev => prev === '0' ? v : prev + v);
  const compute = () => { try { setCalc(String(eval(calc))); } catch(e) { setCalc('Err'); } };
  return (
    <div className="min-h-full bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-72 bg-slate-900/90 border border-cyan-500/30 p-5 rounded-3xl shadow-2xl backdrop-blur-xl">
        <div className="text-right text-3xl font-mono p-4 bg-slate-950/80 rounded-2xl mb-4 text-cyan-400 overflow-hidden font-bold">{calc}</div>
        <div className="grid grid-cols-4 gap-2 text-sm font-bold">
          {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map(b => (
            <button key={b} onClick={() => b === 'C' ? setCalc('0') : b === '=' ? compute() : press(b)}
              className="p-3.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 rounded-xl transition-all cursor-pointer font-mono">
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}`)
    },
    {
      id: 'demo-tictactoe',
      title: 'Generate & Run: Cyberpunk Tic-Tac-Toe',
      category: 'AI Presets',
      icon: Sparkles,
      color: 'text-purple-400',
      action: () => runSampleApp('Tic-Tac-Toe', `function App() {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [turn, setTurn] = React.useState('X');
  const handleClick = (i) => {
    if (board[i]) return;
    const next = [...board];
    next[i] = turn;
    setBoard(next);
    setTurn(turn === 'X' ? 'O' : 'X');
  };
  return (
    <div className="min-h-full bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="text-2xl font-black mb-4 tracking-wider text-purple-400">CYBER TIC-TAC-TOE</div>
      <div className="text-xs text-slate-400 mb-6 font-mono">Current Player: <span className="text-cyan-400 font-bold">{turn}</span></div>
      <div className="grid grid-cols-3 gap-3 w-64 h-64">
        {board.map((cell, idx) => (
          <button key={idx} onClick={() => handleClick(idx)} className="bg-slate-900 border border-purple-500/30 hover:border-cyan-400 rounded-2xl text-3xl font-black flex items-center justify-center transition-all cursor-pointer text-cyan-300">
            {cell}
          </button>
        ))}
      </div>
      <button onClick={() => setBoard(Array(9).fill(null))} className="mt-6 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer">Reset Match</button>
    </div>
  );
}`)
    }
  ];

  const appActions = [
    {
      id: 'open-omni',
      title: 'Open Omni AI Super-Agent',
      category: 'Applications',
      icon: Sparkles,
      color: 'text-cyan-400',
      action: () => { sound.playClick(); openWindow('omni-agent'); onClose(); }
    },
    {
      id: 'open-preview',
      title: 'Launch Live Sandbox Preview',
      category: 'Applications',
      icon: Play,
      color: 'text-emerald-400',
      action: () => { sound.playClick(); openWindow('live-preview'); onClose(); }
    },
    {
      id: 'open-ide',
      title: 'Open PromptLab Code Editor',
      category: 'Applications',
      icon: Code2,
      color: 'text-blue-400',
      action: () => { sound.playClick(); openWindow('code-editor'); onClose(); }
    },
    {
      id: 'open-terminal',
      title: 'Open Terminal Console',
      category: 'Applications',
      icon: Terminal,
      color: 'text-green-400',
      action: () => { sound.playClick(); openWindow('terminal'); onClose(); }
    },
    {
      id: 'open-files',
      title: 'Open File Explorer (/home)',
      category: 'Applications',
      icon: FolderOpen,
      color: 'text-amber-400',
      action: () => { sound.playClick(); openWindow('file-explorer'); onClose(); }
    },
    {
      id: 'toggle-theme',
      title: `Switch Theme to ${theme === 'vision-light' ? 'Dark Matrix' : 'Vision Light'}`,
      category: 'System',
      icon: theme === 'vision-light' ? Moon : Sun,
      color: 'text-yellow-400',
      action: () => { sound.playClick(); setTheme(theme === 'vision-light' ? 'dark' : 'vision-light'); onClose(); }
    },
    {
      id: 'export-workspace',
      title: 'Export Virtual Workspace (JSON / Local)',
      category: 'System',
      icon: Download,
      color: 'text-purple-400',
      action: () => {
        sound.playSuccess();
        const blob = new Blob([JSON.stringify(fileSystem, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'neuro-os-workspace.json';
        a.click();
        URL.revokeObjectURL(url);
        onClose();
      }
    }
  ];

  const allItems = [...sampleApps, ...appActions];
  const filtered = allItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
      sound.playClick();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
      sound.playClick();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-24 px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: "spring", duration: 0.25 }}
            className="relative w-full max-w-xl bg-slate-900/95 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden backdrop-blur-2xl flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input 
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or instant app preset (e.g. 'Calculator', 'Theme', 'Terminal')..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
              />
              <span className="text-[10px] font-mono bg-white/10 text-slate-300 px-2 py-0.5 rounded border border-white/10 shrink-0">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No matching command or app found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div 
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-cyan-500/20 border border-cyan-500/40 text-white' 
                          : 'hover:bg-white/5 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg bg-white/5 ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium">{item.title}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span>Navigate: <b className="text-white font-mono">↑↓</b></span>
                <span>Select: <b className="text-white font-mono">↵</b></span>
              </div>
              <span className="text-cyan-400/80 font-mono text-[10px]">Raycast Mode Enabled</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
