import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, ExternalLink, ShieldCheck, Navigation, Search, Filter, AlertTriangle } from 'lucide-react';
import { islamabadRawalpindiHospitals } from '../services/mapService';
import { translations } from '../utils/localization';

// Custom Pink Pin Marker Icon for Leaflet
const pinkMarkerIcon = L.divIcon({
  className: 'custom-pink-marker',
  html: `
    <div style="
      background: linear-gradient(135deg, #e11d48 0%, #f43f5e 100%);
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 4px 12px rgba(225, 29, 72, 0.5);
    ">
      <div style="
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
        transform: rotate(45deg);
      "></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function HospitalMap({ currentLang = 'en-US' }) {
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHosp, setSelectedHosp] = useState(islamabadRawalpindiHospitals[0]);

  const t = translations[currentLang] || translations['en-US'];

  // Filter hospitals
  const filteredHospitals = islamabadRawalpindiHospitals.filter((h) => {
    const matchesCity = selectedCity === 'All' || h.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesQuery = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         h.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         h.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesQuery;
  });

  return (
    <div className="bg-white border border-rose-100 rounded-3xl p-6 shadow-xl space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <MapPin className="w-6 h-6" />
            </span>
            {t.findHospitals}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time emergency & clinic plotting localized to Islamabad & Rawalpindi twin cities.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
          {['All', 'Islamabad', 'Rawalpindi'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-rose-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by hospital name, area (e.g. H-8, Blue Area, Cantt), or specialty (e.g. Cardiology)..."
          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-rose-200 rounded-2xl text-sm focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-slate-800"
        />
      </div>

      {/* Main Grid: Interactive Map + Hospital Drawer Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Map Container (Cols 7) */}
        <div className="lg:col-span-7 h-[420px] rounded-3xl overflow-hidden border border-rose-200 shadow-inner relative">
          <MapContainer
            center={[33.6844, 73.0479]}
            zoom={11}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredHospitals.map((hosp) => (
              <Marker
                key={hosp.id}
                position={[hosp.lat, hosp.lng]}
                icon={pinkMarkerIcon}
                eventHandlers={{
                  click: () => setSelectedHosp(hosp),
                }}
              >
                <Popup>
                  <div className="p-1 font-sans">
                    <h4 className="font-bold text-rose-700 text-sm mb-1">{hosp.name}</h4>
                    <p className="text-xs text-slate-600 mb-1">{hosp.area}, {hosp.city}</p>
                    <span className="inline-block bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                      ER 24/7 Available
                    </span>
                    <a
                      href={hosp.gmapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-rose-600 font-semibold flex items-center gap-1 hover:underline"
                    >
                      Open in Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Floating Region Info Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose-200 shadow-md text-xs font-bold text-rose-700 z-[1000] flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-rose-500" />
            <span>Islamabad - Rawalpindi Region</span>
          </div>
        </div>

        {/* Hospital Info & List Sidebar (Cols 5) */}
        <div className="lg:col-span-5 flex flex-col space-y-4 max-h-[420px] overflow-y-auto pr-1">
          
          {/* Active Highlighted Hospital Card */}
          {selectedHosp && (
            <div className="bg-gradient-to-br from-rose-500 to-rose-700 text-white p-5 rounded-3xl shadow-lg pink-glow relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold font-mono tracking-wider">
                  {selectedHosp.type}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                  <span>★</span>
                  <span>{selectedHosp.rating}</span>
                </div>
              </div>

              <h3 className="font-extrabold text-lg leading-tight mb-1">{selectedHosp.name}</h3>
              <p className="text-rose-100 text-xs mb-3">{selectedHosp.address}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedHosp.specialties.map((s, idx) => (
                  <span key={idx} className="bg-white/10 px-2 py-0.5 rounded-lg text-[10px] font-medium text-rose-50">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-rose-400/40">
                <a
                  href={`tel:${selectedHosp.phone}`}
                  className="px-3 py-2 rounded-xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-600" />
                  <span>Call Hospital</span>
                </a>

                <a
                  href={selectedHosp.gmapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-rose-800/80 hover:bg-rose-900 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* List of Hospitals */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Hospitals ({filteredHospitals.length})
            </h4>

            {filteredHospitals.map((hosp) => {
              const isSelected = selectedHosp?.id === hosp.id;
              return (
                <div
                  key={hosp.id}
                  onClick={() => setSelectedHosp(hosp)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-50 border-rose-400 shadow-md'
                      : 'bg-slate-50 border-slate-200 hover:bg-rose-50/50 hover:border-rose-200'
                  }`}
                >
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">{hosp.name}</h5>
                    <p className="text-[11px] text-slate-500">{hosp.area}, {hosp.city}</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-rose-600 bg-rose-100/60 px-2 py-0.5 rounded-lg">
                    ICU: {hosp.icuBeds}
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
