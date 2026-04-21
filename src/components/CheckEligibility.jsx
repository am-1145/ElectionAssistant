import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckEligibility() {
  const { progress, updateProgress } = useAppContext();
  const [age, setAge] = useState('');
  const [citizen, setCitizen] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);
    
    if (ageNum >= 18 && citizen) {
      setResult('eligible');
      updateProgress('eligibility', true);
    } else {
      setResult('ineligible');
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Check Eligibility</h2>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 md:p-8 max-w-2xl mx-auto">
        
        {result === 'eligible' && progress.eligibility ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-6"
          >
            <div className="inline-flex justify-center items-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You are Eligible!</h3>
            <p className="text-green-600 dark:text-green-400 font-medium">Your progress tracker has been updated.</p>
            <button 
              onClick={() => { setResult(null); setAge(''); setCitizen(false); }}
              className="mt-6 text-primary dark:text-blue-400 hover:underline font-medium"
            >
              Check Again
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleCheck} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What is your age?
              </label>
              <input 
                type="number" 
                required
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border border-gray-300 dark:border-slate-600 rounded-lg p-3 bg-gray-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. 24"
              />
            </div>
            
            <div className="flex items-start gap-3">
              <input 
                id="citizenCheck"
                type="checkbox" 
                checked={citizen}
                onChange={(e) => setCitizen(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer accent-primary"
              />
              <label htmlFor="citizenCheck" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                I confirm that I am a citizen of this country.
              </label>
            </div>

            <AnimatePresence>
              {result === 'ineligible' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg flex gap-3 text-sm"
                >
                  <AlertCircle size={20} className="shrink-0" />
                  <p>You must be at least 18 years old and a citizen to hold voting privileges.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={!age}
              className="w-full bg-primary hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors focus-ring"
            >
              Verify Status
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
