import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [highContrast, setHighContrast] = useState(false);
  
  // Progress tracking (from local storage)
  const [progress, setProgress] = useState({
    eligibility: false,
    registered: false,
    booth: false,
    prepared: false
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('electionAssistantProgress');
      if (saved) {
        setProgress(JSON.parse(saved));
      }
      const savedContrast = localStorage.getItem('electionAssistantContrast');
      if (savedContrast === 'true') {
        setHighContrast(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('electionAssistantProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('electionAssistantContrast', highContrast.toString());
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'es' : 'en');
  
  const updateProgress = (step, value) => {
    setProgress(prev => ({ ...prev, [step]: value }));
  };

  const getProgressPercentage = () => {
    const total = Object.keys(progress).length;
    const completed = Object.values(progress).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <AppContext.Provider value={{
      language, toggleLanguage,
      highContrast, toggleHighContrast,
      progress, updateProgress, getProgressPercentage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
