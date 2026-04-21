import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/mockData';
import { motion } from 'framer-motion';

const steps = [
  { id: 'eligibility', label: 'Check Eligibility' },
  { id: 'registered', label: 'Register to Vote' },
  { id: 'booth', label: 'Find Polling Booth' },
  { id: 'prepared', label: 'Voting Day Prep' }
];

export default function ProgressTracker() {
  const { language, progress, updateProgress, getProgressPercentage } = useAppContext();
  const t = translations[language];
  const percent = getProgressPercentage();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{t.progress_title}</h2>
        <span className="text-sm font-medium text-primary bg-blue-50 px-3 py-1 rounded-full">
          {percent}% {t.ready_to_vote}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, idx) => {
          const isComplete = progress[step.id];
          return (
            <motion.div 
              key={step.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                isComplete ? 'border-primary bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => updateProgress(step.id, !isComplete)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  updateProgress(step.id, !isComplete);
                }
              }}
              aria-pressed={isComplete}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`text-sm font-medium ${isComplete ? 'text-primary' : 'text-gray-600'}`}>
                  {idx + 1}. {step.label}
                </span>
                {isComplete ? (
                  <CheckCircle2 className="text-primary" size={20} />
                ) : (
                  <Circle className="text-gray-300" size={20} />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
