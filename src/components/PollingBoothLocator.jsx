import React, { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const mockBooths = [
  { id: 1, name: "City High School", address: "123 Main St", distance: "0.8 miles", crowd: "Low" },
  { id: 2, name: "Downtown Community Center", address: "45 Broad Ave", distance: "1.2 miles", crowd: "Moderate" },
  { id: 3, name: "Westside Library", point: "78 Book Blvd", distance: "2.5 miles", crowd: "High" }
];

export default function PollingBoothLocator() {
  const { updateProgress } = useAppContext();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Simulate API search
    setResults(mockBooths);
    setSelected(null);
  };

  const handleSelect = (booth) => {
    setSelected(booth.id);
    updateProgress('booth', true);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Find Polling Booth</h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative flex items-center mb-8">
          <MapPin className="absolute left-4 text-gray-400" size={20} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter ZIP code or City name..."
            className="w-full border border-gray-300 dark:border-slate-600 rounded-full py-3 pr-24 pl-12 bg-gray-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button 
            type="submit"
            className="absolute right-2 bg-primary hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
          >
            Search
          </button>
        </form>

        {results && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {results.map((booth) => (
              <div 
                key={booth.id} 
                onClick={() => handleSelect(booth)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selected === booth.id 
                    ? 'border-primary bg-blue-50 dark:bg-blue-900/30' 
                    : 'border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{booth.name}</h3>
                  {selected === booth.id && <Navigation className="text-primary" size={18} />}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{booth.address || booth.point}</p>
                <div className="flex items-center gap-3 text-xs font-medium">
                  <span className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                    {booth.distance}
                  </span>
                  <span className={`px-2 py-1 rounded ${
                    booth.crowd === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    booth.crowd === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {booth.crowd} Crowd
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
