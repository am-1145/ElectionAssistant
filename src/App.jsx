import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import ProgressTracker from './components/ProgressTracker';
import AssistantPanel from './components/AssistantPanel';
import Timeline from './components/Timeline';
import ScenarioCards from './components/ScenarioCards';
import MythFactCard from './components/MythFactCard';
import Checklist from './components/Checklist';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load heavy components for better performance
const QuizComponent = lazy(() => import('./components/QuizComponent'));
const VoiceAssistantMock = lazy(() => import('./components/VoiceAssistantMock'));
const CheckEligibility = lazy(() => import('./components/CheckEligibility'));
const PollingBoothLocator = lazy(() => import('./components/PollingBoothLocator'));
const DigitalVoterID = lazy(() => import('./components/DigitalVoterID'));

// Loading fallbacks
const SpinnerFallback = () => <div className="p-8 text-center text-blue-500 animate-pulse">Loading component...</div>;

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-200 text-gray-900 dark:text-gray-100">
        <Navbar />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 shrink-0">
          <div className="grid lg:grid-cols-12 gap-8 relative items-start">
            
            {/* Main Content Column (Left on Desktop) */}
            <div className="lg:col-span-8 space-y-12">
              <Suspense fallback={<SpinnerFallback />}>
                <CheckEligibility />
              </Suspense>
              <ProgressTracker />
              <Suspense fallback={<SpinnerFallback />}>
                <PollingBoothLocator />
              </Suspense>
              <Timeline />
              <ScenarioCards />
              <MythFactCard />
              <Checklist />
              <Suspense fallback={<SpinnerFallback />}>
                <QuizComponent />
              </Suspense>
            </div>

            {/* Sticky Sidebar (Right on Desktop) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
              <Suspense fallback={<SpinnerFallback />}>
                <DigitalVoterID />
              </Suspense>
              <AssistantPanel />
              <Suspense fallback={<SpinnerFallback />}>
                <VoiceAssistantMock />
              </Suspense>
            </div>
            
          </div>
        </main>

        <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-8 text-center text-sm text-gray-500 mt-auto">
          &copy; {new Date().getFullYear()} Election Assistant. Built for the citizens.
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
