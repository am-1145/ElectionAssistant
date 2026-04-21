import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineData, translations } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';

export default function Timeline() {
  const { language } = useAppContext();
  const t = translations[language];
  const [expandedId, setExpandedId] = useState(null);

  // We are currently in November 2024 (e.g. stage 3 or 4) depending on the date,
  // Let's just highlight stage 4 as "upcoming"
  const currentStageId = 4;

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <CalendarDays className="text-primary" size={24} />
        <h2 className="text-2xl font-bold">{t.timeline_title}</h2>
      </div>

      <div className="space-y-4">
        {timelineData.map((item) => {
          const isExpanded = expandedId === item.id;
          const isPast = item.id < currentStageId;
          const isCurrent = item.id === currentStageId;

          return (
            <motion.div 
              key={item.id}
              layout
              className={`bg-white rounded-xl shadow-sm border ${
                isCurrent ? 'border-primary ring-1 ring-primary' : 'border-gray-200'
              } overflow-hidden`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left focus-ring"
                onClick={() => toggleExpand(item.id)}
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                    isPast ? 'bg-gray-100 text-gray-500' : 
                    isCurrent ? 'bg-primary text-white' : 'bg-blue-50 text-primary'
                  }`}>
                    {item.id}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.stage}</h3>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
                <div>
                  {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 pt-1 border-t border-gray-100"
                  >
                    <div className="pl-14">
                      <p className="text-gray-700 mb-3">{item.description}</p>
                      <div className="bg-blue-50 p-3 rounded-lg flex gap-2">
                        <span className="font-semibold text-primary block">Action:</span>
                        <span className="text-blue-900">{item.action}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
