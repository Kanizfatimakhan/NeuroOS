import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderKanban, Plus, CheckCircle2, Clock, Play, 
  Bot, Code2, Sparkles, Trash2, ArrowRight
} from 'lucide-react';
import useOsStore from '../../store/osStore';

const defaultTasks = [
  { id: 1, title: 'Implement Auth0 SSO & Roles', category: 'Security', stage: 'completed', agent: 'Coder AI' },
  { id: 2, title: 'Benchmark Multi-Agent Latency', category: 'Research', stage: 'in-progress', agent: 'Researcher AI' },
  { id: 3, title: 'Design Glassmorphic System Dock', category: 'Design', stage: 'in-progress', agent: 'Coder AI' },
  { id: 4, title: 'Setup WebAssembly Sandboxing', category: 'DevOps', stage: 'todo', agent: 'Coder AI' },
  { id: 5, title: 'Extract API Reference Schema', category: 'Documentation', stage: 'todo', agent: 'Researcher AI' },
];

const ProjectManager = () => {
  const [tasks, setTasks] = useState(defaultTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [targetAgent, setTargetAgent] = useState('Coder AI');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openWindow } = useOsStore();

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      category: targetAgent === 'Coder AI' ? 'Development' : 'Research',
      stage: 'todo',
      agent: targetAgent
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setIsModalOpen(false);
  };

  const moveTask = (id, newStage) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, stage: newStage } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const delegateToAgent = (task) => {
    if (task.agent === 'Coder AI') {
      openWindow('coder-agent');
    } else {
      openWindow('research-agent');
    }
  };

  const columns = [
    { id: 'todo', name: 'Backlog / Todo', color: 'border-amber-500/30 text-amber-400 bg-amber-500/10' },
    { id: 'in-progress', name: 'In Autonomous Progress', color: 'border-neon-blue/30 text-neon-blue bg-neon-blue/10' },
    { id: 'completed', name: 'Verified & Completed', color: 'border-green-500/30 text-green-400 bg-green-500/10' },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-transparent text-text-main p-6 font-sans select-none overflow-y-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-purple animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-neon-purple uppercase">Sprint Board</span>
          </div>
          <h2 className="text-2xl font-black text-text-main">Autonomous Task Hub</h2>
          <p className="text-text-muted text-xs">Track, manage, and dispatch missions directly to your autonomous agents.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-neon-blue text-bg-dark font-bold text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Mission</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-[450px]">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.stage === col.id);
          return (
            <div key={col.id} className="bg-panel/50 border border-glass-border rounded-2xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-glass-border">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${col.color}`}>
                  {col.name}
                </span>
                <span className="text-xs font-mono text-text-muted font-bold">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
                {colTasks.map(task => (
                  <motion.div 
                    key={task.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-panel border border-glass-border shadow-sm hover:border-text-main/40 transition-all flex flex-col gap-3 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-xs text-text-main leading-snug">
                        {task.title}
                      </h4>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity p-1 cursor-pointer"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-glass-border/50">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        {task.agent === 'Coder AI' ? <Code2 className="w-3.5 h-3.5 text-neon-blue" /> : <Bot className="w-3.5 h-3.5 text-neon-purple" />}
                        <span>{task.agent}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {col.id !== 'todo' && (
                          <button 
                            onClick={() => moveTask(task.id, col.id === 'completed' ? 'in-progress' : 'todo')}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-glass hover:bg-panel text-text-muted cursor-pointer"
                          >
                            ←
                          </button>
                        )}
                        {col.id !== 'completed' && (
                          <button 
                            onClick={() => moveTask(task.id, col.id === 'todo' ? 'in-progress' : 'completed')}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-glass hover:bg-panel text-text-muted cursor-pointer"
                          >
                            →
                          </button>
                        )}
                        <button 
                          onClick={() => delegateToAgent(task)}
                          title="Open responsible agent"
                          className="p-1 rounded bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue cursor-pointer transition-colors"
                        >
                          <Play className="w-3 h-3 fill-current" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {colTasks.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-glass-border rounded-xl flex items-center justify-center text-xs text-text-muted">
                    No missions in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-panel border border-glass-border p-6 rounded-2xl w-full max-w-sm shadow-2xl">
              <h3 className="font-bold text-base text-text-main mb-4">Dispatch New Task</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-text-muted mb-1 font-medium">Mission Title</label>
                  <input 
                    type="text" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. Build SQLite connector..."
                    className="w-full bg-glass border border-glass-border rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-neon-blue"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-muted mb-1 font-medium">Assign Agent</label>
                  <select 
                    value={targetAgent}
                    onChange={(e) => setTargetAgent(e.target.value)}
                    className="w-full bg-glass border border-glass-border rounded-xl px-3 py-2 text-sm text-text-main focus:outline-none focus:border-neon-blue cursor-pointer"
                  >
                    <option value="Coder AI" className="bg-slate-900 text-white">Coder AI</option>
                    <option value="Researcher AI" className="bg-slate-900 text-white">Researcher AI</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-text-muted hover:text-text-main cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddTask}
                  className="px-4 py-2 rounded-xl bg-neon-blue text-bg-dark font-bold text-xs hover:brightness-110 cursor-pointer shadow-md"
                >
                  Dispatch
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectManager;
