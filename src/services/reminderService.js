/**
 * Smart Pill Reminders & Push Notification Helper
 */

export const initialReminders = [
  { id: 1, medName: 'Amoxicillin 500mg', dosage: '1 Capsule', time: '08:00 AM', taken: true, category: 'Antibiotic' },
  { id: 2, medName: 'Metoprolol 25mg', dosage: '1 Tablet', time: '02:00 PM', taken: false, category: 'Blood Pressure' },
  { id: 3, medName: 'Vitamin D3 1000IU', dosage: '1 Softgel', time: '08:00 PM', taken: false, category: 'Supplement' },
];

export function requestNotificationPermission() {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }
}

export function sendBrowserNotification(title, body) {
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
    });
  }
}
