import React, { useState } from 'react';
import { checklistData, translations } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

export default function Checklist() {
  const { language } = useAppContext();
  const t = translations[language];
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{t.checklist_title}</h2>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm max-w-2xl mx-auto">
        <ul className="space-y-4">
          {checklistData.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <li key={item.id} className="flex items-start gap-4">
                <input 
                  type="checkbox" 
                  id={`check-${item.id}`}
                  checked={isChecked}
                  onChange={() => toggleItem(item.id)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer accent-primary" 
                />
                <label 
                  htmlFor={`check-${item.id}`}
                  className={`text-lg cursor-pointer select-none transition-colors ${
                    isChecked ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {item.label}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
