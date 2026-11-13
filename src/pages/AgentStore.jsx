import React, { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { motion } from 'framer-motion';
import { Search, Download, Star, Code, PenTool, Database, Server, TerminalSquare, MessageSquare, Check, ExternalLink } from 'lucide-react';
import useOsStore from '../store/osStore';
import { useNavigate } from 'react-router-dom';

const agents = [
  {
    id: 1,
    name: "AutoCoder Pro",
    author: "NeuroAgents Inc",
    category: "Development",
    icon: <Code className="w-8 h-8 text-neon-blue" />,
    rating: 4.9,
    downloads: "125k",
    description: "Advanced AI programmer that writes, refactors, and tests code autonomously within your workspace.",
    tags: ["React", "Python", "Node.js"]
  },
  {
    id: 2,
    name: "DesignSystem UX",
    author: "CreativeLabs",
    category: "Design",
    icon: <PenTool className="w-8 h-8 text-neon-purple" />,
    rating: 4.7,
    downloads: "89k",
    description: "Generates UI components, color palettes, and CSS architectures from natural language descriptions.",
    tags: ["CSS", "Figma", "UI/UX"]
  },
  {
    id: 3,
    name: "Data Analyst Bot",
    author: "NeuroAgents Inc",
    category: "Data",
    icon: <Database className="w-8 h-8 text-neon-blue" />,
    rating: 4.8,
    downloads: "210k",
    description: "Connects to your databases, runs queries, and visualizes data instantly on the shared canvas.",
    tags: ["SQL", "Pandas", "Charts"]
  },
  {
    id: 4,
    name: "DevOps Deployer",
    author: "CloudMasters",
    category: "DevOps",
    icon: <Server className="w-8 h-8 text-neon-purple" />,
    rating: 4.6,
    downloads: "45k",
    description: "Manages Docker containers, CI/CD pipelines, and cloud deployments from the NeuroOS terminal.",
    tags: ["Docker", "AWS", "CI/CD"]
  },
  {
    id: 5,
    name: "Terminal Guru",
    author: "ShellHackers",
    category: "Development",
    icon: <TerminalSquare className="w-8 h-8 text-neon-blue" />,
    rating: 4.9,
    downloads: "320k",
    description: "An expert at shell scripting, system administration, and optimizing your local environment.",
    tags: ["Bash", "Linux", "SysAdmin"]
  },
  {
    id: 6,
    name: "Copywriter AI",
    author: "ContentGen",
    category: "Content",
    icon: <MessageSquare className="w-8 h-8 text-neon-purple" />,
    rating: 4.5,
    downloads: "150k",
    description: "Writes marketing copy, documentation, and blog posts directly into your text editor apps.",
    tags: ["Writing", "SEO", "Marketing"]
  }
];

const AgentStore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [installingId, setInstallingId] = useState(null);
  const navigate = useNavigate();
  const { theme, installAgent, installedAgentIds, openWindow } = useOsStore();

  const categories = ["All", "Development", "Design", "Data", "DevOps", "Content"];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || agent.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstall = (agent) => {
    const isAlreadyInstalled = installedAgentIds?.includes(agent.id);
    if (isAlreadyInstalled) {
      openWindow(`custom-agent-${agent.id}`);
      navigate('/os');
      return;
    }
    setInstallingId(agent.id);
    setTimeout(() => {
      installAgent(agent);
      setInstallingId(null);
      openWindow(`custom-agent-${agent.id}`);
      navigate('/os');
    }, 1200);
  };

  return (
    <div className={`min-h-screen w-full bg-bg-dark text-text-main overflow-x-hidden flex flex-col theme-${theme}`}>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-neon-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">NeuroAgents Store</h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">Discover and install specialized AI agents to supercharge your workspace.</p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-text-muted" />
              </div>
              <input
                type="text"
                className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-12 pr-4 text-text-main placeholder-text-muted focus:outline-none focus:border-neon-blue/50 transition-colors shadow-sm"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === category 
                      ? 'bg-neon-blue text-bg-dark shadow-[0_0_15px_rgba(0,122,255,0.3)]' 
                      : 'bg-glass border border-glass-border text-text-muted hover:text-text-main hover:bg-panel'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-panel border border-glass-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-xl bg-glass border border-glass-border flex items-center justify-center group-hover:scale-110 transition-transform">
                    {agent.icon}
                  </div>
                  <div className="flex items-center bg-glass px-2 py-1 rounded-lg border border-glass-border">
                    <Star className="w-3.5 h-3.5 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="text-xs font-bold text-text-main">{agent.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-1 text-text-main">{agent.name}</h3>
                <p className="text-xs text-text-muted mb-4">by <span className="text-neon-blue">{agent.author}</span> • {agent.downloads} installs</p>
                
                <p className="text-sm text-text-muted mb-6 flex-1 leading-relaxed">
                  {agent.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-glass border border-glass-border rounded text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => handleInstall(agent)}
                  disabled={installingId === agent.id}
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    installingId === agent.id 
                      ? 'bg-glass text-text-muted border border-glass-border cursor-not-allowed' 
                      : installedAgentIds?.includes(agent.id)
                      ? 'bg-panel border border-neon-blue text-neon-blue hover:bg-neon-blue/10 cursor-pointer shadow-sm'
                      : 'bg-neon-blue text-bg-dark hover:brightness-110 cursor-pointer shadow-[0_4px_14px_0_rgba(0,122,255,0.2)]'
                  }`}
                >
                  {installingId === agent.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-text-muted border-t-transparent rounded-full animate-spin"></div>
                      Installing to OS...
                    </>
                  ) : installedAgentIds?.includes(agent.id) ? (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      Open in Workspace
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Install Agent
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
          
          {filteredAgents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">No agents found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgentStore;
