import React, { useState } from 'react';
import { Bell, Plus, CheckCircle2, Circle, Clock, Pill, Trash2 } from 'lucide-react';
import { initialReminders, requestNotificationPermission, sendBrowserNotification } from '../services/reminderService';
import { translations } from '../utils/localization';

export default function SmartReminders({ currentLang = 'en-US' }) {
  const [reminders, setReminders] = useState(initialReminders);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({ medName: '', dosage: '', time: '09:00 AM', category: 'General' });

  const t = translations[currentLang] || translations['en-US'];

  const handleToggleTaken = (id) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, taken: !r.taken } : r))
    );
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newMed.medName) return;
    const newItem = {
      id: Date.now(),
      ...newMed,
      taken: false,
    };
    setReminders(prev => [...prev, newItem]);
    setNewMed({ medName: '', dosage: '', time: '09:00 AM', category: 'General' });
    setShowAddForm(false);
    sendBrowserNotification('LifeLine Pill Reminder Added', `Scheduled ${newMed.medName} for ${newMed.time}`);
  };

  const handleDelete = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const completedCount = reminders.filter(r => r.taken).length;
  const progressPercent = reminders.length > 0 ? Math.round((completedCount / reminders.length) * 100) : 0;

  return (
    <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <Bell className="w-6 h-6" />
            </span>
            {t.reminders}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Smart dosage scheduler with interactive daily checklist & push notification triggers.
          </p>
        </div>

        <button
          onClick={() => {
            requestNotificationPermission();
            setShowAddForm(!showAddForm);
          }}
          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Medication Alarm</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-slate-700">Today's Dosage Progress</span>
          <span className="text-rose-600 font-mono">{completedCount} / {reminders.length} Taken ({progressPercent}%)</span>
        </div>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-rose-500 to-pink-600 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAddReminder} className="bg-rose-50/80 border border-rose-200 p-4 rounded-2xl space-y-3 animate-fade-in">
          <h4 className="font-bold text-xs text-rose-700 uppercase">New Pill Schedule</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Medication Name (e.g. Paracetamol)"
              value={newMed.medName}
              onChange={(e) => setNewMed({ ...newMed, medName: e.target.value })}
              className="p-2.5 bg-white border border-rose-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
              required
            />
            <input
              type="text"
              placeholder="Dosage (e.g. 1 Tablet)"
              value={newMed.dosage}
              onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
              className="p-2.5 bg-white border border-rose-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
              required
            />
            <input
              type="text"
              placeholder="Time (e.g. 09:00 AM)"
              value={newMed.time}
              onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
              className="p-2.5 bg-white border border-rose-200 rounded-xl text-xs focus:outline-none focus:border-rose-500"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-200 text-xs font-semibold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-rose-600 text-xs font-bold text-white shadow-md hover:bg-rose-700"
            >
              Save Alarm
            </button>
          </div>
        </form>
      )}

      {/* Checklist List */}
      <div className="space-y-3">
        {reminders.map((r) => (
          <div
            key={r.id}
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
              r.taken
                ? 'bg-slate-50 border-slate-200 opacity-60'
                : 'bg-white border-rose-200 shadow-sm hover:border-rose-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggleTaken(r.id)}
                className={`p-2 rounded-xl transition-all ${
                  r.taken ? 'bg-emerald-500 text-white' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                }`}
              >
                {r.taken ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
              </button>

              <div>
                <h4 className={`font-bold text-sm ${r.taken ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                  {r.medName}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    {r.time}
                  </span>
                  <span>• {r.dosage}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDelete(r.id)}
              className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
