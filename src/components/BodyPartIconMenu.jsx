import React from 'react';
import { bodyPartsData } from './BodySelector';
import { Activity } from 'lucide-react';

export default function BodyPartIconMenu({ onSelectPart }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-rose-500" />
          <span>Quick Body Part Categories</span>
        </h3>
        <span className="text-xs text-slate-400">Fallback Icon Navigation</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {bodyPartsData.map((part) => (
          <button
            key={part.id}
            onClick={() => onSelectPart && onSelectPart(part)}
            className="p-4 rounded-2xl bg-slate-800/80 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/50 flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-105 group shadow-sm"
          >
            <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
              {part.icon}
            </span>
            <span className="text-xs font-bold text-rose-100 group-hover:text-rose-400">
              {part.name}
            </span>
            <span className="text-[10px] text-slate-400">
              {part.specialties[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
