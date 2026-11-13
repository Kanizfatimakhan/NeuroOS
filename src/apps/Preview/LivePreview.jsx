import React, { useState, useEffect, useRef } from 'react';
import useOsStore from '../../store/osStore';
import { 
  Play, RotateCw, Smartphone, Tablet, Monitor, 
  Terminal, ExternalLink, Code2, Check, AlertCircle, Sparkles, Download
} from 'lucide-react';

const defaultHtmlTemplate = (userCode) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 999px; }
  </style>
</head>
<body class="p-4 min-h-screen">
  <div id="root"></div>

  <script>
    // Capture errors and messages
    window.onerror = function(msg, url, line) {
      window.parent.postMessage({ type: 'PREVIEW_ERROR', message: msg + ' (Line: ' + line + ')' }, '*');
      return false;
    };
    const origLog = console.log;
    console.log = function(...args) {
      window.parent.postMessage({ type: 'PREVIEW_LOG', message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ') }, '*');
      origLog.apply(console, args);
    };
  </script>

  <script type="text/babel">
    try {
      ${userCode}

      // Check if an App component was defined
      if (typeof App !== 'undefined') {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
      } else if (typeof CustomCard !== 'undefined') {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<CustomCard />);
      }
    } catch (err) {
      window.parent.postMessage({ type: 'PREVIEW_ERROR', message: err.message }, '*');
    }
  </script>
</body>
</html>
`;

const sampleAppCode = `function App() {
  const [tasks, setTasks] = React.useState([
    { id: 1, text: "Explore NeuroAgents OS", done: true },
    { id: 2, text: "Generate component with Coder AI", done: false },
    { id: 3, text: "Live test in Sandbox Runner", done: true }
  ]);
  const [input, setInput] = React.useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Neuro Runner 2.0
          </h2>
          <p className="text-xs text-slate-400">Live Interactive Sandboxed App</p>
        </div>
        <span className="px-2.5 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
          Online
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="New task..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
        />
        <button 
          onClick={addTask}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-xl text-sm hover:brightness-110 active:scale-95 transition-all"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map(t => (
          <div 
            key={t.id} 
            onClick={() => toggleTask(t.id)}
            className="flex items-center gap-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl cursor-pointer hover:border-slate-700 transition-all"
          >
            <input 
              type="checkbox" 
              checked={t.done} 
              readOnly 
              className="accent-cyan-400 rounded cursor-pointer"
            />
            <span className={t.done ? "line-through text-slate-500 text-sm" : "text-slate-200 text-sm"}>
              {t.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`;

const LivePreview = () => {
  const { fileSystem, currentFileInEditor, openWindow } = useOsStore();
  const [device, setDevice] = useState('desktop'); // desktop, tablet, mobile
  const [logs, setLogs] = useState([]);
  const [showConsole, setShowConsole] = useState(false);
  const [key, setKey] = useState(1);
  const iframeRef = useRef(null);

  // Determine current active code
  const currentCode = (() => {
    if (currentFileInEditor && fileSystem[currentFileInEditor]?.content) {
      const c = fileSystem[currentFileInEditor].content;
      // Strip ES module imports/exports if present so babel standalone runs cleanly
      return c.replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
              .replace(/export\s+default\s+function/g, 'function')
              .replace(/export\s+default/g, '');
    }
    const defaultIndex = fileSystem['index.js']?.content;
    if (defaultIndex && defaultIndex.includes('function')) {
      return defaultIndex.replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
                         .replace(/export\s+default\s+function/g, 'function')
                         .replace(/export\s+default/g, '');
    }
    return sampleAppCode;
  })();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'PREVIEW_LOG') {
        setLogs(prev => [...prev.slice(-40), { type: 'log', text: event.data.message, time: new Date().toLocaleTimeString() }]);
      } else if (event.data?.type === 'PREVIEW_ERROR') {
        setLogs(prev => [...prev.slice(-40), { type: 'error', text: event.data.message, time: new Date().toLocaleTimeString() }]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleRefresh = () => {
    setLogs([]);
    setKey(k => k + 1);
  };

  const handleExport = () => {
    const blob = new Blob([defaultHtmlTemplate(currentCode)], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'neuro-app-export.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const deviceWidths = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#0b0f17] text-slate-100 font-sans select-none overflow-hidden">
      {/* Runner Control Bar */}
      <div className="h-12 bg-panel/80 border-b border-glass-border px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Interactive Sandbox</span>
          </div>

          <button 
            onClick={handleRefresh}
            title="Reload App"
            className="p-1.5 rounded-lg hover:bg-glass text-text-muted hover:text-text-main transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Device Mode Switcher */}
        <div className="hidden sm:flex items-center bg-black/40 border border-glass-border rounded-xl p-1 gap-1">
          <button 
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer ${device === 'desktop' ? 'bg-cyan-500/20 text-cyan-400 font-bold shadow-sm' : 'text-text-muted hover:text-text-main'}`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button 
            onClick={() => setDevice('tablet')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer ${device === 'tablet' ? 'bg-cyan-500/20 text-cyan-400 font-bold shadow-sm' : 'text-text-muted hover:text-text-main'}`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer ${device === 'mobile' ? 'bg-cyan-500/20 text-cyan-400 font-bold shadow-sm' : 'text-text-muted hover:text-text-main'}`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowConsole(!showConsole)}
            className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${showConsole ? 'bg-neon-purple/20 border-neon-purple/50 text-neon-purple' : 'bg-glass border-glass-border text-text-muted hover:text-text-main'}`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console ({logs.length})</span>
          </button>

          <button 
            onClick={handleExport}
            title="Export Standalone HTML Web App"
            className="px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 bg-cyan-500 hover:brightness-110 text-slate-950 font-bold transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export App</span>
          </button>
        </div>
      </div>

      {/* Runner Stage Area */}
      <div className="flex-1 bg-[#05080e] relative flex justify-center items-center overflow-auto p-2">
        <div className={`h-full transition-all duration-300 ${deviceWidths[device]} bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col`}>
          <iframe 
            key={key}
            ref={iframeRef}
            srcDoc={defaultHtmlTemplate(currentCode)}
            className="w-full flex-1 border-0"
            sandbox="allow-scripts allow-modals allow-same-origin"
            title="NeuroOS App Sandbox"
          />
        </div>
      </div>

      {/* Live Console Drawer */}
      {showConsole && (
        <div className="h-40 border-t border-glass-border bg-panel flex flex-col">
          <div className="h-8 px-4 bg-black/40 border-b border-glass-border flex items-center justify-between text-xs text-text-muted font-mono">
            <span>Runtime Execution Logs</span>
            <button onClick={() => setLogs([])} className="hover:text-text-main cursor-pointer">Clear</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto font-mono text-xs space-y-1.5 custom-scrollbar">
            {logs.length === 0 && (
              <div className="text-text-muted italic">No runtime logs yet. Outputs from console.log and errors will stream here.</div>
            )}
            {logs.map((log, i) => (
              <div key={i} className={`flex items-start gap-2 ${log.type === 'error' ? 'text-red-400' : 'text-slate-300'}`}>
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

export default LivePreview;
