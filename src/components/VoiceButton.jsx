import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Globe, X, Sparkles, AlertCircle } from 'lucide-react';
import { voiceEngine, langVoiceMapping } from '../services/voiceEngine';
import { languages, translations } from '../utils/localization';

export default function VoiceButton({ currentLang = 'en-US', onLanguageChange, onTranscriptReceived }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const t = translations[currentLang] || translations['en-US'];

  const handleStartMic = () => {
    setTranscript('');
    setAiResponse('');
    setIsListening(true);

    voiceEngine.startListening(
      currentLang,
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          setIsListening(false);
          processVoiceQuery(text);
        }
      },
      (err) => {
        setIsListening(false);
        // Fallback simulation when mic permission or browser API is unavailable
        const simulatedQuery = "Search cardiology emergency hospital near Rawalpindi";
        setTranscript(simulatedQuery);
        processVoiceQuery(simulatedQuery);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const processVoiceQuery = (queryText) => {
    if (onTranscriptReceived) onTranscriptReceived(queryText);

    // Pick AI localized response
    const responses = langVoiceMapping[currentLang]?.fallbackResponses || langVoiceMapping['en-US'].fallbackResponses;
    const responseText = responses[Math.floor(Math.random() * responses.length)];
    
    setAiResponse(responseText);
    setIsSpeaking(true);

    voiceEngine.speak(responseText, currentLang, () => {
      setIsSpeaking(false);
    });
  };

  const handleStopMic = () => {
    voiceEngine.stopListening();
    setIsListening(false);
  };

  const handleToggleSpeakCurrentResponse = () => {
    if (isSpeaking) {
      voiceEngine.stopSpeaking();
      setIsSpeaking(false);
    } else if (aiResponse) {
      setIsSpeaking(true);
      voiceEngine.speak(aiResponse, currentLang, () => setIsSpeaking(false));
    }
  };

  return (
    <>
      {/* Floating Pink Mic Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-2xl pink-glow hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
        title={t.voiceAssistant}
      >
        <Mic className="w-7 h-7 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-bold whitespace-nowrap pr-1">
          {t.voiceAssistant}
        </span>
      </button>

      {/* Voice Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-rose-500/30 w-full max-w-lg rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    {t.voiceAssistant}
                  </h3>
                  <p className="text-xs text-rose-300">{t.tagline}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  voiceEngine.stopListening();
                  voiceEngine.stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="mb-6 flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-rose-500/20">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-300">
                <Globe className="w-4 h-4 text-rose-400" />
                <span>{t.selectLanguage}:</span>
              </div>
              <select
                value={currentLang}
                onChange={(e) => {
                  const lang = e.target.value;
                  if (onLanguageChange) onLanguageChange(lang);
                }}
                className="bg-slate-900 border border-rose-500/40 text-rose-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-rose-400"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.native} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Sound Wave Visualizer / Mic Stage */}
            <div className="flex flex-col items-center justify-center py-6 bg-slate-950/60 rounded-2xl border border-slate-800 mb-6">
              <button
                onClick={isListening ? handleStopMic : handleStartMic}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening
                    ? 'bg-rose-600 text-white animate-ping-slow ring-8 ring-rose-500/30'
                    : 'bg-gradient-to-tr from-rose-500 to-pink-500 hover:scale-105 text-white shadow-xl pink-glow'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-9 h-9" />
                ) : (
                  <Mic className="w-9 h-9" />
                )}
              </button>

              <p className="mt-4 text-xs font-medium text-slate-300">
                {isListening ? t.listening : t.speakPrompt}
              </p>

              {/* Animated Equalizer Bars when listening */}
              {isListening && (
                <div className="flex items-end gap-1.5 h-6 mt-3">
                  <span className="w-1.5 h-4 bg-rose-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-6 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-3 bg-rose-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="w-1.5 h-5 bg-pink-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                </div>
              )}
            </div>

            {/* Transcript & Response Area */}
            {(transcript || aiResponse) && (
              <div className="space-y-3 bg-slate-950/40 p-4 rounded-2xl border border-slate-800 text-sm">
                {transcript && (
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">You said:</span>
                    <p className="text-rose-200 font-medium">{transcript}</p>
                  </div>
                )}

                {aiResponse && (
                  <div className="border-t border-slate-800 pt-3 flex items-start justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> LifeLine Response:
                      </span>
                      <p className="text-white font-medium">{aiResponse}</p>
                    </div>

                    <button
                      onClick={handleToggleSpeakCurrentResponse}
                      className={`p-2 rounded-xl border ${
                        isSpeaking
                          ? 'bg-rose-600 border-rose-500 text-white animate-pulse'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                      title={t.readAloud}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
