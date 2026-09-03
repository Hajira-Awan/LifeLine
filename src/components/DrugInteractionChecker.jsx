import React, { useState } from 'react';
import { ShieldAlert, Plus, X, AlertTriangle, CheckCircle, Pill, Search } from 'lucide-react';
import { mockMedicationsList, checkDrugInteractions } from '../services/drugService';
import { translations } from '../utils/localization';

export default function DrugInteractionChecker({ currentLang = 'en-US' }) {
  const [selectedMeds, setSelectedMeds] = useState(['Aspirin', 'Warfarin']);
  const [searchTerm, setSearchTerm] = useState('');

  const t = translations[currentLang] || translations['en-US'];

  const handleAddMed = (medName) => {
    if (!selectedMeds.includes(medName)) {
      setSelectedMeds(prev => [...prev, medName]);
    }
    setSearchTerm('');
  };

  const handleRemoveMed = (medName) => {
    setSelectedMeds(prev => prev.filter(m => m !== medName));
  };

  const interactions = checkDrugInteractions(selectedMeds);

  const filteredOptions = mockMedicationsList.filter(
    m => m.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedMeds.includes(m)
  );

  return (
    <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <Pill className="w-6 h-6" />
            </span>
            {t.drugChecker}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Input active prescriptions to screen for potential drug-drug conflicts & side-effect warnings.
          </p>
        </div>
      </div>

      {/* Medication Search & Selection */}
      <div className="space-y-3">
        <label className="text-xs uppercase font-bold text-slate-400 tracking-wider">
          Add Active Medications
        </label>
        
        <div className="relative">
          <Search className="w-5 h-5 text-rose-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type medication name (e.g. Aspirin, Warfarin, Ibuprofen, Lisinopril)..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-rose-200 rounded-2xl text-sm focus:outline-none focus:border-rose-500"
          />

          {/* Search Dropdown Suggestions */}
          {searchTerm && filteredOptions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-rose-200 rounded-2xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
              {filteredOptions.map((med) => (
                <div
                  key={med}
                  onClick={() => handleAddMed(med)}
                  className="p-3 text-xs font-semibold text-slate-800 hover:bg-rose-50 hover:text-rose-600 cursor-pointer flex items-center justify-between"
                >
                  <span>{med}</span>
                  <Plus className="w-4 h-4 text-rose-500" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Meds Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {selectedMeds.map((med) => (
            <span
              key={med}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-bold shadow-md flex items-center gap-2"
            >
              <Pill className="w-3.5 h-3.5" />
              <span>{med}</span>
              <button onClick={() => handleRemoveMed(med)} className="hover:opacity-75">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Interactions Results Area */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
          Interaction Analysis ({interactions.length} detected)
        </h3>

        {selectedMeds.length < 2 ? (
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xs text-slate-500">
            Please add at least 2 medications above to calculate interactions.
          </div>
        ) : interactions.length > 0 ? (
          <div className="space-y-3">
            {interactions.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-rose-950/90 border border-rose-500/60 text-white shadow-lg space-y-2 pink-glow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300 font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
                    Conflict: {item.drugs.join(' + ')}
                  </span>
                  <span className="bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.severity}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-100">{item.description}</p>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-rose-200">
                  <strong className="text-rose-400">Recommendation: </strong> {item.recommendation}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl flex items-center gap-3 text-emerald-800 text-xs font-semibold shadow-sm">
            <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <span>
              No severe pharmacological drug-drug interactions detected between selected medications ({selectedMeds.join(', ')}).
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
