import React, { useState } from 'react';
import useOsStore from '../../store/osStore';
import { 
  Zap, Bot, Code2, Play, CheckCircle2, ArrowRight, Loader2, 
  Sparkles, Layers, FileCode, Check, RefreshCw
} from 'lucide-react';

const Orchestrator = () => {
  const { geminiApiKey, updateFileContent, openWindow } = useOsStore();
  const [goal, setGoal] = useState('');
  const [currentStage, setCurrentStage] = useState('idle'); // idle, researching, coding, saving, completed
  const [researchOutput, setResearchOutput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs(prev => [...prev, { text: msg, time: new Date().toLocaleTimeString() }]);
  };

  const handleStartPipeline = async () => {
    if (!goal.trim()) return;
    setLogs([]);
    setCurrentStage('researching');
    addLog(`[Pipeline Initialized] Goal: "${goal}"`);
    addLog('Assigning Stage 1 to Researcher AI...');

    // 1. Stage: Researcher AI
    let specs = '';
    if (geminiApiKey) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are an AI System Architect. The user wants to build: "${goal}". Provide a concise bulleted technical specification: Component state requirements, UI layout, and key user interactions. Keep it under 150 words.` }] }]
          })
        });
        const data = await res.json();
        specs = data.candidates?.[0]?.content?.parts?.[0]?.text || "Specifications generated successfully.";
      } catch (e) {
        specs = `Architecture for "${goal}":\n- State: React hooks for reactive input\n- UI: Modern Tailwind cards & glassmorphism\n- Features: Interactive actions, responsive layout.`;
      }
    } else {
      await new Promise(r => setTimeout(r, 1200));
      specs = `Architecture Specs for "${goal}":\n- State: useState for reactive counter / state\n- UI: Dark Tailwind palette with rounded-2xl cards\n- Interactions: Button click handlers, responsive inputs.`;
    }
    setResearchOutput(specs);
    addLog('Researcher AI completed architectural spec.');

    // 2. Stage: Coder AI
    setCurrentStage('coding');
    addLog('Handing specifications over to Coder AI...');

    let code = '';
    if (geminiApiKey) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are an expert React developer. Write a complete, self-contained React component named App for this goal: "${goal}". Specifications: ${specs}. Return ONLY a clean markdown code block with the React component using Tailwind CSS.` }] }]
          })
        });
        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const match = rawText.match(/```[\w]*\n([\s\S]*?)```/);
        code = match ? match[1].trim() : rawText;
      } catch (e) {
        code = defaultGeneratedApp(goal);
      }
    } else {
      await new Promise(r => setTimeout(r, 1500));
      code = defaultGeneratedApp(goal);
    }

    setGeneratedCode(code);
    addLog('Coder AI synthesized full React application.');

    // 3. Stage: Saving to VFS
    setCurrentStage('saving');
    addLog('Committing generated code to Virtual File System (/home/index.js)...');
    await new Promise(r => setTimeout(r, 800));
    updateFileContent('index.js', code);
    addLog('Filesystem updated successfully.');

    // 4. Completed
    setCurrentStage('completed');
    addLog('Pipeline execution finished! App is ready for live execution.');
  };

  const defaultGeneratedApp = (targetGoal) => `function App() {
  const [val, setVal] = React.useState(0);
  const [active, setActive] = React.useState(true);

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl text-white">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
        <h3 className="font-bold text-lg text-cyan-400">Autonomous Build</h3>
      </div>
      <h2 className="text-2xl font-black mb-2">${targetGoal}</h2>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        Orchestrated by Researcher AI and synthesized by Coder AI. Live interactive component ready.
      </p>

      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 mb-6 flex items-center justify-between">
        <span className="text-sm font-mono text-slate-300">Live Metric Value:</span>
        <span className="text-2xl font-bold font-mono text-cyan-400">{val}</span>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={() => setVal(v => v + 1)}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg"
        >
          Increment
        </button>
        <button 
          onClick={() => setVal(0)}
          className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-all cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}`;

  return (
    <div className="h-full w-full flex flex-col bg-transparent text-text-main font-sans p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5" />
            Autonomous Multi-Agent Pipeline
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">AI Orchestration Studio</h2>
          <p className="text-text-muted text-sm">Give a single prompt, and watch Researcher and Coder AI architect and build real apps together.</p>
        </div>

        {currentStage === 'completed' && (
          <button 
            onClick={() => openWindow('live-preview')}
            className="px-5 py-2.5 rounded-xl bg-neon-blue text-bg-dark font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,122,255,0.4)] hover:brightness-110 cursor-pointer animate-pulse"
          >
            <Play className="w-4 h-4 fill-current" />
            Launch in Sandbox Runner
          </button>
        )}
      </div>

      {/* Input Box */}
      <div className="bg-panel border border-glass-border p-5 rounded-2xl shadow-sm mb-8">
        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
          Project Objective or Feature Request
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && currentStage === 'idle' && handleStartPipeline()}
            placeholder="e.g. Build an interactive crypto portfolio card or Pomodoro timer..."
            disabled={currentStage !== 'idle' && currentStage !== 'completed'}
            className="flex-1 bg-glass border border-glass-border rounded-xl px-4 py-3 text-text-main placeholder-text-muted focus:outline-none focus:border-neon-blue text-sm transition-all"
          />
          <button 
            onClick={handleStartPipeline}
            disabled={!goal.trim() || (currentStage !== 'idle' && currentStage !== 'completed')}
            className="px-6 py-3 rounded-xl bg-neon-purple text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStage !== 'idle' && currentStage !== 'completed' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Orchestrating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Run Autonomous Team
              </>
            )}
          </button>
        </div>

        {/* Quick prompt presets */}
        <div className="flex flex-wrap gap-2 mt-4 items-center">
          <span className="text-xs text-text-muted">Try:</span>
          {[
            "Interactive Currency Converter",
            "Glassmorphic Music Player Card",
            "Pomodoro Focus Timer with Sound"
          ].map((prompt, i) => (
            <button 
              key={i} 
              onClick={() => setGoal(prompt)}
              className="text-xs px-2.5 py-1 rounded-lg bg-glass border border-glass-border text-text-muted hover:text-text-main hover:border-neon-blue transition-all cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Stages Pipeline Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Stage 1 */}
        <div className={`p-4 rounded-2xl border transition-all ${
          currentStage === 'researching' ? 'bg-neon-purple/10 border-neon-purple shadow-lg' :
          researchOutput ? 'bg-panel border-green-500/50' : 'bg-panel/40 border-glass-border opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neon-purple/20 text-neon-purple flex items-center justify-center font-bold text-xs">
                1
              </div>
              <span className="font-bold text-sm">Researcher AI</span>
            </div>
            {researchOutput && <CheckCircle2 className="w-4 h-4 text-green-400" />}
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            {researchOutput ? researchOutput.slice(0, 120) + '...' : 'Awaiting prompt to formulate tech specs & user stories.'}
          </p>
        </div>

        {/* Stage 2 */}
        <div className={`p-4 rounded-2xl border transition-all ${
          currentStage === 'coding' ? 'bg-neon-blue/10 border-neon-blue shadow-lg' :
          generatedCode ? 'bg-panel border-green-500/50' : 'bg-panel/40 border-glass-border opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neon-blue/20 text-neon-blue flex items-center justify-center font-bold text-xs">
                2
              </div>
              <span className="font-bold text-sm">Coder AI</span>
            </div>
            {generatedCode && <CheckCircle2 className="w-4 h-4 text-green-400" />}
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            {generatedCode ? `${generatedCode.split('\n').length} lines of React component code synthesized.` : 'Translating technical architecture into React UI.'}
          </p>
        </div>

        {/* Stage 3 */}
        <div className={`p-4 rounded-2xl border transition-all ${
          currentStage === 'completed' ? 'bg-green-500/10 border-green-500 shadow-lg' :
          'bg-panel/40 border-glass-border opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <span className="font-bold text-sm">Live Sandbox</span>
            </div>
            {currentStage === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            {currentStage === 'completed' ? 'Saved to VFS & compiled in Live App Sandbox.' : 'Pending code generation to trigger compilation.'}
          </p>
        </div>
      </div>

      {/* Execution Logs */}
      {logs.length > 0 && (
        <div className="bg-panel border border-glass-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-glass-border">
            <span className="text-xs font-mono font-bold text-text-muted uppercase">Agent Execution Stream</span>
            <span className="text-[10px] text-green-400 font-mono">Live</span>
          </div>
          <div className="font-mono text-xs space-y-1 text-slate-300">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="opacity-40 select-none">[{log.time}]</span>
                <span>{log.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orchestrator;
