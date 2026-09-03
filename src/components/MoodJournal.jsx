import React, { useState } from 'react';
import { Smile, TrendingUp, Calendar, HeartPulse, Plus, Check } from 'lucide-react';
import { initialMoodLogs, moodOptions } from '../services/moodService';
import { translations } from '../utils/localization';

export default function MoodJournal({ currentLang = 'en-US' }) {
  const [logs, setLogs] = useState(initialMoodLogs);
  const [selectedMood, setSelectedMood] = useState(moodOptions[0]);
  const [notes, setNotes] = useState('');
  const [painLevel, setPainLevel] = useState(2);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const t = translations[currentLang] || translations['en-US'];

  const handleAddLog = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood.mood,
      emoji: selectedMood.emoji,
      score: selectedMood.score,
      notes: notes || 'No notes added.',
      painLevel: Number(painLevel),
    };
    setLogs(prev => [...prev, newEntry]);
    setNotes('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Average calculations
  const avgScore = (logs.reduce((acc, curr) => acc + curr.score, 0) / logs.length).toFixed(1);
  const avgPain = (logs.reduce((acc, curr) => acc + curr.painLevel, 0) / logs.length).toFixed(1);

  return (
    <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <Smile className="w-6 h-6" />
            </span>
            {t.moodJournal}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Track daily emotional well-being, pain metrics, and trend analytics over time.
          </p>
        </div>
      </div>

      {/* Daily Logger Input Form */}
      <form onSubmit={handleAddLog} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-5 shadow-xl">
        <h3 className="text-xs uppercase font-bold text-rose-400 tracking-wider">
          How are you feeling today?
        </h3>

        {/* Emoji Selector */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
          {moodOptions.map((opt) => {
            const isSelected = selectedMood.mood === opt.mood;
            return (
              <button
                type="button"
                key={opt.mood}
                onClick={() => setSelectedMood(opt)}
                className={`p-3 rounded-2xl flex flex-col items-center justify-center min-w-[70px] transition-all transform ${
                  isSelected
                    ? 'bg-rose-600 text-white scale-110 shadow-lg pink-glow ring-2 ring-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="text-3xl mb-1">{opt.emoji}</span>
                <span className="text-[10px] font-bold">{opt.mood}</span>
              </button>
            );
          })}
        </div>

        {/* Pain Scale Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-500" /> Pain Scale (0-10):
            </span>
            <span className="text-rose-400 font-mono font-extrabold text-sm">{painLevel} / 10</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(e.target.value)}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        {/* Notes Textarea */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add optional daily notes, symptoms, or physical discomfort details..."
          className="w-full p-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-white focus:outline-none focus:border-rose-500"
          rows={2}
        />

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
          <span>{savedSuccess ? 'Log Saved Successfully!' : 'Log Today\'s Mood & Symptoms'}</span>
        </button>
      </form>

      {/* Analytics & Trend Bar Visualizer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-rose-500" /> Mood Trends & History
          </h3>
          <div className="flex gap-3 text-xs font-bold text-slate-600">
            <span>Avg Mood: <strong className="text-rose-600">{avgScore}/5</strong></span>
            <span>Avg Pain: <strong className="text-rose-600">{avgPain}/10</strong></span>
          </div>
        </div>

        {/* Dynamic SVG Trend Graph Bars */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
          <div className="flex items-end justify-between h-40 gap-2 pt-4">
            {logs.slice(-7).map((log) => {
              const heightPercent = (log.score / 5) * 100;
              return (
                <div key={log.id} className="flex-1 flex flex-col items-center gap-2 group relative">
                  
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-slate-900 text-white text-[10px] p-1.5 rounded-lg whitespace-nowrap z-10 transition-opacity pointer-events-none">
                    {log.date}: {log.mood} (Pain: {log.painLevel})
                  </div>

                  <span className="text-xl">{log.emoji}</span>
                  
                  <div className="w-full max-w-[28px] bg-slate-200 rounded-full h-full flex items-end overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-rose-600 to-pink-500 rounded-full transition-all duration-500"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-slate-500 font-semibold">
                    {log.date.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
