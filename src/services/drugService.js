/**
 * Pharmacological Database Mock Service for Drug-Drug Interactions
 */

export const mockMedicationsList = [
  'Aspirin',
  'Warfarin',
  'Ibuprofen',
  'Lisinopril',
  'Metformin',
  'Amoxicillin',
  'Atorvastatin',
  'Omeprazole',
  'Paracetamol (Acetaminophen)',
  'Metoprolol',
];

export const mockInteractionRules = [
  {
    drugs: ['Aspirin', 'Warfarin'],
    severity: 'High Risk (Severe)',
    description: 'Combining Aspirin and Warfarin significantly increases the risk of major internal gastrointestinal bleeding.',
    recommendation: 'Do NOT take concurrently without strict physician supervision & INR monitoring.',
  },
  {
    drugs: ['Ibuprofen', 'Lisinopril'],
    severity: 'Moderate Risk',
    description: 'NSAIDs like Ibuprofen may diminish the antihypertensive effect of Lisinopril and increase renal risk.',
    recommendation: 'Monitor blood pressure regularly and consider alternative pain relief like Paracetamol.',
  },
  {
    drugs: ['Metformin', 'Contrast Dye'],
    severity: 'High Risk (Severe)',
    description: 'Metformin combined with iodine contrast dye can trigger lactic acidosis.',
    recommendation: 'Withhold Metformin 48 hours prior to radiological procedures.',
  },
  {
    drugs: ['Atorvastatin', 'Omeprazole'],
    severity: 'Low Risk (Minor)',
    description: 'Minor metabolic interaction. Usually well tolerated.',
    recommendation: 'Take at recommended scheduled dosage intervals.',
  },
];

export function checkDrugInteractions(selectedMeds) {
  if (!selectedMeds || selectedMeds.length < 2) return [];

  const foundInteractions = [];

  for (const rule of mockInteractionRules) {
    const hasAll = rule.drugs.every((d) =>
      selectedMeds.some((m) => m.toLowerCase().includes(d.toLowerCase()))
    );

    if (hasAll) {
      foundInteractions.push(rule);
    }
  }

  return foundInteractions;
}
