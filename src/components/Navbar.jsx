import React from 'react';
import { Moon, Sun, Languages } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/mockData';

export default function Navbar() {
  const { language, toggleLanguage, highContrast, toggleHighContrast } = useAppContext();
  const t = translations[language];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-3 sm:px-6 lg:px-8 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {t.app_title}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-gray-100 flex items-center justify-center gap-2 text-sm font-medium focus-ring focus:ring-primary focus:outline-none"
            aria-label="Toggle language"
          >
            <Languages size={20} />
            <span className="hidden sm:inline">{language.toUpperCase()}</span>
          </button>
          
          <button 
            onClick={toggleHighContrast}
            className="p-2 rounded-full hover:bg-gray-100 focus-ring focus:ring-primary focus:outline-none"
            aria-label="Toggle high contrast mode"
            aria-pressed={highContrast}
          >
            {highContrast ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
