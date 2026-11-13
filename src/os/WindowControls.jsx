import React from 'react';
import { Minus, Square, X, Copy } from 'lucide-react';
import useOsStore from '../store/osStore';

const WindowControls = ({ appId, maximized }) => {
  const minimizeWindow = useOsStore(state => state.minimizeWindow);
  const maximizeWindow = useOsStore(state => state.maximizeWindow);
  const closeWindow = useOsStore(state => state.closeWindow);

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={() => minimizeWindow(appId)}
        className="w-4 h-4 flex items-center justify-center text-text-muted hover:text-text-main transition-colors cursor-pointer"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <button 
        onClick={() => maximizeWindow(appId)}
        className="w-4 h-4 flex items-center justify-center text-text-muted hover:text-text-main transition-colors cursor-pointer"
      >
        {maximized ? <Copy className="w-3.5 h-3.5" /> : <Square className="w-3 h-3" />}
      </button>
      <button 
        onClick={() => closeWindow(appId)}
        className="w-4 h-4 flex items-center justify-center text-text-muted hover:text-red-500 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default WindowControls;
