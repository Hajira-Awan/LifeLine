import React from 'react';
import AIScan from '../components/AIScan';
import LabReportOCR from '../components/LabReportOCR';
import { translations } from '../utils/localization';

export default function VisionTriageScreen({ currentLang = 'en-US' }) {
  const t = translations[currentLang] || translations['en-US'];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title */}
      <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
          {t.aiScan} & Medical Document Vault
        </h1>
        <p className="text-sm text-slate-500">
          AI-driven visual triage for injury X-rays, skin lesions, audio narration, and optical character recognition for blood reports.
        </p>
      </div>

      {/* AI Scan Component */}
      <AIScan currentLang={currentLang} />

      {/* Lab Report OCR */}
      <LabReportOCR currentLang={currentLang} />

    </div>
  );
}
