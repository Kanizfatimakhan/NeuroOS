import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useOsStore from '../../store/osStore';

const AIAssistant = () => {
  const { openWindow, setTheme, geminiApiKey } = useOsStore();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am your NeuroOS AI Assistant. I can control the OS for you. Try saying "Open the terminal", "Open Coder AI", or "Switch to cyberpunk theme".' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const processCommand = async (text) => {
    const cmd = text.toLowerCase();
    
    if (cmd.includes('open') || cmd.includes('launch') || cmd.includes('start')) {
      if (cmd.includes('terminal')) {
        openWindow('terminal');
        return 'Opening System Terminal for you.';
      }
      if (cmd.includes('coder') || cmd.includes('code agent')) {
        openWindow('coder-agent');
        return 'Launching Coder AI.';
      }
      if (cmd.includes('research') || cmd.includes('search')) {
        openWindow('research-agent');
        return 'Launching Researcher AI.';
      }
      if (cmd.includes('canvas')) {
        openWindow('shared-canvas');
        return 'Opening Shared Canvas.';
      }
      if (cmd.includes('project') || cmd.includes('task')) {
        openWindow('project-manager');
        return 'Opening Project Manager.';
      }
      if (cmd.includes('explorer') || cmd.includes('file')) {
        openWindow('file-explorer');
        return 'Launching File Explorer.';
      }
      if (cmd.includes('code') || cmd.includes('editor') || cmd.includes('promptlab')) {
        openWindow('code-editor');
        return 'Starting PromptLab Code Editor.';
      }
      if (cmd.includes('setting')) {
        openWindow('settings');
        return 'Opening Workspace Settings.';
      }
    }
    
    if (cmd.includes('theme') || cmd.includes('switch') || cmd.includes('change')) {
      if (cmd.includes('cyberpunk')) {
        setTheme('cyberpunk');
        return 'Theme updated to Cyberpunk. Enjoy the neon vibes!';
      }
      if (cmd.includes('neon') || cmd.includes('blue')) {
        setTheme('neon');
        return 'Theme updated to Neon Blue.';
      }
      if (cmd.includes('dark')) {
        setTheme('dark');
        return 'Theme updated to Dark Mode.';
      }
      if (cmd.includes('light') || cmd.includes('vision')) {
        setTheme('vision-light');
        return 'Theme updated to Apple Vision Pro Light Mode.';
      }
    }

    if (cmd.includes('who are you') || cmd.includes('what is this') || cmd.includes('what can you do')) {
      return 'I am the NeuroOS System AI. I can launch apps, switch system themes, and coordinate your multi-agent workspace. You can also connect your Gemini API key in Settings for general reasoning!';
    }

    // If Gemini API Key is available, use real AI response
    if (geminiApiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are the built-in system AI of NeuroOS, a web desktop operating system. Answer concisely and informatively. User says: ${text}` }] }]
          })
        });
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (aiText) return aiText;
      } catch (e) {
        console.error(e);
      }
    }

    return "I am your NeuroOS Assistant. I can execute OS commands (e.g., 'Open Terminal', 'Open Coder AI', 'Switch to dark theme'). Configure your Gemini API key in Settings to unlock unrestricted AI conversations!";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsgText = input;
    const userMsg = { id: Date.now(), sender: 'user', text: userMsgText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const aiResponseText = await processCommand(userMsgText);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: aiResponseText 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: 'An error occurred while processing your command.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const suggestedPrompts = [
    "Open the terminal",
    "Open Coder AI",
    "Change theme to dark",
    "Open Project Manager"
  ];

  return (
    <div className="h-full w-full flex flex-col bg-transparent text-text-main p-4 font-sans text-sm">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-gradient-to-br from-neon-blue to-neon-purple text-white shadow-sm'}`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.sender === 'user' ? 'bg-neon-blue text-bg-dark font-medium shadow-sm' : 'bg-panel border border-glass-border text-text-main shadow-sm'}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-panel border border-glass-border shadow-sm rounded-2xl px-4 py-3 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 pt-3 border-t border-glass-border">
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {suggestedPrompts.map((prompt, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setInput(prompt);
                }}
                className="px-3 py-1.5 bg-glass rounded-full text-xs hover:bg-panel transition-colors border border-glass-border text-text-muted hover:text-text-main flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3 h-3 text-neon-blue" />
                {prompt}
              </button>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask NeuroOS AI to open apps or change settings..."
            className="flex-1 bg-panel border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 text-text-main placeholder-text-muted transition-all"
          />
          <button 
            onClick={handleSend}
            className="w-12 rounded-xl bg-neon-blue text-bg-dark flex items-center justify-center hover:brightness-110 shadow-sm transition-all cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
