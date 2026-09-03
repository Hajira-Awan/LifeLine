import React, { useState } from 'react';
import { User, Activity, RefreshCw, ChevronRight, Stethoscope } from 'lucide-react';
import { translations } from '../utils/localization';

export const bodyPartsData = [
  {
    id: 'head',
    name: 'Head & Brain',
    urdu: 'سر اور دماغ',
    specialties: ['Neurology', 'Psychiatry', 'ENT Specialist', 'Ophthalmology'],
    symptoms: ['Headache / Migraine', 'Dizziness', 'Vision Problems', 'Memory Loss'],
    icon: '🧠',
    color: '#F43F5E',
    svgRegionFront: { cx: 100, cy: 35, r: 24 },
    svgRegionBack: { cx: 100, cy: 35, r: 24 },
  },
  {
    id: 'chest',
    name: 'Chest, Heart & Lungs',
    urdu: 'سینہ، دل اور پھیپھڑے',
    specialties: ['Cardiology', 'Pulmonology', 'Thoracic Surgery'],
    symptoms: ['Chest Pain', 'Shortness of Breath', 'Palpitations', 'Chronic Cough'],
    icon: '🫀',
    color: '#E11D48',
    svgRegionFront: { cx: 100, cy: 95, r: 28 },
    svgRegionBack: { cx: 100, cy: 95, r: 28 },
  },
  {
    id: 'abdomen',
    name: 'Abdomen & Digestive System',
    urdu: 'پیٹ اور نظام انہضام',
    specialties: ['Gastroenterology', 'General Surgery', 'Urology', 'Nephrology'],
    symptoms: ['Abdominal Pain', 'Indigestion', 'Nausea / Vomiting', 'Kidney Discomfort'],
    icon: '🩺',
    color: '#FB7185',
    svgRegionFront: { cx: 100, cy: 150, r: 28 },
    svgRegionBack: { cx: 100, cy: 150, r: 28 },
  },
  {
    id: 'limbs',
    name: 'Arms, Legs & Joints',
    urdu: 'بازو، ٹانگیں اور جوڑ',
    specialties: ['Orthopedics', 'Rheumatology', 'Physiotherapy'],
    symptoms: ['Joint Pain / Arthritis', 'Fracture / Trauma', 'Muscle Weakness', 'Numbness'],
    icon: '🦴',
    color: '#E11D48',
    svgRegionFront: { cx: 100, cy: 220, r: 35 },
    svgRegionBack: { cx: 100, cy: 220, r: 35 },
  },
  {
    id: 'spine',
    name: 'Spine, Back & Neck',
    urdu: 'ریڑھ کی ہڈی اور گردن',
    specialties: ['Neurosurgery', 'Orthopedic Spine', 'Chiropractic Medicine'],
    symptoms: ['Lower Back Pain', 'Sciatica', 'Neck Stiffness', 'Postural Strain'],
    icon: '🧍',
    color: '#BE123C',
    svgRegionFront: { cx: 100, cy: 120, r: 20 },
    svgRegionBack: { cx: 100, cy: 120, r: 25 },
  },
];

export default function BodySelector({ currentLang = 'en-US', onSelectSpecialty }) {
  const [viewAngle, setViewAngle] = useState('front'); // 'front' or 'back'
  const [selectedPart, setSelectedPart] = useState(bodyPartsData[0]);

  const t = translations[currentLang] || translations['en-US'];

  return (
    <div className="bg-white rounded-3xl border border-rose-100 shadow-xl p-6 relative overflow-hidden">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-rose-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <User className="w-6 h-6" />
            </span>
            {t.quickTriage}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{t.bodyTriageDesc}</p>
        </div>

        {/* View Angle Toggle Button */}
        <button
          onClick={() => setViewAngle(prev => prev === 'front' ? 'back' : 'front')}
          className="self-start sm:self-auto px-4 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95"
        >
          <RefreshCw className="w-4 h-4 text-rose-600" />
          <span>{viewAngle === 'front' ? t.front : t.back}</span>
        </button>
      </div>

      {/* Main Grid: 2D Interactive Body SVG + Details Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Interactive 2D Body SVG (Cols 5) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center bg-gradient-to-b from-rose-50/50 to-slate-50 rounded-3xl p-6 border border-rose-100 relative shadow-inner">
          <span className="text-xs font-mono font-bold text-rose-500 mb-2 uppercase tracking-wider">
            2D Interactive Map ({viewAngle.toUpperCase()})
          </span>

          <div className="relative w-52 h-80">
            {/* SVG Anatomical Silhouette */}
            <svg className="w-full h-full drop-shadow-md" viewBox="0 0 200 300" fill="none">
              
              {/* Silhouette Body Path */}
              <g stroke="#F43F5E" strokeWidth="2.5" fill="#FFF1F2" opacity="0.9">
                {/* Head */}
                <circle cx="100" cy="35" r="22" className="transition-colors hover:fill-rose-100" />
                {/* Neck */}
                <rect x="94" y="57" width="12" height="12" rx="3" />
                {/* Shoulders & Torso */}
                <path d="M 60,70 Q 100,65 140,70 L 145,170 Q 100,180 55,170 Z" />
                {/* Arms */}
                <path d="M 58,70 L 35,160 L 25,160 M 142,70 L 165,160 L 175,160" strokeWidth="3" />
                {/* Legs */}
                <path d="M 75,170 L 70,285 M 125,170 L 130,285" strokeWidth="4" />
              </g>

              {/* Clickable Hotspots for Body Parts */}
              {bodyPartsData.map((part) => {
                const isSelected = selectedPart.id === part.id;
                const coords = viewAngle === 'front' ? part.svgRegionFront : part.svgRegionBack;

                return (
                  <g key={part.id} className="cursor-pointer" onClick={() => setSelectedPart(part)}>
                    <circle
                      cx={coords.cx}
                      cy={coords.cy}
                      r={coords.r}
                      fill={isSelected ? '#E11D48' : '#F43F5E'}
                      fillOpacity={isSelected ? '0.6' : '0.2'}
                      stroke={part.color}
                      strokeWidth={isSelected ? '3' : '1.5'}
                      className="transition-all duration-300 hover:scale-110 transform origin-center"
                    />
                    <circle
                      cx={coords.cx}
                      cy={coords.cy}
                      r="4"
                      fill={isSelected ? '#FFFFFF' : part.color}
                      className={isSelected ? 'animate-ping' : ''}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Floating Selection Badge */}
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose-200 shadow-md text-xs font-semibold text-rose-700 flex items-center gap-1.5">
              <span>{selectedPart.icon}</span>
              <span>{selectedPart.name}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Body Part Details & Recommended Specialists (Cols 7) */}
        <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6">
          
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl pink-glow relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-4xl">{selectedPart.icon}</span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold font-mono tracking-wide">
                Zone Active
              </span>
            </div>

            <h3 className="text-2xl font-extrabold">{selectedPart.name}</h3>
            <p className="text-rose-100 text-sm font-medium mt-1">{selectedPart.urdu}</p>
          </div>

          {/* Associated Symptoms */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
              Common Related Symptoms
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedPart.symptoms.map((symptom, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                >
                  • {symptom}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Specialists Buttons */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">
              Connect With Relevant Specialists
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedPart.specialties.map((specialty, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectSpecialty && onSelectSpecialty(specialty)}
                  className="p-3 rounded-2xl bg-white border border-rose-100 hover:border-rose-300 hover:bg-rose-50 text-slate-800 text-xs font-semibold flex items-center justify-between shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-rose-500" />
                    <span>{specialty}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-rose-400" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
