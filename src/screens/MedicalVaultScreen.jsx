import React from 'react';
import DrugInteractionChecker from '../components/DrugInteractionChecker';
import { translations } from '../utils/localization';

export default function MedicalVaultScreen({ currentLang = 'en-US' }) {
  const t = translations[currentLang] || translations['en-US'];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title */}
      <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
          {t.drugChecker} & Medication Vault
        </h1>
        <p className="text-sm text-slate-500">
          Verify multi-drug interactions against active pharmacological rules to prevent dangerous side-effects.
        </p>
      </div>

      {/* Drug Checker */}
      <DrugInteractionChecker currentLang={currentLang} />

    </div>
  );
}
