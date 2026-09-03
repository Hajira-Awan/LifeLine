import React, { useState } from 'react';
import { User, ShieldAlert, Heart, Activity, Edit, Check } from 'lucide-react';
import EmergencyQR from '../components/EmergencyQR';
import SmartReminders from '../components/SmartReminders';
import MoodJournal from '../components/MoodJournal';
import { translations } from '../utils/localization';

export default function PersonaScreen({ currentLang = 'en-US' }) {
  const t = translations[currentLang] || translations['en-US'];

  const [profile, setProfile] = useState({
    name: 'Hajira Ahmed',
    age: 27,
    bloodType: 'O+ Positive',
    emergencyContact: '+92 300 5551122 (Brother)',
    allergies: 'Penicillin, Peanuts',
    chronicConditions: 'Mild Asthma',
    activeMeds: 'Salbutamol Inhaler (PRN), Amoxicillin 500mg',
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Profile Persona Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl pink-glow relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-3xl font-black text-white shadow-lg pink-glow ring-4 ring-rose-500/30">
              HA
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold">{profile.name}</h1>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold">
                  Patient ID #7890
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-rose-200 mt-2 font-medium">
                <span>Age: <strong>{profile.age}</strong></span>
                <span>•</span>
                <span className="text-rose-400 font-bold">{profile.bloodType}</span>
                <span>•</span>
                <span>Islamabad, Pakistan</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all self-start sm:self-auto"
          >
            {isEditing ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit className="w-4 h-4" />}
            <span>{isEditing ? 'Save Profile' : 'Edit Persona'}</span>
          </button>
        </div>

        {/* Editing Form */}
        {isEditing && (
          <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 font-bold mb-1 block">Full Name:</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold mb-1 block">Blood Type:</label>
              <input
                type="text"
                value={profile.bloodType}
                onChange={(e) => setProfile({ ...profile, bloodType: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold mb-1 block">Emergency Contact:</label>
              <input
                type="text"
                value={profile.emergencyContact}
                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 font-bold mb-1 block">Allergies:</label>
              <input
                type="text"
                value={profile.allergies}
                onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Emergency Medical QR Component */}
      <EmergencyQR userProfile={profile} currentLang={currentLang} />

      {/* Smart Pill Reminders */}
      <SmartReminders currentLang={currentLang} />

      {/* Mood Journal & Analytics */}
      <MoodJournal currentLang={currentLang} />

    </div>
  );
}
