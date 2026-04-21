import React, { useState } from 'react';
import { User, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DigitalVoterID() {
  const [details, setDetails] = useState({ name: '', dob: '', idNum: '' });
  const [generated, setGenerated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(details.name) {
      setGenerated(true);
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Your Digital Voter ID</h2>
      
      {!generated ? (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 max-w-md mx-auto space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Create your mock digital wallet card to represent your official identity.</p>
          <input 
            type="text" required placeholder="Full Name" 
            value={details.name} onChange={e => setDetails({...details, name: e.target.value})}
            className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <input 
            type="date" required 
            value={details.dob} onChange={e => setDetails({...details, dob: e.target.value})}
            className="w-full p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button type="submit" className="w-full bg-primary hover:bg-blue-700 transition-colors text-white py-3 rounded-lg font-bold shadow-md">
            Generate Digital Pass
          </button>
        </form>
      ) : (
        <div className="flex justify-center" style={{ perspective: '1000px' }}>
          <motion.div 
            initial={{ rotateY: 180, scale: 0.8, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="w-full max-w-sm h-56 bg-gradient-to-tr from-blue-600 to-indigo-800 rounded-2xl shadow-2xl overflow-hidden relative text-white border border-white/20 p-6 flex flex-col justify-between cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Hologram / Glass effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl -ml-5 -mb-5 pointer-events-none"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-2">
                <Shield size={24} className="text-yellow-400" />
                <span className="font-bold tracking-widest text-xs sm:text-sm uppercase text-blue-100">National Voter</span>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded text-xs backdrop-blur-md font-mono border border-white/10 shadow-sm">
                {details.idNum || "A1X-9988-V"}
              </div>
            </div>

            <div className="flex items-end justify-between relative z-10 w-full">
              <div className="truncate pr-4">
                <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Citizen Name</p>
                <p className="text-xl sm:text-2xl font-bold tracking-wide truncate">{details.name.toUpperCase()}</p>
                <p className="text-sm text-blue-100 mt-1 font-mono">DOB: {details.dob || "XX-XX-XXXX"}</p>
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                <User className="text-white/80 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
