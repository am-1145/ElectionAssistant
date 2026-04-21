// UI mock for voice assistant with matching engine
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Bot, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import stringSimilarity from 'string-similarity';
import { chatIntents } from '../data/mockData';

export default function VoiceAssistantMock() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I am your AI voting assistant. Ask me questions like 'Am I eligible?', 'Where do I register?', or 'Lost my ID'." }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    const userQuery = query.toLowerCase();
    setQuery('');

    // Simulate network delay
    setTimeout(() => {
      // Find intention
      let bestMatch = null;
      let highestScore = 0;

      for (const intent of chatIntents) {
        // match keywords directly
        const hasKeyword = intent.keywords.some(kw => userQuery.includes(kw.toLowerCase()));
        
        // fuzzy match against phrases
        const matchScores = stringSimilarity.findBestMatch(userQuery, intent.phrases || ["nothing matches this"]);
        const fuzzyScore = matchScores.bestMatch.rating;

        // Weights
        const currentScore = hasKeyword ? 0.6 + fuzzyScore : fuzzyScore;

        if (currentScore > highestScore && currentScore > 0.3) {
          highestScore = currentScore;
          bestMatch = intent;
        }
      }

      if (bestMatch) {
        setMessages(prev => [...prev, { role: 'assistant', text: bestMatch.answer, type: bestMatch.type, actionText: bestMatch.actionText }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: "I'm not quite sure about that. Try asking about your eligibility, polling booth, or voter ID." }]);
      }
    }, 600);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Ask Anything</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col h-[400px] max-w-2xl mx-auto relative">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-primary text-white' : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                }`}>
                  {msg.role === 'user' ? <span className="font-bold text-sm">Me</span> : <Bot size={18} />}
                </div>
                <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                  msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 
                  msg.type === 'emergency' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50 rounded-tl-none shadow-sm' :
                  'bg-white dark:bg-slate-800 dark:text-gray-200 border border-gray-200 dark:border-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.type === 'emergency' && <AlertTriangle className="inline-block mr-2 mb-1" size={16} />}
                  {msg.text}
                  {msg.actionText && (
                    <button className="block mt-2 bg-white dark:bg-slate-700 text-primary dark:text-blue-400 font-semibold px-3 py-1.5 rounded border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors pointer-events-none w-full text-left">
                      {msg.actionText}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-1" />
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
          <form onSubmit={handleSend} className="relative flex items-center">
            <button type="button" className="absolute left-3 text-gray-400 hover:text-primary transition-colors focus-ring rounded-full p-2">
              <Mic size={20} />
            </button>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Lost my voter ID, what now?"
              className="w-full bg-gray-100 dark:bg-slate-900 dark:text-white border-0 py-3 pl-12 pr-12 rounded-full focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button type="submit" disabled={!query.trim()} className="absolute right-3 bg-primary text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors focus-ring">
              <Send size={16} className="-ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
