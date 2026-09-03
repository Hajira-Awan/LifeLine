import React, { useState } from 'react';
import BodySelector from '../components/BodySelector';
import BodyPartIconMenu from '../components/BodyPartIconMenu';
import HospitalMap from '../components/HospitalMap';
import { translations } from '../utils/localization';

export default function VisualBookingScreen({ currentLang = 'en-US' }) {
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState(null);

  const t = translations[currentLang] || translations['en-US'];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title */}
      <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
          {t.quickTriage} & Hospital Locator
        </h1>
        <p className="text-sm text-slate-500">
          Tap anatomical body parts or use fallback icons to locate localized healthcare specialists in Islamabad & Rawalpindi.
        </p>
      </div>

      {/* 2D Body Selector */}
      <BodySelector
        currentLang={currentLang}
        onSelectSpecialty={(specialty) => setSelectedSpecialtyFilter(specialty)}
      />

      {/* Fallback Icon Menu */}
      <BodyPartIconMenu />

      {/* Localized Map */}
      <HospitalMap currentLang={currentLang} />

    </div>
  );
}
