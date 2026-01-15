
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hello! I am your Cirq Quantum Assistant. How can I help you understand the pipeline today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const response = await geminiService.askQuantumQuestion(input);
    const assistantMessage: ChatMessage = { role: 'assistant', content: response, timestamp: Date.now() };
    
    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden">
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Quantum AI</h3>
            <p className="text-[10px] text-cyan-400 animate-pulse">Powered by Gemini</p>
          </div>
        </div>
        <Sparkles className="w-4 h-4 text-purple-400" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 text-sm flex space-x-2 ${
              msg.role === 'user' 
                ? 'bg-cyan-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              {msg.role === 'assistant' && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
              <span>{msg.content}</span>
              {msg.role === 'user' && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none p-3 text-sm flex items-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Processing entanglement...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/40">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about VQE, QPUs, or Cirq gates..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-4 pr-12 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="absolute right-2 top-1.5 p-1 text-slate-400 hover:text-cyan-400 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
