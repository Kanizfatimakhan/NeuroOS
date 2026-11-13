import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { Bot, FolderOpen, Terminal as TerminalIcon, Code2, FolderKanban, Settings as SettingsIcon, FileCode, Zap, Play, Globe, FileText, Sparkles } from 'lucide-react';
import useOsStore from '../store/osStore';
import WindowControls from './WindowControls';
import CoderAgent from '../apps/Agents/CoderAgent';
import ResearchAgent from '../apps/Agents/ResearchAgent';
import SharedCanvas from '../apps/Canvas/SharedCanvas';
import Settings from '../apps/Settings/Settings';
import Onboarding from '../apps/Onboarding';
import FileExplorer from '../apps/File Explorer/FileExplorer';
import CodeEditor from '../apps/Code Editor/CodeEditor';
import TerminalApp from '../apps/Terminal/Terminal';
import AIAssistant from '../apps/AI Assistant/AIAssistant';
import ProjectManager from '../apps/Project Manager/ProjectManager';
import LivePreview from '../apps/Preview/LivePreview';
import Orchestrator from '../apps/Orchestrator/Orchestrator';
import OmniAgent from '../apps/Agents/OmniAgent';

const appComponents = {
  'omni-agent': OmniAgent,
  'orchestrator': Orchestrator,
  'live-preview': LivePreview,
  'ai-assistant': AIAssistant,
  'coder-agent': CoderAgent,
  'research-agent': ResearchAgent,
  'file-explorer': FileExplorer,
  'project-manager': ProjectManager,
  'shared-canvas': SharedCanvas,
  'code-editor': CodeEditor,
  'terminal': TerminalApp,
  'settings': Settings,
  'onboarding': Onboarding,
};

const iconMap = {
  Sparkles: Sparkles,
  Zap: Zap,
  Play: Play,
  Bot: Bot,
  FolderOpen: FolderOpen,
  Terminal: TerminalIcon,
  Code2: Code2,
  FolderKanban: FolderKanban,
  Settings: SettingsIcon,
  FileCode: FileCode,
  Globe: Globe,
  FileText: FileText
};

const Window = ({ windowData }) => {
  const { id, title, icon, position, size: storeSize, maximized, zIndex } = windowData;
  const focusWindow = useOsStore(state => state.focusWindow);
  const activeWindow = useOsStore(state => state.activeWindow);
  const maximizeWindow = useOsStore(state => state.maximizeWindow);
  const updateWindowSize = useOsStore(state => state.updateWindowSize);
  
  const IconComponent = iconMap[icon] || FolderOpen;
  const isActive = activeWindow === id;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActuallyMaximized = maximized || isMobile;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    disabled: isActuallyMaximized
  });

  const [localSize, setLocalSize] = useState(storeSize);
  const isResizing = useRef(false);

  // Sync with store if store changes from outside
  useEffect(() => {
    if (!isResizing.current) {
      setLocalSize(storeSize);
    }
  }, [storeSize]);

  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    focusWindow(id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = localSize.width;
    const startHeight = localSize.height;

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
      setLocalSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      isResizing.current = false;
      // Sync back to store
      setLocalSize((currSize) => {
        updateWindowSize(id, currSize);
        return currSize;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const AppComponent = appComponents[id];

  const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: `translate3d(${isActuallyMaximized ? 0 : position.x + (transform?.x || 0)}px, ${isActuallyMaximized ? 0 : position.y + (transform?.y || 0)}px, 0)`,
    width: isActuallyMaximized ? '100%' : localSize.width,
    height: isActuallyMaximized ? '100%' : localSize.height,
    zIndex: zIndex,
  };

  return (
    <motion.div
      ref={isActuallyMaximized ? null : setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className={`glass-panel flex flex-col overflow-hidden pointer-events-auto transition-[border-radius] ${
        isActive ? 'ring-2 ring-neon-blue shadow-lg' : 'opacity-95'
      } ${isActuallyMaximized ? 'rounded-none border-0' : 'rounded-2xl border'}`}
      onMouseDownCapture={() => focusWindow(id)}
    >
      {/* Title Bar */}
      <div 
        className={`h-11 bg-glass backdrop-blur-xl border-b border-glass-border flex items-center justify-between px-3 select-none transition-colors ${!isActuallyMaximized ? 'cursor-move' : ''} ${isActive ? 'bg-glass/90' : ''}`}
        onDoubleClick={() => !isMobile && maximizeWindow(id)}
        {...(isActuallyMaximized ? {} : listeners)}
        {...(isActuallyMaximized ? {} : attributes)}
      >
        <div className="flex items-center gap-2">
          <IconComponent className="w-4 h-4 text-neon-blue" />
          <span className="text-sm font-semibold text-text-main tracking-wide">{title}</span>
        </div>
        
        {/* Controls block drag */}
        <div onPointerDown={(e) => e.stopPropagation()}>
          <WindowControls appId={id} maximized={maximized} />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-transparent relative overflow-hidden flex flex-col">
        {AppComponent ? (
          <AppComponent windowData={windowData} />
        ) : (
          <CoderAgent windowData={windowData} />
        )}
      </div>
      
      {/* Real Resizer Handle */}
      {!isActuallyMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize bg-transparent z-50 flex items-end justify-end p-1 opacity-50 hover:opacity-100 transition-opacity"
          onMouseDown={handleResizeStart}
          onTouchStart={(e) => {
             // Optional: Handle touch resizing if needed, but mobile is auto-maximized so not strictly needed
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1L1 9M9 5L5 9M9 9H9.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default Window;
