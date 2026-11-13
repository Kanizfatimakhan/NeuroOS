import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { Book, Code, Terminal, Zap, Puzzle, Layout } from 'lucide-react';
import useOsStore from '../store/osStore';

const docsContent = {
  gettingStarted: {
    title: "Getting Started",
    icon: <Zap className="w-5 h-5" />,
    content: (
      <div className="space-y-6 text-text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text-main mb-4">Introduction to NeuroAgents</h2>
        <p>
          NeuroAgents is a unified AI workspace operating system. It simulates a full desktop environment directly in your browser, enabling seamless orchestration of multiple specialized AI agents.
        </p>
        <p>
          Unlike traditional chat interfaces, NeuroAgents uses a spatial window manager. This allows you to have a Coder Agent, a Designer Agent, and a Data Analyst Agent open simultaneously, sharing a common filesystem and context.
        </p>
        <div className="bg-glass border border-glass-border p-4 rounded-xl my-6 font-mono text-sm">
          npm install neuro-agents-sdk
        </div>
        <h3 className="text-xl font-bold text-text-main mt-8 mb-4">Core Concepts</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Agents:</strong> Specialized AI models fine-tuned for specific tasks.</li>
          <li><strong>Virtual Filesystem:</strong> A persistent browser-based filesystem (IndexedDB) shared across all apps.</li>
          <li><strong>Shared Canvas:</strong> A collaborative space where agents can output visual components and graphs.</li>
        </ul>
      </div>
    )
  },
  architecture: {
    title: "System Architecture",
    icon: <Layout className="w-5 h-5" />,
    content: (
      <div className="space-y-6 text-text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text-main mb-4">Under the Hood</h2>
        <p>
          The platform is built on modern web primitives for maximum performance and a native feel.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="bg-panel border border-glass-border p-5 rounded-xl">
            <h4 className="font-bold text-text-main mb-2">Frontend Framework</h4>
            <p className="text-sm">React 19 + Vite for lighting fast HMR and optimized production builds.</p>
          </div>
          <div className="bg-panel border border-glass-border p-5 rounded-xl">
            <h4 className="font-bold text-text-main mb-2">State Management</h4>
            <p className="text-sm">Zustand for global OS state, window management, and theme synchronization.</p>
          </div>
          <div className="bg-panel border border-glass-border p-5 rounded-xl">
            <h4 className="font-bold text-text-main mb-2">Editor Engine</h4>
            <p className="text-sm">Monaco Editor (VS Code core) for syntax highlighting and intelligent completions.</p>
          </div>
          <div className="bg-panel border border-glass-border p-5 rounded-xl">
            <h4 className="font-bold text-text-main mb-2">Persistence</h4>
            <p className="text-sm">LocalForage wrapping IndexedDB for robust offline file storage.</p>
          </div>
        </div>
      </div>
    )
  },
  apiReference: {
    title: "Agent API Reference",
    icon: <Code className="w-5 h-5" />,
    content: (
      <div className="space-y-6 text-text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text-main mb-4">Communicating with Agents</h2>
        <p>
          You can programmatically spawn and interact with agents using the Neuro SDK.
        </p>
        <div className="bg-bg-dark border border-glass-border rounded-xl overflow-hidden my-6">
          <div className="bg-panel px-4 py-2 border-b border-glass-border flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm font-mono text-neon-blue">
{`import { Agent } from 'neuro-agents-sdk';

const coder = new Agent('AutoCoder Pro');

// Send a task to the agent
coder.instruct({
  task: 'Create a responsive navigation bar',
  context: ['/src/App.jsx'],
  output: '/src/components/Nav.jsx'
});

coder.on('complete', (files) => {
  console.log('Component generated:', files);
});`}
            </code>
          </pre>
        </div>
      </div>
    )
  },
  pluginSdk: {
    title: "Plugin SDK",
    icon: <Puzzle className="w-5 h-5" />,
    content: (
      <div className="space-y-6 text-text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text-main mb-4">Building Plugins</h2>
        <p>
          Extend NeuroOS by building your own custom agents, themes, and shell commands.
        </p>
        <h3 className="text-xl font-bold text-text-main mt-8 mb-4">Creating a custom theme</h3>
        <p>Themes are defined using standard CSS variables and injected into the document root.</p>
        <div className="bg-bg-dark border border-glass-border rounded-xl p-4 my-4 font-mono text-sm text-neon-blue">
          {`neuro-cli create-theme my-dark-theme`}
        </div>
      </div>
    )
  },
  cliTool: {
    title: "CLI Tool",
    icon: <Terminal className="w-5 h-5" />,
    content: (
      <div className="space-y-6 text-text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text-main mb-4">Command Line Interface</h2>
        <p>
          The `neuro-cli` tool allows you to manage agents, deploy configurations, and monitor system health from your local terminal.
        </p>
        <div className="bg-bg-dark border border-glass-border rounded-xl p-4 my-4 font-mono text-sm text-neon-blue">
          $ npm install -g neuro-cli<br/><br/>
          $ neuro login<br/>
          $ neuro agent deploy ./my-agent-config.json
        </div>
      </div>
    )
  }
};

const Docs = () => {
  const [activeTab, setActiveTab] = useState('gettingStarted');
  const theme = useOsStore(state => state.theme);

  return (
    <div className={`min-h-screen w-full bg-bg-dark text-text-main flex flex-col theme-${theme}`}>
      <Navbar />
      
      <main className="flex-1 pt-20 flex flex-col md:flex-row">
        {/* Mobile Category Dropdown / Scroll Bar */}
        <div className="md:hidden border-b border-glass-border bg-panel px-4 py-3 overflow-x-auto flex gap-2">
          {Object.keys(docsContent).map(key => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                activeTab === key
                  ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                  : 'text-text-muted hover:text-text-main bg-glass'
              }`}
            >
              {docsContent[key].icon}
              {docsContent[key].title}
            </button>
          ))}
        </div>

        {/* Sidebar (Desktop) */}
        <aside className="w-72 bg-panel border-r border-glass-border hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20">
          <div className="p-6">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Documentation</h3>
            <nav className="space-y-2">
              {Object.keys(docsContent).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === key 
                      ? 'bg-neon-blue/10 text-neon-blue' 
                      : 'text-text-muted hover:text-text-main hover:bg-glass'
                  }`}
                >
                  {docsContent[key].icon}
                  {docsContent[key].title}
                </button>
              ))}
            </nav>
            
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 mt-10">Resources</h3>
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('apiReference')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'apiReference' 
                    ? 'bg-neon-blue/10 text-neon-blue' 
                    : 'text-text-muted hover:text-text-main hover:bg-glass'
                }`}
              >
                <Book className="w-5 h-5" />
                API Reference
              </button>
              <button 
                onClick={() => setActiveTab('pluginSdk')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'pluginSdk' 
                    ? 'bg-neon-blue/10 text-neon-blue' 
                    : 'text-text-muted hover:text-text-main hover:bg-glass'
                }`}
              >
                <Puzzle className="w-5 h-5" />
                Plugin SDK
              </button>
              <button 
                onClick={() => setActiveTab('cliTool')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === 'cliTool' 
                    ? 'bg-neon-blue/10 text-neon-blue' 
                    : 'text-text-muted hover:text-text-main hover:bg-glass'
                }`}
              >
                <Terminal className="w-5 h-5" />
                CLI Tool
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {docsContent[activeTab].content}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Docs;
