import { useState, useEffect } from 'react';
import { Activity, Server, Database, Globe, CheckCircle2 } from 'lucide-react';

const StatusPage = () => {
  const [ping, setPing] = useState(12);

  // Simulate slight ping fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * (18 - 8 + 1) + 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const systems = [
    { name: "Frontend Application (Vercel Edge)", status: "Operational", uptime: "99.99%", icon: Globe },
    { name: "Core API Services", status: "Operational", uptime: "99.98%", icon: Server },
    { name: "Patient Database Cluster", status: "Operational", uptime: "100%", icon: Database },
    { name: "Gemini AI Diagnostic Engine", status: "Operational", uptime: "99.95%", icon: Activity },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Systems Operational</h1>
          <p className="text-gray-500">LifeLine is running smoothly across all regions.</p>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <p className="text-sm text-gray-500 font-medium mb-1">Global Response Time</p>
            <p className="text-3xl font-bold text-gray-900">{ping}ms</p>
            <p className="text-xs text-green-500 font-medium mt-2 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span> Ultra Fast
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <p className="text-sm text-gray-500 font-medium mb-1">30-Day Uptime</p>
            <p className="text-3xl font-bold text-gray-900">99.99%</p>
            <p className="text-xs text-green-500 font-medium mt-2 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span> Above Target
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <p className="text-sm text-gray-500 font-medium mb-1">Active Requests</p>
            <p className="text-3xl font-bold text-gray-900">~12.4k/m</p>
            <p className="text-xs text-green-500 font-medium mt-2 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span> Handling Smoothly
            </p>
          </div>
        </div>

        {/* System Components */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">System Components</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {systems.map((sys, idx) => (
              <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <sys.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{sys.name}</h3>
                    <p className="text-sm text-gray-500">Uptime: {sys.uptime}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-green-600 mr-2">{sys.status}</span>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-sm text-gray-400">
          <p>Powered by Vercel Edge Network & Google Cloud</p>
          <p className="mt-1">Last updated: Just now</p>
        </div>

      </div>
    </div>
  );
};

export default StatusPage;
