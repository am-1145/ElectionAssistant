import React, { useState } from 'react';
import { quizData, translations } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { Award, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuizComponent() {
  const { language } = useAppContext();
  const t = translations[language];

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return; 
    setSelectedOption(option);
    
    const isCorrect = option === quizData[currentQ].answer;
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQ + 1 < quizData.length) {
        setCurrentQ(prev => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{t.quiz_title}</h2>
      
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        {showResult ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full mb-4">
              <Award size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Completed!</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              You scored {score} out of {quizData.length}
            </p>
            {score === quizData.length ? (
              <p className="text-green-600 dark:text-green-400 font-medium mb-6">Perfect Score! You are an Election Expert 🌟</p>
            ) : (
              <p className="text-primary dark:text-blue-400 font-medium mb-6">Great effort! Review the guides to learn more.</p>
            )}
            <button 
              onClick={resetQuiz}
              className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors focus-ring"
            >
              Retake Quiz
            </button>
          </motion.div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Question {currentQ + 1} of {quizData.length}
              </span>
              <span className="text-sm font-medium bg-blue-100 text-primary px-3 py-1 rounded-full">
                Score: {score}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
              {quizData[currentQ].question}
            </h3>

            <div className="space-y-3">
              {quizData[currentQ].options.map((option, idx) => {
                let btnStyle = 'border-gray-200 dark:border-slate-600 hover:border-primary hover:bg-blue-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200';
                let Icon = null;

                if (selectedOption !== null) {
                  const isCorrectAnswer = option === quizData[currentQ].answer;
                  const isSelected = option === selectedOption;

                  if (isCorrectAnswer) {
                    btnStyle = 'border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400';
                    Icon = <CheckCircle className="text-green-500 dark:text-green-400" size={20} />;
                  } else if (isSelected) {
                    btnStyle = 'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400';
                    Icon = <XCircle className="text-red-500 dark:text-red-400" size={20} />;
                  } else {
                    btnStyle = 'border-gray-200 opacity-50 dark:border-slate-700 dark:text-gray-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleOptionClick(option)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-colors focus-ring ${btnStyle}`}
                  >
                    <span className="font-medium">{option}</span>
                    {Icon}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
