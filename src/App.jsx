import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import VoiceButton from './components/VoiceButton';
import HomeScreen from './screens/HomeScreen';
import VisualBookingScreen from './screens/VisualBookingScreen';
import VisionTriageScreen from './screens/VisionTriageScreen';
import MedicalVaultScreen from './screens/MedicalVaultScreen';
import PersonaScreen from './screens/PersonaScreen';
import Footer from './components/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [currentLang, setCurrentLang] = useState('en-US');
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  return (
    <ErrorBoundary>
      <Router>
        {/* Phase 1: Splash Screen Animated Intro */}
        {showSplash && (
          <SplashScreen
            onFinish={() => setShowSplash(false)}
            onReplay={() => setShowSplash(true)}
          />
        )}

        {/* Main Web Application Container */}
        <div className={`min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col ${isMobilePreview ? 'py-6 px-4 bg-slate-900 flex items-center justify-center' : ''}`}>
          
          {/* Mobile Viewport Simulation Frame (when enabled) */}
          <div className={`w-full flex flex-col min-h-screen ${isMobilePreview ? 'max-w-md bg-slate-50 rounded-[40px] shadow-2xl overflow-hidden border-8 border-slate-800 relative' : ''}`}>
            
            {/* Header & Navigation */}
            <Navbar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
              onReplaySplash={() => setShowSplash(true)}
              isMobilePreview={isMobilePreview}
              setIsMobilePreview={setIsMobilePreview}
            />

            {/* Active Phase Content Area */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              {activeTab === 'home' && (
                <HomeScreen
                  currentLang={currentLang}
                  onNavigate={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'triage' && (
                <VisualBookingScreen currentLang={currentLang} />
              )}

              {activeTab === 'vision' && (
                <VisionTriageScreen currentLang={currentLang} />
              )}

              {activeTab === 'vault' && (
                <MedicalVaultScreen currentLang={currentLang} />
              )}

              {activeTab === 'persona' && (
                <PersonaScreen currentLang={currentLang} />
              )}
            </main>

            {/* Reusable Voice Engine Mic Floating Trigger */}
            <VoiceButton
              currentLang={currentLang}
              onLanguageChange={(lang) => setCurrentLang(lang)}
            />

            <Footer />

          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}
