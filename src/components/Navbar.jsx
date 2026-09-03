import React from 'react';
import { Heart, Activity, Globe, Sparkles, Smartphone, Monitor } from 'lucide-react';
import { languages, translations } from '../utils/localization';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentLang,
  setCurrentLang,
  onReplaySplash,
  isMobilePreview,
  setIsMobilePreview,
}) {
  const t = translations[currentLang] || translations['en-US'];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'triage', label: t.quickTriage },
    { id: 'vision', label: t.aiScan },
    { id: 'vault', label: t.drugChecker },
    { id: 'persona', label: 'Profile & QR' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md pink-glow group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 animate-pulse" fill="currentColor" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
              Life<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Line</span>
            </span>
            <span className="text-[10px] text-rose-500 font-bold block -mt-1 tracking-wider uppercase">
              Emergency & Triage
            </span>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Controls: Replay ECG, View Mode Toggle, Language Selector */}
        <div className="flex items-center gap-2">
          
          {/* Replay ECG Intro Button */}
          <button
            onClick={onReplaySplash}
            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all text-xs font-semibold flex items-center gap-1"
            title={t.replayIntro}
          >
            <Activity className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">ECG</span>
          </button>

          {/* Mobile Preview Frame Toggle Button */}
          <button
            onClick={() => setIsMobilePreview(!isMobilePreview)}
            className="hidden sm:flex p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all text-xs font-semibold items-center gap-1 border border-slate-200"
            title="Toggle Mobile View Simulation"
          >
            {isMobilePreview ? <Monitor className="w-4 h-4 text-rose-500" /> : <Smartphone className="w-4 h-4 text-rose-500" />}
            <span className="text-[11px] font-mono">{isMobilePreview ? 'Desktop View' : 'Mobile View'}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 rounded-xl px-2 py-1">
            <Globe className="w-3.5 h-3.5 text-rose-600" />
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent text-xs font-bold text-rose-900 focus:outline-none cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.native}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Mobile Sub-Nav Row */}
      <div className="md:hidden flex items-center justify-around bg-slate-50 border-t border-rose-100 py-2 px-2 overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
              activeTab === item.id
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
