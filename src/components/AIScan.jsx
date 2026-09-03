import React, { useState } from 'react';
import { Camera, Upload, Volume2, Sparkles, CheckCircle2, AlertTriangle, RefreshCw, FileText } from 'lucide-react';
import { analyzeMedicalImage } from '../services/visionService';
import { voiceEngine } from '../services/voiceEngine';
import { translations } from '../utils/localization';

export default function AIScan({ currentLang = 'en-US' }) {
  const [selectedScanType, setSelectedScanType] = useState('xray');
  const [analyzing, setAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const t = translations[currentLang] || translations['en-US'];

  const handleStartAnalysis = async (type = selectedScanType) => {
    setAnalyzing(true);
    setScanResult(null);
    const result = await analyzeMedicalImage(type);
    setScanResult(result);
    setAnalyzing(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      handleStartAnalysis('skin');
    }
  };

  const handleReadAloud = () => {
    if (!scanResult) return;
    if (isSpeaking) {
      voiceEngine.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToSpeak = currentLang.startsWith('ur') ? scanResult.urduFinding : scanResult.finding;
      voiceEngine.speak(textToSpeak, currentLang, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <Camera className="w-6 h-6" />
            </span>
            {t.aiScan}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Upload X-rays, skin lesions, or injuries for instant visual triage & audio findings.
          </p>
        </div>

        {/* Demo Preset Buttons */}
        <div className="flex items-center gap-2">
          {['xray', 'skin', 'chest'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedScanType(type);
                setImagePreview(null);
                handleStartAnalysis(type);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase transition-all ${
                selectedScanType === type && !imagePreview
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Demo {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Upload / Camera Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Upload Dropzone (Cols 6) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-8 bg-slate-900 border-2 border-dashed border-rose-500/40 rounded-3xl text-white relative min-h-[300px] overflow-hidden group shadow-inner">
          
          {imagePreview ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img src={imagePreview} alt="Medical Scan" className="max-h-56 rounded-2xl object-cover shadow-lg" />
              <button
                onClick={() => setImagePreview(null)}
                className="mt-3 text-xs text-rose-400 font-semibold hover:underline"
              >
                Remove photo & reset
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <span className="font-bold text-sm text-white mb-1">
                Upload Injury Photo or X-Ray Scan
              </span>
              <span className="text-xs text-slate-400 max-w-xs mb-4">
                Supports DICOM, JPG, PNG format. Camera & WebCam supported.
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl text-xs font-bold shadow-md">
                Select Medical Image
              </span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          )}

          {/* Scanner Overlay Line when analyzing */}
          {analyzing && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>
              <span className="text-sm font-semibold text-rose-300 animate-pulse">{t.analyzing}</span>
            </div>
          )}
        </div>

        {/* Right Column: AI Triage Findings & Audio Reader (Cols 6) */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-4">
          
          {scanResult ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-4 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> {t.scanReady}
                </span>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono px-2.5 py-1 rounded-full font-bold">
                  AI Confidence: {scanResult.confidence}%
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Scan Type:</span>
                <h3 className="text-lg font-bold text-white">{scanResult.type}</h3>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-rose-400 block mb-1">
                  Diagnostic Finding:
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {currentLang.startsWith('ur') ? scanResult.urduFinding : scanResult.finding}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-5 h-5 ${scanResult.urgencyLevel === 'green' ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span className="text-xs font-semibold text-slate-300">{scanResult.urgency}</span>
              </div>

              {/* Recommendations */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Next Action Steps:</span>
                <ul className="text-xs text-slate-300 space-y-1">
                  {scanResult.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TTS Read Aloud Audio Narration Button */}
              <button
                onClick={handleReadAloud}
                className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isSpeaking
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-md'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isSpeaking ? 'Stop Audio Narration' : t.readAloud}</span>
              </button>

            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-3 min-h-[300px]">
              <Sparkles className="w-10 h-10 text-rose-400 animate-pulse" />
              <h4 className="font-bold text-slate-700">Ready for Visual Triage</h4>
              <p className="text-xs text-slate-500 max-w-xs">
                Select a preset demo or upload an image to analyze injury severity and listen to AI audio findings.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
