import React from 'react';
import { Activity, Heart, Sparkles, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-white mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-600 flex items-center justify-center text-white">
                <Heart className="w-5 h-5 animate-pulse" fill="currentColor" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Life<span className="text-rose-500">Line</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Empowering emergency triage & healthcare across Pakistan with multi-lingual AI voice processing, 2D visual body navigation, and privacy-first emergency QR records.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase text-rose-400 tracking-wider mb-3">Emergency Lines</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Ambulance Rescue: <strong className="text-white">1122</strong></li>
              <li>Islamabad ER: <strong className="text-white">+92 51 8463666</strong></li>
              <li>Rawalpindi ER: <strong className="text-white">+92 51 5613000</strong></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase text-rose-400 tracking-wider mb-3">Supported Languages</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
              <span className="bg-slate-800 px-2 py-1 rounded-md">Urdu (اردو)</span>
              <span className="bg-slate-800 px-2 py-1 rounded-md">Punjabi (پنجابی)</span>
              <span className="bg-slate-800 px-2 py-1 rounded-md">Pashto (پښتو)</span>
              <span className="bg-slate-800 px-2 py-1 rounded-md">Sindhi (سنڌي)</span>
              <span className="bg-slate-800 px-2 py-1 rounded-md">Chinese (中文)</span>
              <span className="bg-slate-800 px-2 py-1 rounded-md">English</span>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} LifeLine Healthcare. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-300 font-mono">Islamabad & Rawalpindi Regional Node Live</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
