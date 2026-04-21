import React from 'react';
import Navbar from './components/Navbar';
import ProgressTracker from './components/ProgressTracker';
import AssistantPanel from './components/AssistantPanel';
import Timeline from './components/Timeline';
import ScenarioCards from './components/ScenarioCards';
import MythFactCard from './components/MythFactCard';
import Checklist from './components/Checklist';
import QuizComponent from './components/QuizComponent';
import VoiceAssistantMock from './components/VoiceAssistantMock';
import CheckEligibility from './components/CheckEligibility';
import PollingBoothLocator from './components/PollingBoothLocator';
import DigitalVoterID from './components/DigitalVoterID';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-200 text-gray-900 dark:text-gray-100">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 shrink-0">
        <div className="grid lg:grid-cols-12 gap-8 relative items-start">
          
          {/* Main Content Column (Left on Desktop) */}
          <div className="lg:col-span-8 space-y-12">
            <CheckEligibility />
            <ProgressTracker />
            <PollingBoothLocator />
            <Timeline />
            <ScenarioCards />
            <MythFactCard />
            <Checklist />
            <QuizComponent />
          </div>

          {/* Sticky Sidebar (Right on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            <DigitalVoterID />
            <AssistantPanel />
            <VoiceAssistantMock />
          </div>
          
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-8 text-center text-sm text-gray-500 mt-auto">
        &copy; {new Date().getFullYear()} Election Assistant. Built for the citizens.
      </footer>
    </div>
  );
}

export default App;
