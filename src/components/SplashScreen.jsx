import React, { useEffect, useState } from 'react';
import { Heart, Activity, ShieldAlert, Sparkles } from 'lucide-react';

export default function SplashScreen({ onFinish, onReplay }) {
  const [visible, setVisible] = useState(true);
  const [pulseCount, setPulseCount] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev === 78 ? 82 : prev === 82 ? 76 : 78);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setVisible(false);
    if (onFinish) onFinish();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/60 via-slate-950 to-slate-950 pointer-events-none" />
      
      {/* Pulse Rings */}
      <div className="absolute w-96 h-96 rounded-full border border-rose-500/20 animate-ping-slow pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full border border-rose-500/30 animate-pulse pointer-events-none" />

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-md">
        
        {/* Heart + ECG Badge */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center shadow-2xl shadow-rose-600/50 pink-glow transform hover:scale-105 transition-transform duration-300">
            <Heart className="w-12 h-12 text-white animate-bounce" fill="currentColor" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-rose-500/50 rounded-full px-2.5 py-1 flex items-center gap-1 shadow-md text-xs text-rose-400 font-mono">
            <Activity className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>{pulseCount} BPM</span>
          </div>
        </div>

        {/* Brand Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 flex items-center gap-2">
          Life<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">Line</span>
          <Sparkles className="w-6 h-6 text-rose-400 animate-pulse" />
        </h1>
        <p className="text-sm text-slate-300 font-medium max-w-xs mb-8">
          Emergency Triage, Multi-Lingual AI Voice & Localized Healthcare Companion
        </p>

        {/* Interactive Pink ECG Waveform SVG */}
        <div className="w-full max-w-xs h-24 bg-slate-900/80 border border-rose-500/30 rounded-2xl p-4 flex flex-col justify-between shadow-inner mb-8">
          <div className="flex justify-between items-center text-xs text-rose-400/80 font-mono">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> LIVE Vitals</span>
            <span>Lead II • 25mm/s</span>
          </div>
          
          <svg className="w-full h-12 text-rose-500" viewBox="0 0 500 100" fill="none">
            <path
              className="ecg-line"
              d="M 0,50 L 80,50 L 100,20 L 120,80 L 140,10 L 160,90 L 180,50 L 260,50 L 280,25 L 300,75 L 320,50 L 500,50"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Enter App Button */}
        <button
          onClick={handleSkip}
          className="w-full py-3.5 px-6 rounded-xl font-semibold bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg shadow-rose-600/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
        >
          <span>Launch LifeLine</span>
          <Activity className="w-5 h-5" />
        </button>

        <p className="text-xs text-slate-400 mt-4 font-mono">
          Urdu • Punjabi • Pashto • Sindhi • Chinese • English
        </p>
      </div>
    </div>
  );
}
