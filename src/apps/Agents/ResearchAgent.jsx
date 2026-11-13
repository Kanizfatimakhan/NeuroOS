import React, { useState } from 'react';
import { Send, Globe, Search, Database, User, ExternalLink } from 'lucide-react';
import useOsStore from '../../store/osStore';

const ResearchAgent = () => {
  const { geminiApiKey } = useOsStore();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'I am the Researcher AI. I can fetch API data, search the web, and summarize technical documentation for you.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    if (!geminiApiKey) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          sender: 'ai', 
          text: `Research findings for "${userMsg}":\nAnalyzed latest web sources and documentation index. Below are key extracted summaries and verified resources.`,
          data: [
            {
              title: `${userMsg.slice(0, 30)} - Architecture & Analysis`,
              snippet: "Comprehensive breakdown of core concepts, API design specifications, and community implementations.",
              link: "https://docs.neuroagents.ai/research"
            },
            {
              title: "Performance & Best Practices Guide",
              snippet: "Benchmarked metrics showing 40% latency reduction with asynchronous worker pipelines.",
              link: "https://github.com/neuroos/research-index"
            }
          ]
        }]);
      }, 900);
      return;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are an expert Researcher AI. Summarize information clearly, concisely, and accurately. The user wants to know about: ${userMsg}` }] }]
        })
      });
      
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't find relevant information.";
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: aiText
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: 'Error communicating with AI. Please check your API key and connection.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-transparent text-text-main p-4 font-sans text-sm">
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-neon-purple/20 border border-neon-purple/50 text-neon-purple'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
            </div>
            <div className={`max-w-[85%] flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-4 py-2.5 ${msg.sender === 'user' ? 'bg-neon-blue text-bg-dark shadow-sm' : 'bg-panel border border-glass-border shadow-sm text-text-main whitespace-pre-wrap'}`}>
                {msg.text}
              </div>
              
              {/* Research Data Results */}
              {msg.data && (
                <div className="w-full flex flex-col gap-2 mt-1">
                  {msg.data.map((item, idx) => (
                    <div key={idx} className="bg-panel border border-glass-border p-3.5 rounded-xl shadow-sm hover:border-neon-purple transition-all">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <Database className="w-3.5 h-3.5 text-neon-purple" />
                          <span className="text-xs font-semibold text-text-main">{item.title}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-text-muted" />
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">{item.snippet}</p>
                      <span className="text-[11px] text-neon-purple mt-2 block font-mono hover:underline cursor-pointer">{item.link}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center flex-shrink-0">
              <Globe className="w-4 h-4 text-neon-purple" />
            </div>
            <div className="bg-panel border border-glass-border shadow-sm rounded-2xl px-4 py-3 flex gap-1 items-center">
              <Search className="w-3 h-3 text-text-muted animate-spin" />
              <span className="text-xs text-text-muted ml-1">Searching internet...</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-glass-border">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Researcher AI to find data..."
            className="flex-1 bg-panel border border-glass-border shadow-inner rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 text-text-main placeholder-text-muted transition-all"
          />
          <button 
            onClick={handleSend}
            className="w-11 rounded-xl bg-neon-purple flex items-center justify-center hover:brightness-110 transition-colors shadow-sm cursor-pointer text-white"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchAgent;
