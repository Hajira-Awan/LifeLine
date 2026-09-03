import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Shield, Eye, EyeOff, Lock, Copy, Check, Download } from 'lucide-react';
import { translations } from '../utils/localization';

export default function EmergencyQR({ userProfile, currentLang = 'en-US' }) {
  const t = translations[currentLang] || translations['en-US'];

  // Granular privacy toggles
  const [privacySettings, setPrivacySettings] = useState({
    showName: true,
    showBloodType: true,
    showAllergies: true,
    showEmergencyContact: true,
    showChronicConditions: false,
    showActiveMeds: false,
  });

  const [copied, setCopied] = useState(false);

  const defaultProfile = userProfile || {
    name: 'Hajira Ahmed',
    age: 27,
    bloodType: 'O+ Positive',
    emergencyContact: '+92 300 5551122 (Brother)',
    allergies: 'Penicillin, Peanuts',
    chronicConditions: 'Mild Asthma',
    activeMeds: 'Salbutamol Inhaler (PRN), Amoxicillin 500mg',
  };

  const toggleSetting = (key) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Compile active QR JSON payload based on toggled privacy settings
  const compiledData = {};
  if (privacySettings.showName) compiledData.name = defaultProfile.name;
  if (privacySettings.showBloodType) compiledData.bloodType = defaultProfile.bloodType;
  if (privacySettings.showEmergencyContact) compiledData.emergencyContact = defaultProfile.emergencyContact;
  if (privacySettings.showAllergies) compiledData.allergies = defaultProfile.allergies;
  if (privacySettings.showChronicConditions) compiledData.chronicConditions = defaultProfile.chronicConditions;
  if (privacySettings.showActiveMeds) compiledData.activeMeds = defaultProfile.activeMeds;
  compiledData.lifelineApp = 'Emergency Rescue Record';

  const jsonPayloadString = JSON.stringify(compiledData, null, 2);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonPayloadString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <QrCode className="w-6 h-6" />
            </span>
            {t.emergencyQR}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Generate an instant emergency rescue QR code for paramedics with granular privacy toggles.
          </p>
        </div>
      </div>

      {/* Main Grid: QR Viewport + Privacy Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: QR Code Render Card (Cols 5) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-900 border border-slate-800 rounded-3xl text-white shadow-xl pink-glow relative">
          
          <div className="bg-white p-4 rounded-2xl shadow-2xl mb-4 border-4 border-rose-500">
            <QRCodeSVG
              value={jsonPayloadString}
              size={180}
              fgColor="#be123c"
              bgColor="#ffffff"
              level="H"
              includeMargin={true}
            />
          </div>

          <span className="text-xs font-mono font-bold text-rose-400 mb-1 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Encrypted Emergency QR
          </span>
          <span className="text-[10px] text-slate-400 text-center max-w-xs mb-4">
            Scan with any smartphone camera or LifeLine paramedic scanner.
          </span>

          <button
            onClick={handleCopyJSON}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-rose-300 flex items-center justify-center gap-2 transition-all border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Payload!' : 'Copy QR JSON Data'}</span>
          </button>
        </div>

        {/* Right Column: Privacy Toggles Control Panel (Cols 7) */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-rose-500" />
              Granular Privacy Controls
            </h3>
            <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
              Real-time QR update
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { key: 'showName', label: 'Full Name', val: defaultProfile.name },
              { key: 'showBloodType', label: 'Blood Group', val: defaultProfile.bloodType },
              { key: 'showEmergencyContact', label: 'Emergency Contact Phone', val: defaultProfile.emergencyContact },
              { key: 'showAllergies', label: 'Known Allergies', val: defaultProfile.allergies },
              { key: 'showChronicConditions', label: 'Chronic Medical Conditions', val: defaultProfile.chronicConditions },
              { key: 'showActiveMeds', label: 'Active Prescriptions', val: defaultProfile.activeMeds },
            ].map((item) => {
              const isEnabled = privacySettings[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleSetting(item.key)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isEnabled
                      ? 'bg-rose-50/80 border-rose-300 shadow-sm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button className={`p-1.5 rounded-xl ${isEnabled ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">{item.label}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{item.val}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isEnabled ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {isEnabled ? 'EXPOSED' : 'HIDDEN'}
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
