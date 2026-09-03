import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, AlertCircle, Scan, ArrowRight } from 'lucide-react';
import { processLabReportOCR } from '../services/visionService';
import { translations } from '../utils/localization';

export default function LabReportOCR({ currentLang = 'en-US' }) {
  const [loading, setLoading] = useState(false);
  const [ocrData, setOcrData] = useState(null);

  const t = translations[currentLang] || translations['en-US'];

  const handleScanReport = async () => {
    setLoading(true);
    const data = await processLabReportOCR(null);
    setOcrData(data);
    setLoading(false);
  };

  return (
    <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <FileText className="w-6 h-6" />
            </span>
            {t.ocrVault}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Simulated Optical Character Recognition (OCR) extraction for medical lab prescriptions & blood reports.
          </p>
        </div>

        <button
          onClick={handleScanReport}
          disabled={loading}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <Scan className="w-4 h-4" />
          <span>{loading ? 'Scanning Report...' : 'Simulate Lab OCR Scan'}</span>
        </button>
      </div>

      {/* Main Container */}
      {loading ? (
        <div className="p-12 text-center flex flex-col items-center justify-center space-y-3 bg-slate-50 rounded-3xl border border-slate-200">
          <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-bold text-rose-600 animate-pulse">Extracting text & values via OCR engine...</span>
        </div>
      ) : ocrData ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-extrabold text-lg text-white">{ocrData.title}</h3>
              <p className="text-xs text-rose-300">Extracted on: {ocrData.date}</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono px-3 py-1 rounded-full font-bold self-start">
              ✓ OCR Data Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ocrData.metrics.map((metric, idx) => {
              const isNormal = metric.status === 'Normal';
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isNormal
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-rose-950/40 border-rose-500/50 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300">{metric.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isNormal
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300 animate-pulse'
                      }`}
                    >
                      {metric.status}
                    </span>
                  </div>

                  <div className="text-xl font-extrabold text-white font-mono mb-1">{metric.value}</div>
                  <span className="text-[10px] text-slate-400">Reference: {metric.normalRange}</span>
                </div>
              );
            })}
          </div>

        </div>
      ) : (
        <div className="p-8 bg-slate-50 border border-dashed border-rose-200 rounded-3xl text-center flex flex-col items-center justify-center space-y-3">
          <Upload className="w-10 h-10 text-rose-400" />
          <h4 className="font-bold text-slate-700">Upload PDF / Image Lab Document</h4>
          <p className="text-xs text-slate-500 max-w-sm">
            Click "Simulate Lab OCR Scan" above to test automatic key-value extraction of blood glucose, hemoglobin, and WBC.
          </p>
        </div>
      )}

    </div>
  );
}
