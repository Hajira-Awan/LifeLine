/**
 * Daily Mood & Symptom Tracker Service
 */

export const initialMoodLogs = [
  { id: '1', date: '2026-08-29', mood: 'Overjoyed', emoji: '😄', score: 5, notes: 'Feeling energetic after morning walk.', painLevel: 0 },
  { id: '2', date: '2026-08-30', mood: 'Calm', emoji: '😊', score: 4, notes: 'Productive work day.', painLevel: 1 },
  { id: '3', date: '2026-08-31', mood: 'Anxious', emoji: '😟', score: 2, notes: 'Mild headache in afternoon.', painLevel: 3 },
  { id: '4', date: '2026-09-01', mood: 'In Pain', emoji: '😣', score: 1, notes: 'Joint stiffness in knees.', painLevel: 6 },
  { id: '5', date: '2026-09-02', mood: 'Calm', emoji: '😊', score: 4, notes: 'Rested well.', painLevel: 2 },
  { id: '6', date: '2026-09-03', mood: 'Energetic', emoji: '🌟', score: 5, notes: 'Great recovery & wellness score.', painLevel: 1 },
];

export const moodOptions = [
  { mood: 'Overjoyed', emoji: '😄', score: 5, color: 'bg-emerald-500' },
  { mood: 'Calm', emoji: '😊', score: 4, color: 'bg-teal-500' },
  { mood: 'Neutral', emoji: '😐', score: 3, color: 'bg-slate-400' },
  { mood: 'Anxious', emoji: '😟', score: 2, color: 'bg-amber-500' },
  { mood: 'In Pain', emoji: '😣', score: 1, color: 'bg-rose-600' },
];
