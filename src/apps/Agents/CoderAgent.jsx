import React, { useState } from 'react';
import { Send, Bot, Code2, Sparkles, Copy, Check, User } from 'lucide-react';
import useOsStore from '../../store/osStore';

const CoderAgent = () => {
  const { fileSystem, currentFileInEditor, updateFileContent, geminiApiKey, openWindow } = useOsStore();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'I am your Coder AI. I can write React components, Tailwind styles, and complex algorithms. What should we build?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

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
          text: 'I am currently in mock mode. Here is a sample React component for your prompt. Configure your Google Gemini API Key in Settings to enable real-time generation!',
          code: `import React, { useState } from 'react';\n\nexport default function CustomCard() {\n  const [count, setCount] = useState(0);\n  return (\n    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white">\n      <h2 className="text-xl font-bold mb-2">Generated for: ${userMsg}</h2>\n      <p className="text-slate-400 mb-4">Autonomous component created by Coder AI.</p>\n      <button \n        onClick={() => setCount(c => c + 1)}\n        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-all"\n      >\n        Clicked {count} times\n      </button>\n    </div>\n  );\n}`
        }]);
      }, 800);
      return;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are an expert React and Tailwind developer. The user will ask you to write code. Provide a brief explanation, and always include exactly one markdown code block containing the full code for their request. User request: ${userMsg}` }] }]
        })
      });
      
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";
      
      const codeMatch = aiText.match(/```[\w]*\n([\s\S]*?)```/);
      const codeSnippet = codeMatch ? codeMatch[1].trim() : null;
      
      const cleanText = aiText.replace(/```[\w]*\n([\s\S]*?)```/g, '').trim();

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: cleanText || "Here is the code you requested:",
        code: codeSnippet
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

  const insertToCanvas = (code) => {
    if (currentFileInEditor && fileSystem[currentFileInEditor]) {
      const existing = fileSystem[currentFileInEditor].content || '';
      updateFileContent(currentFileInEditor, existing ? existing + '\n\n' + code : code);
    } else {
      const target = fileSystem['index.js'] ? 'index.js' : 'readme.txt';
      const existing = fileSystem[target]?.content || '';
      updateFileContent(target, existing ? existing + '\n\n' + code : code);
    }
    openWindow('code-editor');
  };

  const handleCopy = (code, id) => {
    navigator.clipboard?.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full w-full flex flex-col bg-transparent text-text-main p-4 font-sans text-sm">
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-glass border border-glass-border text-text-main'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
            </div>
            <div className={`max-w-[85%] flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-4 py-2.5 ${msg.sender === 'user' ? 'bg-neon-blue text-bg-dark shadow-sm' : 'bg-panel border border-glass-border shadow-sm text-text-main'}`}>
                {msg.text}
              </div>
              
              {/* Code Snippet Block */}
              {msg.code && (
                <div className="w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-gray-800 mt-1">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
                    <span className="text-xs text-gray-400 font-mono">React Component</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleCopy(msg.code, msg.id)}
                        className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        {copiedId === msg.id ? 'Copied' : 'Copy'}
                      </button>
                      <button 
                        onClick={() => insertToCanvas(msg.code)}
                        className="text-xs flex items-center gap-1.5 text-neon-blue hover:text-white transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        Send to Editor
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed">
                    {msg.code}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-glass border border-glass-border flex items-center justify-center flex-shrink-0">
              <Code2 className="w-4 h-4 text-text-muted" />
            </div>
            <div className="bg-panel border border-glass-border shadow-sm rounded-2xl px-4 py-3 flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
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
            placeholder="Ask Coder AI to write something..."
            className="flex-1 bg-panel border border-glass-border shadow-inner rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 text-text-main placeholder-text-muted transition-all"
          />
          <button 
            onClick={handleSend}
            className="w-11 rounded-xl bg-neon-blue flex items-center justify-center hover:brightness-110 transition-all shadow-sm cursor-pointer text-bg-dark"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoderAgent;
