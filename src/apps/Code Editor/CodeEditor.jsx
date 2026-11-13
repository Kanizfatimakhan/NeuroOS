import React from 'react';
import Editor from '@monaco-editor/react';
import useOsStore from '../../store/osStore';
import { Play, Download, Sparkles, FileCode, Plus } from 'lucide-react';

const CodeEditor = () => {
  const { fileSystem, currentFileInEditor, updateFileContent, openFileInEditor, openWindow } = useOsStore();

  const file = currentFileInEditor ? fileSystem[currentFileInEditor] : null;

  // Get all files for the sidebar to simulate project structure
  const allFiles = Object.keys(fileSystem).filter(k => fileSystem[k].type === 'file');

  const handleDownload = () => {
    if (!file) return;
    const blob = new Blob([file.content || ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLanguage = (fileName = '') => {
    if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) return 'javascript';
    if (fileName.endsWith('.json')) return 'json';
    if (fileName.endsWith('.html')) return 'html';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.py')) return 'python';
    return 'plaintext';
  };

  return (
    <div className="h-full w-full flex bg-transparent text-text-main font-sans text-sm overflow-hidden select-none">
      {/* Sidebar */}
      <div className="w-52 border-r border-glass-border bg-panel/60 flex flex-col hidden md:flex">
        <div className="px-4 py-3 border-b border-glass-border flex items-center justify-between">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
            Workspace Files
          </span>
          <span className="text-[10px] font-mono text-neon-blue px-1.5 py-0.5 rounded bg-neon-blue/10">
            {allFiles.length} files
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {allFiles.map(fileId => (
            <div 
              key={fileId}
              onClick={() => openFileInEditor(fileId)}
              className={`px-3 py-2 rounded-xl text-xs font-mono cursor-pointer transition-all flex items-center justify-between ${
                currentFileInEditor === fileId 
                  ? 'bg-neon-blue/20 text-neon-blue font-bold border border-neon-blue/30' 
                  : 'hover:bg-glass text-text-muted hover:text-text-main'
              }`}
            >
              <span className="truncate">{fileSystem[fileId].name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]/90">
        {/* Top Action Bar */}
        <div className="h-11 flex bg-panel border-b border-glass-border items-center justify-between px-3">
          {/* Active Tab */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {file ? (
              <div className="px-3 py-1 bg-black/30 border border-glass-border rounded-lg text-text-main flex items-center gap-2 text-xs font-mono font-semibold shadow-inner">
                <span className="text-neon-blue">#</span>
                <span>{file.name}</span>
              </div>
            ) : (
              <div className="text-text-muted text-xs font-mono">
                No active document
              </div>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => openWindow('live-preview')}
              title="Execute Code in Live Sandbox Runner"
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Live</span>
            </button>

            {file && (
              <button 
                onClick={handleDownload}
                title="Download file to computer"
                className="p-1.5 rounded-lg bg-glass border border-glass-border hover:bg-panel text-text-muted hover:text-text-main transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Monaco Editor Container */}
        <div className="flex-1 flex flex-col relative bg-[#1e1e1e]">
          {file ? (
            <Editor
              height="100%"
              defaultLanguage={getLanguage(file.name)}
              language={getLanguage(file.name)}
              theme="vs-dark"
              value={file.content || ''}
              onChange={(value) => updateFileContent(currentFileInEditor, value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                wordWrap: 'on',
                lineHeight: 1.6,
                padding: { top: 12 },
                scrollBeyondLastLine: false,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                smoothScrolling: true,
                cursorBlinking: 'smooth'
              }}
            />
          ) : (
            <div className="m-auto text-text-muted flex flex-col items-center gap-3 p-6 text-center select-none">
              <div className="w-16 h-16 rounded-2xl bg-glass border border-glass-border flex items-center justify-center text-neon-blue mb-2 shadow-lg">
                <FileCode className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-text-main">PromptLab Editor Ready</h3>
              <p className="text-xs text-text-muted max-w-sm">
                Select a file from the workspace sidebar or command Coder AI to inject a generated component.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
