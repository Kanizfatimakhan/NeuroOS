import { create } from 'zustand';
import localforage from 'localforage';

const defaultSize = { width: 800, height: 500 };
const defaultPos = { x: 100, y: 50 };

let maxZIndex = 10;

const useOsStore = create((set) => ({
  isBooted: false,
  setBooted: (status) => set({ isBooted: status }),
  
  // Auth state
  isAuthenticated: false,
  user: null,
  hasSeenOnboarding: false,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
  updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
  completeOnboarding: () => set({ hasSeenOnboarding: true }),
  
  // AI Keys
  geminiApiKey: localStorage.getItem('neuroos_gemini_key') || '',
  setGeminiApiKey: (key) => {
    localStorage.setItem('neuroos_gemini_key', key);
    set({ geminiApiKey: key });
  },
  
  // Theme state
  theme: localStorage.getItem('neuroos_theme') || 'dark', // 'dark', 'vision-light', 'neon', 'cyberpunk'
  setTheme: (theme) => {
    localStorage.setItem('neuroos_theme', theme);
    set({ theme });
  },

  // Virtual File System (VFS)
  fileSystem: {}, // Will be loaded from IndexedDB
  
  initFileSystem: async () => {
    try {
      const savedFS = await localforage.getItem('neuroos_vfs');
      if (savedFS) {
        set({ fileSystem: savedFS });
      } else {
        // Load defaults if empty
        const defaultFS = {
          'home': { type: 'folder', name: 'home', children: ['projects', 'documents', 'readme.txt'] },
          'projects': { type: 'folder', name: 'projects', children: ['neuroos'] },
          'neuroos': { type: 'folder', name: 'neuroos', children: ['index.js', 'package.json'] },
          'documents': { type: 'folder', name: 'documents', children: ['notes.txt'] },
          'readme.txt': { type: 'file', name: 'readme.txt', content: 'Welcome to NeuroAgents.\nThis is your multi-agent workspace.' },
          'notes.txt': { type: 'file', name: 'notes.txt', content: 'TODO: Write advanced prompts here.' },
          'index.js': { type: 'file', name: 'index.js', content: 'console.log("NeuroAgents Initialized");\n' },
          'package.json': { type: 'file', name: 'package.json', content: '{\n  "name": "neuroos",\n  "version": "1.0.0"\n}' }
        };
        set({ fileSystem: defaultFS });
        await localforage.setItem('neuroos_vfs', defaultFS);
      }
    } catch (err) {
      console.error("Error initializing file system", err);
    }
  },
  
  updateFileContent: async (fileId, newContent) => {
    set((state) => {
      const newFS = {
        ...state.fileSystem,
        [fileId]: { ...state.fileSystem[fileId], content: newContent }
      };
      // Persist to localforage asynchronously
      localforage.setItem('neuroos_vfs', newFS).catch(console.error);
      return { fileSystem: newFS };
    });
  },

  currentFileInEditor: null,
  openFileInEditor: (fileId) => set((state) => {
    return { currentFileInEditor: fileId };
  }),
  
  apps: [
    { id: 'omni-agent', name: 'Omni AI (All-in-One)', icon: 'Sparkles' },
    { id: 'live-preview', name: 'App Runner', icon: 'Play' },
    { id: 'code-editor', name: 'PromptLab', icon: 'FileCode' },
    { id: 'file-explorer', name: 'File Explorer', icon: 'FolderOpen' },
    { id: 'project-manager', name: 'Task Board', icon: 'FolderKanban' },
    { id: 'terminal', name: 'System Terminal', icon: 'Terminal' },
    { id: 'orchestrator', name: 'AI Studio', icon: 'Zap' },
    { id: 'coder-agent', name: 'Coder AI', icon: 'Code2' },
    { id: 'research-agent', name: 'Researcher AI', icon: 'Globe' },
    { id: 'settings', name: 'Workspace Settings', icon: 'Settings' },
    { id: 'onboarding', name: 'Welcome to NeuroOS', icon: 'Bot', hidden: true }
  ],
  
  installedAgentIds: [],
  installAgent: (agent) => set((state) => {
    const agentId = `custom-agent-${agent.id}`;
    if (state.apps.some(a => a.id === agentId)) {
      return state;
    }
    const newApp = {
      id: agentId,
      name: agent.name,
      icon: 'Bot',
      description: agent.description,
      isCustomAgent: true,
      category: agent.category
    };
    return {
      apps: [...state.apps, newApp],
      installedAgentIds: [...state.installedAgentIds, agent.id]
    };
  }),

  openWindows: [], 
  activeWindow: null,
  
  openWindow: (appId) => set((state) => {
    const existing = state.openWindows.find(w => w.id === appId);
    if (existing) {
      maxZIndex++;
      return {
        openWindows: state.openWindows.map(w => w.id === appId ? { ...w, minimized: false, zIndex: maxZIndex } : w),
        activeWindow: appId
      };
    }

    maxZIndex++;
    const app = state.apps.find(a => a.id === appId) || {
      id: appId,
      name: appId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      icon: 'FileText'
    };
    
    // Calculate centered position
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 768;
    const w = defaultSize.width;
    const h = defaultSize.height;
    
    const centerX = Math.max(0, (screenW - 64 - w) / 2); // 64 is sidebar width
    const centerY = Math.max(0, (screenH - h) / 2);
    
    const offset = (state.openWindows.length % 5) * 30; // Prevent exact overlap
    
    const newWindow = {
      id: appId,
      title: app.name,
      icon: app.icon,
      position: { x: centerX + offset, y: centerY + offset },
      size: { ...defaultSize },
      minimized: false,
      maximized: false,
      zIndex: maxZIndex
    };

    return {
      openWindows: [...state.openWindows, newWindow],
      activeWindow: appId,
      // If opening code editor from file explorer, this keeps the file open
      currentFileInEditor: state.currentFileInEditor
    };
  }),
  
  closeWindow: (appId) => set((state) => ({
    openWindows: state.openWindows.filter(w => w.id !== appId),
    activeWindow: state.activeWindow === appId ? null : state.activeWindow
  })),

  minimizeWindow: (appId) => set((state) => ({
    openWindows: state.openWindows.map(w => 
      w.id === appId ? { ...w, minimized: true } : w
    ),
    activeWindow: state.activeWindow === appId ? null : state.activeWindow
  })),

  maximizeWindow: (appId) => set((state) => ({
    openWindows: state.openWindows.map(w => 
      w.id === appId ? { ...w, maximized: !w.maximized } : w
    ),
    activeWindow: appId
  })),

  restoreWindow: (appId) => set((state) => {
    maxZIndex++;
    return {
      openWindows: state.openWindows.map(w => 
        w.id === appId ? { ...w, minimized: false, zIndex: maxZIndex } : w
      ),
      activeWindow: appId
    };
  }),
  
  focusWindow: (appId) => set((state) => {
    if (state.activeWindow === appId) return {};
    maxZIndex++;
    return {
      openWindows: state.openWindows.map(w => w.id === appId ? { ...w, zIndex: maxZIndex } : w),
      activeWindow: appId
    };
  }),

  updateWindowPosition: (appId, position) => set((state) => ({
    openWindows: state.openWindows.map(w => w.id === appId ? { ...w, position } : w)
  })),

  updateWindowSize: (appId, size) => set((state) => ({
    openWindows: state.openWindows.map(w => w.id === appId ? { ...w, size } : w)
  })),
  
  isStartMenuOpen: false,
  toggleStartMenu: () => set((state) => ({ isStartMenuOpen: !state.isStartMenuOpen })),
  closeStartMenu: () => set({ isStartMenuOpen: false })
}));

export default useOsStore;
