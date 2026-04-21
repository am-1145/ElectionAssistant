import React from 'react';
import { scenariosData, translations } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function ScenarioCards() {
  const { language } = useAppContext();
  const t = translations[language];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{t.scenarios_title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {scenariosData.map((scenario, index) => (
          <motion.div 
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg text-primary dark:text-blue-400 mb-3">
              {scenario.title}
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              {scenario.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
