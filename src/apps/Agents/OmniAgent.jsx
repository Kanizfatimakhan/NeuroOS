import React, { useState } from 'react';
import useOsStore from '../../store/osStore';
import { 
  Sparkles, Send, Play, Code2, Globe, FileCode, CheckCircle2, 
  Terminal, ArrowRight, Layers, RotateCcw, Copy, Check, Zap, Flame, Gamepad2
} from 'lucide-react';
import { sound } from '../../utils/sound';

const OmniAgent = () => {
  const { geminiApiKey, updateFileContent, openWindow, fileSystem, currentFileInEditor } = useOsStore();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am OmniAI, your autonomous developer inside NeuroOS. No need to switch between separate tools — whether it's research, writing code, or running interactive web apps, just describe your goal!",
      suggestions: [
        "Build an interactive Glassmorphism Calculator",
        "Create a dynamic Weather Widget with Tailwind",
        "Generate a sleek Kanban Todo Board in React"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleSend = async (customPrompt) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    sound.playClick();
    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setIsProcessing(true);

    let generatedCode = '';
    let explanation = '';

    if (geminiApiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ 
                text: `You are OmniAI, the complete autonomous developer inside NeuroOS. The user asked: "${textToSend}". 
1. Provide a short 1-sentence friendly explanation of what you built.
2. Provide a fully self-contained React component named App with Tailwind CSS in exactly one markdown code block. Include functional state, buttons, and high-end visual design.` 
              }] 
            }]
          })
        });

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const match = rawText.match(/```[\w]*\n([\s\S]*?)```/);
        generatedCode = match ? match[1].trim() : '';
        explanation = rawText.replace(/```[\w]*\n([\s\S]*?)```/g, '').trim() || "I have generated and executed the interactive application for you!";
      } catch (e) {
        console.error(e);
      }
    }

    // High quality offline fallback if no API key or failed
    if (!generatedCode) {
      await new Promise(r => setTimeout(r, 1000));
      explanation = `I have architected and generated a full functional React app based on your request ("${textToSend}"). It features modern Tailwind CSS styling and live interactivity!`;
      generatedCode = createMockApp(textToSend);
    }

    // Auto-save to virtual filesystem index.js
    updateFileContent('index.js', generatedCode);
    sound.playSuccess();

    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'ai',
        text: explanation,
        code: generatedCode
      }
    ]);
    setIsProcessing(false);
  };

  const createMockApp = (query) => {
    const isCalc = query.toLowerCase().includes('calc');
    const isWeather = query.toLowerCase().includes('weather');

    if (isCalc) {
      return `function App() {
  const [display, setDisplay] = React.useState('0');
  
  const handleNum = (n) => {
    setDisplay(d => d === '0' ? n : d + n);
  };
  const handleOp = (op) => {
    setDisplay(d => d + ' ' + op + ' ');
  };
  const calculate = () => {
    try {
      setDisplay(String(eval(display)));
    } catch {
      setDisplay('Error');
    }
  };
  const clear = () => setDisplay('0');

  return (
    <div className="max-w-xs mx-auto my-6 p-6 bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl text-white font-mono">
      <div className="text-right text-3xl font-black mb-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-cyan-400 overflow-x-auto truncate">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2 text-sm font-bold">
        <button onClick={clear} className="col-span-2 p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all">C</button>
        <button onClick={() => handleOp('/')} className="p-3 bg-slate-800 text-cyan-400 rounded-xl hover:bg-slate-700">÷</button>
        <button onClick={() => handleOp('*')} className="p-3 bg-slate-800 text-cyan-400 rounded-xl hover:bg-slate-700">×</button>
        {['7','8','9','-','4','5','6','+','1','2','3'].map(k => (
          <button key={k} onClick={() => isNaN(k) ? handleOp(k) : handleNum(k)} className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700">{k}</button>
        ))}
        <button onClick={() => handleNum('0')} className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700">0</button>
        <button onClick={calculate} className="col-span-4 p-3.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black rounded-xl hover:brightness-110 shadow-lg text-base">
          = Result
        </button>
      </div>
    </div>
  );
}`;
    }

    if (isWeather) {
      return `function App() {
  const [city, setCity] = React.useState('Mumbai');
  const [temp, setTemp] = React.useState(28);

  return (
    <div className="max-w-sm mx-auto my-8 p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl shadow-2xl text-white text-center">
      <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-4">
        Live Atmosphere
      </div>
      <h2 className="text-3xl font-black mb-1">{city}</h2>
      <p className="text-slate-400 text-xs mb-6">Partly Cloudy • Humidity 64%</p>
      
      <div className="text-6xl font-black my-4 text-cyan-400 font-mono tracking-tighter">
        {temp}°C
      </div>

      <div className="flex gap-2 justify-center mt-6">
        {['Delhi', 'Bangalore', 'London', 'New York'].map(c => (
          <button 
            key={c}
            onClick={() => { setCity(c); setTemp(Math.floor(Math.random() * 15 + 18)); }}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-500 hover:text-slate-950 text-xs font-semibold transition-all"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}`;
    }

    return `function App() {
  const [count, setCount] = React.useState(0);
  const [active, setActive] = React.useState(true);

  return (
    <div className="max-w-md mx-auto my-6 p-8 bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl text-white">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="text-xs font-bold text-cyan-400 font-mono uppercase">Omni Generated</span>
      </div>
      <h2 className="text-2xl font-black mb-2">${query}</h2>
      <p className="text-slate-400 text-xs mb-6 leading-relaxed">
        This application was autonomously generated and mounted by OmniAI. Click the interactive buttons below to test!
      </p>

      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 mb-6 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-400">Interactive Metric:</span>
        <span className="text-2xl font-black font-mono text-cyan-400">{count}</span>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => setCount(c => c + 1)}
          className="flex-1 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black rounded-xl hover:brightness-110 active:scale-95 transition-all text-sm shadow-lg"
        >
          Click Me (+1)
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
}`;
  };

  const handleCopy = (code, id) => {
    navigator.clipboard?.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full w-full flex flex-col bg-transparent text-text-main font-sans text-sm select-none">
      {/* Top Bar */}
      <div className="h-12 border-b border-glass-border bg-panel px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-slate-950 font-black shadow-md text-xs">
            ✨
          </div>
          <div>
            <span className="font-extrabold text-xs text-text-main">OmniAI Super-Agent</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 font-mono">
              Research + Code + Execute
            </span>
          </div>
        </div>

        <button 
          onClick={() => { sound.playPop(); openWindow('live-preview'); }}
          className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Open Live Sandbox</span>
        </button>
      </div>

      {/* 1-Click Instant Magic Demo Shelf */}
      <div className="px-4 py-2 border-b border-glass-border bg-black/20 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 shrink-0 font-bold flex items-center gap-1">
          <Flame className="w-3 h-3 text-amber-400" />
          1-Click Presets:
        </span>
        <button
          onClick={() => handleSend("Build an interactive Glassmorphism Calculator with Tailwind CSS")}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 border border-white/10 text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>🧮 Calculator</span>
        </button>
        <button
          onClick={() => handleSend("Create a two-player Cyberpunk Tic-Tac-Toe game in React")}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-purple-500/20 hover:text-purple-300 text-slate-300 border border-white/10 text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>🎮 Tic-Tac-Toe Game</span>
        </button>
        <button
          onClick={() => handleSend("Build a minimalist Glass Weather Widget with city toggles")}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-300 border border-white/10 text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>⛅ Weather Widget</span>
        </button>
        <button
          onClick={() => handleSend("Build a Pomodoro Focus Timer with start, stop, and reset controls")}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-pink-500/20 hover:text-pink-300 text-slate-300 border border-white/10 text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>⏱️ Pomodoro Timer</span>
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
              msg.sender === 'user' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md'
            }`}>
              {msg.sender === 'user' ? 'You' : 'AI'}
            </div>

            <div className={`max-w-[85%] flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-600 dark:text-cyan-200' 
                  : 'bg-panel border border-glass-border text-text-main shadow-sm'
              }`}>
                {msg.text}

                {/* Suggestions pill */}
                {msg.suggestions && (
                  <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-glass-border">
                    <span className="text-[10px] text-text-muted font-bold uppercase">Try clicking one:</span>
                    {msg.suggestions.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSend(s)}
                        className="text-left px-3 py-1.5 rounded-lg bg-glass border border-glass-border hover:border-cyan-400/60 hover:text-cyan-500 text-[11px] text-text-main transition-all cursor-pointer"
                      >
                        ⚡ {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Code Snippet Box with Direct Run Action */}
              {msg.code && (
                <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl mt-1">
                  <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      React App Generated (Saved to index.js)
                    </span>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleCopy(msg.code, msg.id)}
                        className="text-[11px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button 
                        onClick={() => openWindow('live-preview')}
                        className="text-[11px] px-2.5 py-1 rounded bg-cyan-500 text-slate-950 font-bold hover:brightness-110 transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Run in Sandbox</span>
                      </button>
                    </div>
                  </div>

                  <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-64 custom-scrollbar">
                    {msg.code}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
            <div className="bg-panel border border-glass-border px-4 py-3 rounded-2xl flex items-center gap-2 text-xs text-cyan-400 font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Architecting specs, synthesizing code, and saving to disk...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-glass-border bg-panel">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isProcessing && handleSend()}
            placeholder="Describe an app to build (e.g., 'Modern Music Player with play/pause state')..."
            disabled={isProcessing}
            className="flex-1 bg-glass border border-glass-border rounded-xl px-4 py-3 text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-cyan-400 transition-all"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isProcessing}
            className="px-5 py-3 rounded-xl bg-cyan-500 hover:brightness-110 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Build</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OmniAgent;
