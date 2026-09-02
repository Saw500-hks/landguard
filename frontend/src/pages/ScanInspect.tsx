import React, { useState } from 'react';
import {
  ArrowLeft, Info, Camera, BarChart2, FileText, AlertCircle,
  ChevronRight, Sparkles, CheckCircle2, Scan, RefreshCw, X
} from 'lucide-react';

interface ScanInspectProps {
  onSelectProject: (projectId: string) => void;
  onNavigate: (page: string) => void;
  onBack?: () => void;
}

export const ScanInspect: React.FC<ScanInspectProps> = ({
  onSelectProject,
  onNavigate,
  onBack
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<any | null>(null);

  const handleActionClick = (type: string) => {
    setActiveModal(type);
    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setScanning(false);
      if (type === 'parcel') {
        setScanResult({
          title: "Cadastral Plot #412/A Verified",
          jurisdiction: "Ranchi, Jharkhand",
          area: "450.0 Hectares",
          status: "Encumbrance Free — Zero Court Injunctions",
          confidence: "99.4%"
        });
      } else if (type === 'risk') {
        setScanResult({
          title: "Risk Scan: LA-JH-2026-0042",
          delayProb: "84% (HIGH RISK)",
          predictedDelay: "+68 Days",
          criticalFactor: "Pending compensation disbursement"
        });
      } else if (type === 'doc') {
        setScanResult({
          title: "Section 19 Gazette Validation",
          status: "DILRMP Certified Record Match",
          authenticity: "Valid Digital Seal Verified"
        });
      } else {
        setScanResult({
          title: "Bottleneck Escalation #BTL-2026-904",
          status: "Assigned to District Land Acquisition Officer",
          eta: "Action required within 5 working days"
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Mobile Sub-Header: [←] Scan & Inspect [ⓘ] */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={onBack || (() => onNavigate('dashboard'))}
          className="p-1 -ml-1 text-forest-900 hover:bg-forest-50 rounded-lg transition cursor-pointer"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="text-sm font-extrabold text-forest-900 uppercase tracking-wider">
          Scan & Inspect
        </h2>

        <button
          onClick={() => alert("LandGuard AI Computer Vision & Document Scanner: Integrates satellite GIS imagery and DILRMP digitized cadastral records.")}
          className="p-1 -mr-1 text-slate-400 hover:text-forest-900 transition cursor-pointer"
          aria-label="Info"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Main Heading & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-xl font-extrabold text-forest-950 tracking-tight">
          What would you like to do today?
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Choose an option below to start an AI-powered analysis.
        </p>
      </div>

      {/* ====================================================
          HERO ISOMETRIC ILLUSTRATION
          Land parcel, trees, roads, GIS location marker, drone
         ==================================================== */}
      <div className="w-full bg-white rounded-3xl p-4 border border-app-border shadow-card overflow-hidden">
        <div className="aspect-16/10 w-full bg-gradient-to-b from-[#123D30] to-[#0A261E] rounded-2xl relative flex items-center justify-center p-2 overflow-hidden shadow-inner">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#4ADE80_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Isometric SVG Art */}
          <svg viewBox="0 0 320 200" className="w-full h-full max-w-[280px] drop-shadow-xl">
            {/* Base Isometric Terrain Slab */}
            <polygon points="160,25 290,90 160,165 30,90" fill="#0D3B29" stroke="#166534" strokeWidth="1.5" />
            <polygon points="30,90 160,165 160,185 30,110" fill="#072016" />
            <polygon points="160,165 290,90 290,110 160,185" fill="#051710" />

            {/* Segmented Land Parcel Grid */}
            <polygon points="95,75 160,108 130,125 65,92" fill="#15803D" opacity="0.7" stroke="#4ADE80" strokeWidth="0.8" />
            <polygon points="160,108 225,75 255,92 190,125" fill="#16A34A" opacity="0.6" stroke="#86EFAC" strokeWidth="0.8" />
            <polygon points="130,125 190,125 160,150 100,140" fill="#22C55E" opacity="0.5" stroke="#BBF7D0" strokeWidth="0.8" />

            {/* Corridor Alignment Highway Road */}
            <path d="M 50,100 Q 160,95 270,82" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.9" />
            <path d="M 50,100 Q 160,95 270,82" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="5,5" fill="none" />

            {/* Isometric Trees */}
            <g transform="translate(100, 60)">
              <line x1="0" y1="12" x2="0" y2="16" stroke="#78350F" strokeWidth="1.5" />
              <circle cx="0" cy="8" r="6" fill="#166534" />
              <circle cx="0" cy="6" r="4" fill="#22C55E" />
            </g>
            <g transform="translate(210, 65)">
              <line x1="0" y1="12" x2="0" y2="16" stroke="#78350F" strokeWidth="1.5" />
              <circle cx="0" cy="8" r="7" fill="#15803D" />
              <circle cx="0" cy="5" r="4.5" fill="#4ADE80" />
            </g>

            {/* GIS Location Marker Pin */}
            <g transform="translate(160, 95)">
              <circle cx="0" cy="0" r="12" fill="#EF4444" opacity="0.25" className="animate-ping" />
              <path d="M 0,-16 C -6,-16 -10,-11 -10,-5 C -10,2 0,16 0,16 C 0,16 10,2 10,-5 C 10,-11 6,-16 0,-16 Z" fill="#E53935" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="0" cy="-6" r="3.5" fill="#FFFFFF" />
            </g>

            {/* High-Tech Autonomous Survey Drone */}
            <g transform="translate(160, 38)">
              {/* Drone Sensor Cone */}
              <polygon points="0,0 -40,55 40,55" fill="#4ADE80" opacity="0.15" />
              {/* Drone Body */}
              <circle cx="0" cy="0" r="8" fill="#0F4D35" stroke="#4ADE80" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="3" fill="#86EFAC" />
              {/* Arms & Propellers */}
              <line x1="-18" y1="-8" x2="18" y2="8" stroke="#A7F3D0" strokeWidth="1.5" />
              <line x1="-18" y1="8" x2="18" y2="-8" stroke="#A7F3D0" strokeWidth="1.5" />
              <circle cx="-18" cy="-8" r="4" fill="#072016" stroke="#4ADE80" strokeWidth="1" />
              <circle cx="18" cy="8" r="4" fill="#072016" stroke="#4ADE80" strokeWidth="1" />
              <circle cx="-18" cy="8" r="4" fill="#072016" stroke="#4ADE80" strokeWidth="1" />
              <circle cx="18" cy="-8" r="4" fill="#072016" stroke="#4ADE80" strokeWidth="1" />
            </g>
          </svg>
        </div>
      </div>

      {/* ====================================================
          FOUR VERTICAL ACTION CARDS
          Rounded corners, white bg, subtle shadow, colored square icon, right arrow
         ==================================================== */}
      <div className="space-y-2.5">
        {/* 1. Land Parcel Check */}
        <div
          onClick={() => handleActionClick('parcel')}
          className="bg-white p-3.5 rounded-2xl border border-app-border shadow-card hover:border-forest-600 transition flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-900 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5 text-forest-900" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-forest-950">Land Parcel Check</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Scan land documents, maps & ownership details</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-forest-900 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
        </div>

        {/* 2. Project Risk Scan */}
        <div
          onClick={() => handleActionClick('risk')}
          className="bg-white p-3.5 rounded-2xl border border-app-border shadow-card hover:border-amber-500 transition flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <BarChart2 className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-forest-950">Project Risk Scan</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Analyze project data to predict delay risk</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
        </div>

        {/* 3. Document Verification */}
        <div
          onClick={() => handleActionClick('doc')}
          className="bg-white p-3.5 rounded-2xl border border-app-border shadow-card hover:border-sky-500 transition flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-sky-800" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-forest-950">Document Verification</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Upload land documents & records</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-800 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
        </div>

        {/* 4. Complaint / Issue */}
        <div
          onClick={() => handleActionClick('issue')}
          className="bg-white p-3.5 rounded-2xl border border-app-border shadow-card hover:border-red-400 transition flex items-center justify-between cursor-pointer group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-risk-high flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-risk-high" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-forest-950">Complaint / Issue</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Report an issue or acquisition bottleneck</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-risk-high group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
        </div>
      </div>

      {/* ====================================================
          AI INSIGHT CARD
          At the bottom: 🌱 AI Insight, "3 projects show high risk due to compensation delays.", View Details →
         ==================================================== */}
      <div className="bg-forest-50 border border-forest-200 rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
        <div className="space-y-0.5 max-w-[240px]">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-forest-800 flex items-center">
            🌱 AI Insight
          </span>
          <p className="text-xs font-bold text-forest-950 leading-snug">
            3 projects show high risk due to compensation delays.
          </p>
        </div>

        <button
          onClick={() => onSelectProject('LA-JH-2026-0042')}
          className="text-xs font-extrabold text-forest-900 bg-white px-2.5 py-1.5 rounded-xl border border-forest-300 shadow-xs hover:bg-forest-900 hover:text-white transition shrink-0 cursor-pointer"
        >
          View Details →
        </button>
      </div>

      {/* Interactive Scan Diagnostic Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-forest-950 flex items-center">
                <Scan className="w-4 h-4 mr-1.5 text-forest-700" />
                AI Diagnostic Telemetry
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-base"
              >
                &times;
              </button>
            </div>

            {scanning ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-2 text-center">
                <div className="w-12 h-12 rounded-full border-4 border-forest-200 border-t-forest-900 animate-spin" />
                <p className="font-bold text-forest-900 mt-2">Processing Cadastral OCR & Satellite Coordinates...</p>
                <p className="text-[10px] text-slate-400">Comparing with DILRMP digitized database</p>
              </div>
            ) : scanResult && (
              <div className="space-y-3">
                <div className="p-3 bg-forest-50 rounded-xl border border-forest-200 space-y-1.5">
                  <div className="flex items-center text-forest-900 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 mr-1 text-forest-700 shrink-0" />
                    <span>{scanResult.title}</span>
                  </div>
                  {Object.entries(scanResult).filter(([k]) => k !== 'title').map(([key, val]) => (
                    <div key={key} className="flex justify-between text-[11px] border-b border-forest-100/60 py-1">
                      <span className="capitalize text-slate-600 font-medium">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-bold text-forest-950">{String(val)}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setActiveModal(null);
                    onSelectProject('LA-JH-2026-0042');
                  }}
                  className="w-full py-2.5 bg-forest-900 text-white font-bold rounded-xl text-xs hover:bg-forest-950 transition"
                >
                  View Related Project Dossier →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
