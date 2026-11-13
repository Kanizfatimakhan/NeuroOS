import React, { useState, useEffect } from 'react';
import useOsStore from '../../store/osStore';
import { Save, Download, RefreshCw } from 'lucide-react';

const SharedCanvas = () => {
  const { fileSystem, updateFileContent } = useOsStore();
  
  // We'll use 'index.js' as our primary shared canvas
  const canvasFileId = 'index.js';
  const file = fileSystem[canvasFileId];
  
  const [content, setContent] = useState(file?.content || '');
  const [isSaved, setIsSaved] = useState(true);

  // Sync state if store changes (e.g. CoderAgent injects code)
  useEffect(() => {
    if (file?.content !== content) {
      setContent(file?.content || '');
    }
  }, [file?.content]);

  const handleChange = (e) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    updateFileContent(canvasFileId, content);
    setIsSaved(true);
  };

  return (
    <div className="h-full w-full flex flex-col bg-transparent text-text-main font-sans text-sm">
      {/* Toolbar */}
      <div className="h-12 border-b border-glass-border bg-glass flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-panel border border-glass-border rounded text-xs font-semibold text-text-main shadow-sm">
            Workspace Canvas
          </div>
          {!isSaved && <span className="text-[10px] text-orange-500 font-medium ml-2 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Unsaved changes</span>}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSave}
            disabled={isSaved}
            className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${isSaved ? 'text-text-muted cursor-not-allowed' : 'text-neon-blue hover:bg-glass cursor-pointer'}`}
            title="Save to Memory"
          >
            <Save className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-md text-text-muted hover:bg-glass hover:text-text-main transition-colors cursor-pointer" title="Export">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 bg-transparent relative">
        {/* Line numbers mock */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-panel border-r border-glass-border py-4 text-right pr-2 text-text-muted text-xs font-mono select-none hidden sm:block">
          {content.split('\n').map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        
        <textarea
          className="w-full h-full bg-transparent text-text-main font-mono p-4 sm:pl-16 resize-none focus:outline-none leading-relaxed text-[13px]"
          value={content}
          onChange={handleChange}
          spellCheck="false"
          placeholder="Start typing or ask Coder AI to inject code here..."
        />
      </div>
    </div>
  );
};

export default SharedCanvas;
