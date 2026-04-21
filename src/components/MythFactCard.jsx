import React, { useState } from 'react';
import { mythsFactsData, translations } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function MythFactCard() {
  const { language } = useAppContext();
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFact, setShowFact] = useState(false);

  const handleNext = () => {
    setShowFact(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mythsFactsData.length);
    }, 200);
  };

  const currentItem = mythsFactsData[currentIndex];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{t.myths_title}</h2>
      
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="bg-white dark:bg-slate-800 min-h-[200px] border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-8 flex flex-col justify-center items-center text-center cursor-pointer relative"
          onClick={() => setShowFact(!showFact)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowFact(!showFact);
            }
          }}
          aria-label="Click to reveal fact or myth"
        >
          <div className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-gray-500 dark:text-gray-300 tracking-wider uppercase">
            Click to flip
          </div>

          <AnimatePresence mode="wait">
            {!showFact ? (
              <motion.div 
                key="myth"
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -90 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h3 className="text-red-500 font-bold mb-2 uppercase tracking-wide">Myth</h3>
                <p className="text-xl font-medium text-gray-800 dark:text-gray-100">"{currentItem.myth}"</p>
              </motion.div>
            ) : (
              <motion.div 
                key="fact"
                initial={{ opacity: 0, rotateX: 90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: -90 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h3 className="text-green-600 dark:text-green-400 font-bold mb-2 uppercase tracking-wide">Fact</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300">{currentItem.fact}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-4 flex justify-between items-center px-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {currentIndex + 1} of {mythsFactsData.length}
          </span>
          <button 
            onClick={handleNext}
            className="text-primary dark:text-blue-400 font-medium hover:underline focus-ring px-2 py-1 rounded"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
