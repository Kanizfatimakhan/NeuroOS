import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, FileText, Search, ChevronRight, HardDrive, ArrowLeft, 
  Upload, Download, Plus, Trash2, Play, Code2, Check, X
} from 'lucide-react';
import useOsStore from '../../store/osStore';

const FileExplorer = () => {
  const { fileSystem, openFileInEditor, openWindow, updateFileContent } = useOsStore();
  const [currentPath, setCurrentPath] = useState(['home']);
  const [search, setSearch] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const fileInputRef = useRef(null);

  const currentFolderId = currentPath[currentPath.length - 1];
  const currentFolder = fileSystem[currentFolderId];

  const handleItemClick = (itemId) => {
    const item = fileSystem[itemId];
    if (!item) return;

    if (item.type === 'folder') {
      setCurrentPath([...currentPath, itemId]);
      setSelectedFile(null);
    } else {
      setSelectedFile(itemId);
    }
  };

  const handleDoubleClick = (itemId) => {
    const item = fileSystem[itemId];
    if (!item) return;
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, itemId]);
      setSelectedFile(null);
    } else {
      openFileInEditor(itemId);
      openWindow('code-editor');
    }
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedFile(null);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        updateFileContent(file.name, content);
        // Also add to current folder children if needed
        if (currentFolder && !currentFolder.children?.includes(file.name)) {
          currentFolder.children = [...(currentFolder.children || []), file.name];
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) return;
    const cleanName = newFileName.trim();
    updateFileContent(cleanName, `// Created in NeuroOS\nconsole.log("File: ${cleanName}");\n`);
    if (currentFolder && !currentFolder.children?.includes(cleanName)) {
      currentFolder.children = [...(currentFolder.children || []), cleanName];
    }
    setNewFileName('');
    setIsNewFileModalOpen(false);
  };

  const handleDownloadSingle = (fileId) => {
    const file = fileSystem[fileId];
    if (!file) return;
    const blob = new Blob([file.content || ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name || fileId;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    const allFiles = Object.keys(fileSystem)
      .filter(k => fileSystem[k].type === 'file')
      .map(k => ({ name: fileSystem[k].name, content: fileSystem[k].content }));
    
    const projectBundle = {
      project: 'NeuroOS Workspace',
      exportedAt: new Date().toISOString(),
      files: allFiles
    };

    const blob = new Blob([JSON.stringify(projectBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'neuro-workspace-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const displayedItems = search 
    ? Object.keys(fileSystem).filter(key => fileSystem[key].name.toLowerCase().includes(search.toLowerCase()))
    : currentFolder?.children || [];

  return (
    <div className="h-full w-full flex bg-transparent text-text-main font-sans text-sm select-none">
      {/* Sidebar */}
      <div className="w-52 border-r border-glass-border p-4 flex flex-col justify-between hidden md:flex bg-panel/40">
        <div className="space-y-4">
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider px-2">Storage</div>
          <div className="space-y-1">
            <button 
              onClick={() => { setCurrentPath(['home']); setSelectedFile(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all cursor-pointer text-xs font-medium ${
                currentPath.length === 1 ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30 font-bold' : 'hover:bg-glass text-text-muted hover:text-text-main'
              }`}
            >
              <HardDrive className="w-4 h-4" />
              <span>Virtual Disk (/home)</span>
            </button>
          </div>
        </div>

        {/* Global Storage Quick Actions */}
        <div className="space-y-2 pt-4 border-t border-glass-border">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-glass border border-glass-border hover:bg-panel text-xs text-text-main transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-neon-blue" />
            <span>Upload From PC</span>
          </button>
          <input 
            ref={fileInputRef} 
            type="file" 
            className="hidden" 
            onChange={handleFileUpload}
          />

          <button 
            onClick={handleDownloadAll}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-glass border border-glass-border hover:bg-panel text-xs text-text-main transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-neon-purple" />
            <span>Export Workspace</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Control Bar */}
        <div className="h-14 border-b border-glass-border flex items-center px-4 gap-3 bg-panel/30">
          <button 
            onClick={handleBack} 
            disabled={currentPath.length <= 1}
            className="p-2 hover:bg-glass rounded-xl disabled:opacity-20 cursor-pointer text-text-muted hover:text-text-main transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          {/* Breadcrumb */}
          <div className="flex items-center text-text-muted gap-1 text-xs font-mono whitespace-nowrap overflow-hidden">
            {currentPath.map((path, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 mx-0.5 opacity-50" />}
                <span 
                  className="hover:text-neon-blue cursor-pointer transition-colors font-semibold"
                  onClick={() => { setCurrentPath(currentPath.slice(0, index + 1)); setSelectedFile(null); }}
                >
                  {fileSystem[path]?.name || path}
                </span>
              </React.Fragment>
            ))}
          </div>

          <div className="flex-1"></div>

          {/* Action buttons */}
          <button 
            onClick={() => setIsNewFileModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-neon-blue text-bg-dark font-bold text-xs flex items-center gap-1.5 hover:brightness-110 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New File</span>
          </button>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-glass border border-glass-border rounded-xl pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-neon-blue w-28 sm:w-44 text-text-main transition-all"
            />
          </div>
        </div>

        {/* Files Grid View */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayedItems.map((itemId, idx) => {
              const item = fileSystem[itemId];
              if (!item) return null;
              const isSelected = selectedFile === itemId;

              return (
                <motion.div 
                  key={itemId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => handleItemClick(itemId)}
                  onDoubleClick={() => handleDoubleClick(itemId)}
                  className={`border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all cursor-pointer text-center group ${
                    isSelected 
                      ? 'bg-neon-blue/15 border-neon-blue shadow-[0_0_15px_rgba(0,122,255,0.2)]' 
                      : 'bg-panel/70 border-glass-border hover:border-text-main/40 hover:bg-panel'
                  }`}
                >
                  {item.type === 'folder' ? (
                    <Folder className="w-12 h-12 text-neon-blue group-hover:scale-105 transition-transform" />
                  ) : (
                    <FileText className="w-12 h-12 text-slate-400 group-hover:text-neon-purple group-hover:scale-105 transition-all" />
                  )}

                  <div className="w-full">
                    <h4 className="font-semibold text-xs text-text-main truncate">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-text-muted">
                      {item.type === 'folder' ? `${item.children?.length || 0} items` : `${(item.content || '').length} bytes`}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {displayedItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-text-muted">
              <Folder className="w-10 h-10 mb-2 opacity-30" />
              <span>Directory is empty</span>
            </div>
          )}
        </div>

        {/* Selected File Details Bar */}
        {selectedFile && fileSystem[selectedFile]?.type === 'file' && (
          <div className="h-14 border-t border-glass-border bg-panel px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-neon-purple" />
              <span className="text-xs font-bold text-text-main">{fileSystem[selectedFile].name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  openFileInEditor(selectedFile);
                  openWindow('code-editor');
                }}
                className="px-3 py-1.5 rounded-lg bg-glass border border-glass-border hover:bg-panel text-xs text-text-main flex items-center gap-1.5 cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-neon-blue" />
                <span>Open in Editor</span>
              </button>

              <button 
                onClick={() => {
                  openFileInEditor(selectedFile);
                  openWindow('live-preview');
                }}
                className="px-3 py-1.5 rounded-lg bg-glass border border-glass-border hover:bg-panel text-xs text-cyan-400 flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Live</span>
              </button>

              <button 
                onClick={() => handleDownloadSingle(selectedFile)}
                className="px-3 py-1.5 rounded-lg bg-neon-purple text-white text-xs font-bold flex items-center gap-1.5 hover:brightness-110 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New File Modal */}
      <AnimatePresence>
        {isNewFileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-panel border border-glass-border p-6 rounded-2xl w-full max-w-sm shadow-2xl">
              <h3 className="font-bold text-base text-text-main mb-3">Create New File</h3>
              <input 
                type="text" 
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
                placeholder="filename.js or script.py..."
                className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-neon-blue mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setIsNewFileModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-text-muted hover:text-text-main cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateFile}
                  className="px-4 py-2 rounded-xl bg-neon-blue text-bg-dark font-bold text-xs hover:brightness-110 cursor-pointer"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileExplorer;
