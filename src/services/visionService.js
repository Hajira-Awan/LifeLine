/**
 * Vision Triage & OCR Service
 * Mock backend handlers for medical image classification & document OCR analysis
 */

export const mockScansDatabase = {
  xray: {
    type: 'Radiology / X-Ray',
    finding: 'No acute fracture or dislocation observed in left radius/ulna. Joint alignment preserved.',
    urduFinding: 'بائیں ہاتھ کی ہڈی میں کوئی فریکچر یا شق نہیں ملا۔ ہڈیاں بالکل اپنی جگہ پر ہیں۔',
    confidence: 96.4,
    urgency: 'Low Urgency (Routine Follow-up)',
    urgencyLevel: 'green',
    recommendations: ['Apply ice pack for swelling', 'Avoid heavy lifting for 3 days', 'Re-eval in case of severe pain'],
  },
  skin: {
    type: 'Dermatological Lesion',
    finding: 'Superficial laceration with localized erythema. No deep tissue involvement detected.',
    urduFinding: 'جلد پر سطحی زخم اور سرخی ہے۔ اندرونی بافتوں کو کوئی نقصان نہیں پہنچا سکتام۔',
    confidence: 92.1,
    urgency: 'Moderate Urgency (Antiseptic Dressing Required)',
    urgencyLevel: 'yellow',
    recommendations: ['Clean with saline solution', 'Apply topical antibiotic ointment', 'Keep wound dry & covered'],
  },
  chest: {
    type: 'Chest Radiology',
    finding: 'Mild opacity in lower right lung field. Suggestive of early localized bronchitis or minor inflammation.',
    urduFinding: 'دائیں پھیپھڑے میں ہلکا سا سوژش کا اثر ہے۔ برونکائٹس کے ابتدائی اثرات ممکن ہیں۔',
    confidence: 89.8,
    urgency: 'Moderate Urgency (Consult Pulmonologist)',
    urgencyLevel: 'yellow',
    recommendations: ['Schedule clinical consultation', 'Monitor oxygen saturation (SpO2)', 'Avoid cold air exposure'],
  }
};

export const mockOcrDatabase = {
  bloodTest: {
    title: 'Complete Blood Count (CBC)',
    date: '2026-08-28',
    metrics: [
      { name: 'Hemoglobin (Hb)', value: '14.2 g/dL', normalRange: '13.5 - 17.5 g/dL', status: 'Normal' },
      { name: 'White Blood Cells (WBC)', value: '11.8 x10^3/µL', normalRange: '4.5 - 11.0 x10^3/µL', status: 'Slightly High' },
      { name: 'Platelet Count', value: '250 x10^3/µL', normalRange: '150 - 450 x10^3/µL', status: 'Normal' },
      { name: 'Fasting Blood Glucose', value: '145 mg/dL', normalRange: '70 - 99 mg/dL', status: 'Elevated' },
    ],
    ocrSummary: '4 metrics extracted automatically from uploaded document scan.',
  }
};

export async function analyzeMedicalImage(fileOrPreset = 'xray') {
  // Simulate network AI processing latency
  await new Promise(res => setTimeout(res, 2000));
  return mockScansDatabase[fileOrPreset] || mockScansDatabase.xray;
}

export async function processLabReportOCR(file) {
  await new Promise(res => setTimeout(res, 1800));
  return mockOcrDatabase.bloodTest;
}
