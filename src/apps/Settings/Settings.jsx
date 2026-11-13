import React, { useState } from 'react';
import useOsStore from '../../store/osStore';

const Settings = () => {
  const { theme, setTheme, user, updateUser, logout, geminiApiKey, setGeminiApiKey } = useOsStore();
  const [name, setName] = useState(user?.name || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [apiKey, setApiKey] = useState(geminiApiKey);

  const handleSaveName = () => {
    updateUser({ name });
    setIsEditingName(false);
  };

  return (
    <div className="h-full w-full flex flex-col bg-transparent text-text-main p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-text-main">System Settings</h2>
      
      <div className="space-y-6">
        {/* User Profile */}
        <div className="bg-panel p-5 rounded-xl border border-glass-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-neon-blue flex items-center justify-center text-2xl font-bold text-bg-dark">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="bg-glass border border-glass-border rounded-lg px-3 py-1 text-text-main outline-none focus:border-neon-blue"
                  />
                  <button onClick={handleSaveName} className="text-xs bg-neon-blue text-bg-dark px-2 py-1.5 rounded font-bold cursor-pointer hover:brightness-110">Save</button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-text-main">{user?.name || 'Demo User'}</h3>
                  <button onClick={() => setIsEditingName(true)} className="text-xs text-neon-blue hover:underline cursor-pointer">Edit</button>
                </div>
              )}
              <p className="text-sm text-text-muted">{user?.email || 'user@neuroagents.ai'}</p>
            </div>
          </div>
          <button 
            onClick={() => { logout(); window.location.href = '/'; }} 
            className="px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-colors cursor-pointer text-sm font-medium"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-panel p-5 rounded-xl border border-glass-border shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-green-400">AI Configuration (BYOK)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-muted mb-2">Google Gemini API Key</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-glass border border-glass-border rounded-lg px-4 py-2 text-text-main outline-none focus:border-neon-blue transition-colors"
                />
                <button 
                  onClick={() => setGeminiApiKey(apiKey)}
                  className="bg-neon-blue text-bg-dark px-4 py-2 rounded-lg font-bold hover:brightness-110 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
            <p className="text-xs text-text-muted">
              NeuroAgents runs entirely locally. Your API key is stored securely in your browser's local storage and is only sent directly to Google for inference. <br/>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-neon-blue hover:underline">Get a free Gemini API key here.</a>
            </p>
          </div>
        </div>

        <div className="bg-panel p-5 rounded-xl border border-glass-border shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-neon-blue">Personalization</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-muted mb-2">Theme</label>
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-glass border border-glass-border rounded-lg px-4 py-2 text-text-main outline-none cursor-pointer hover:border-neon-blue/50 transition-colors"
              >
                <option value="vision-light">Apple Vision Pro (Light Mode)</option>
                <option value="dark">Dark Enterprise (Dark Mode)</option>
                <option value="neon">Neon (Legacy Green/Blue)</option>
                <option value="cyberpunk">Cyberpunk (Legacy Yellow/Red)</option>
              </select>
            </div>
            <p className="text-xs text-gray-500">
              Note: Changing the theme instantly updates the global CSS variables and affects the entire OS UI.
            </p>
          </div>
        </div>

        <div className="bg-panel p-5 rounded-xl border border-glass-border shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-neon-purple">Keyboard Shortcuts</h3>
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="text-text-muted">Open AI Assistant</div>
            <div className="text-right"><kbd className="bg-glass px-2 py-1 rounded border border-glass-border">Ctrl + K</kbd></div>
            
            <div className="text-text-muted">Open Terminal</div>
            <div className="text-right"><kbd className="bg-glass px-2 py-1 rounded border border-glass-border">Ctrl + T</kbd></div>
            
            <div className="text-text-muted">Switch Windows</div>
            <div className="text-right"><kbd className="bg-glass px-2 py-1 rounded border border-glass-border">Alt + Tab</kbd></div>
            
            <div className="text-text-muted">Close Active Window</div>
            <div className="text-right"><kbd className="bg-glass px-2 py-1 rounded border border-glass-border">ESC</kbd></div>
          </div>
        </div>
        
        <div className="bg-panel p-5 rounded-xl border border-glass-border shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-text-main">System Information</h3>
          <div className="text-sm text-text-muted space-y-1">
            <p>OS Version: NeuroAgents v2.1.0</p>
            <p>Framework: React 19 + Vite</p>
            <p>Features: IndexedDB, Monaco Editor, Xterm.js, Multi-Agent Communication</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
