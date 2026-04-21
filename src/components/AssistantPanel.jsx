import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/mockData';

export default function AssistantPanel() {
  const { progress, language } = useAppContext();
  const t = translations[language];

  const getSuggestion = () => {
    if (!progress.eligibility) {
      return { title: 'First Step', text: "Start by checking if you're eligible to vote.", action: "Check Eligibility" };
    }
    if (!progress.registered) {
      return { title: 'Registration Due', text: "You need to register to vote before the deadline.", action: "Register Now" };
    }
    if (!progress.booth) {
      return { title: 'Find Your Booth', text: "Don't wait until the last day. Find your polling station now.", action: "Locate Booth" };
    }
    if (!progress.prepared) {
      return { title: 'Get Prepared', text: "Make sure you have your valid ID and slip ready.", action: "View Checklist" };
    }
    return { title: 'All Set!', text: "You are fully prepared for voting day. Awesome job!", action: null };
  };

  const suggestion = getSuggestion();

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-blue-100 dark:border-slate-700 mb-8 shadow-sm relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute -top-10 -right-10 text-blue-200/50 dark:text-slate-700/50">
        <Lightbulb size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="text-blue-600 dark:text-blue-400" size={24} />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.assistant_title}</h2>
        </div>
        
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl border border-white/50 dark:border-slate-600 shadow-sm max-w-2xl">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            {suggestion.title}
          </p>
          <p className="text-gray-800 dark:text-gray-200 text-lg mb-4">
            {suggestion.text}
          </p>
          
          {suggestion.action && (
            <button className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 focus:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors focus-ring">
              {suggestion.action} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
