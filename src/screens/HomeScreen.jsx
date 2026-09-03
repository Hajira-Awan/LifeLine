import React from 'react';
import { PhoneCall, Activity, Heart, ShieldAlert, Sparkles, MapPin, Camera, QrCode, ArrowRight, UserCheck } from 'lucide-react';
import BodySelector from '../components/BodySelector';
import HospitalMap from '../components/HospitalMap';
import { translations } from '../utils/localization';

export default function HomeScreen({ currentLang = 'en-US', onNavigate }) {
  const t = translations[currentLang] || translations['en-US'];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Banner with Emergency 1122 Hotline & LifeLine Pink Branding */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 text-white p-6 sm:p-10 shadow-2xl pink-glow">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold font-mono">
            <Activity className="w-4 h-4 text-white animate-pulse" />
            <span>Emergency & Multi-Lingual AI Healthcare</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t.appName}
          </h1>
          <p className="text-rose-100 text-sm sm:text-base font-medium">
            {t.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="tel:1122"
              className="px-6 py-3.5 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-extrabold flex items-center gap-2 shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-rose-600 animate-bounce" />
              <span>{t.callAmbulance}</span>
            </a>

            <button
              onClick={() => onNavigate('triage')}
              className="px-6 py-3.5 rounded-2xl bg-rose-950/80 hover:bg-rose-950 text-white text-xs font-extrabold flex items-center gap-2 border border-rose-400/40 shadow-md transition-all"
            >
              <span>{t.quickTriage}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Phase Navigation Shortcuts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { id: 'triage', title: t.quickTriage, icon: <Activity className="w-6 h-6 text-rose-500" />, desc: '2D Anatomical Map' },
          { id: 'vision', title: t.aiScan, icon: <Camera className="w-6 h-6 text-rose-500" />, desc: 'AI Triage & Lab OCR' },
          { id: 'vault', title: t.drugChecker, icon: <Sparkles className="w-6 h-6 text-rose-500" />, desc: 'Multi-Med Conflicts' },
          { id: 'persona', title: t.emergencyQR, icon: <QrCode className="w-6 h-6 text-rose-500" />, desc: 'Privacy QR & Reminders' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="p-5 rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start space-y-2 group text-left"
          >
            <div className="p-3 rounded-2xl bg-rose-50 group-hover:bg-rose-500 group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-rose-600 transition-colors">{item.title}</h3>
            <p className="text-[11px] text-slate-500">{item.desc}</p>
          </button>
        ))}
      </div>

      {/* Embedded 2D Body Selector Section */}
      <BodySelector currentLang={currentLang} onSelectSpecialty={() => onNavigate('triage')} />

      {/* Islamabad & Rawalpindi Hospital Map Section */}
      <HospitalMap currentLang={currentLang} />

    </div>
  );
}
