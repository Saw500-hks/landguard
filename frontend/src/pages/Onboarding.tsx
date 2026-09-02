import React, { useState } from 'react';
import {
  Shield, ArrowRight, ArrowLeft, Globe, Zap, AlertTriangle,
  TrendingUp, CheckCircle, Scale, FileText, Users, Bell,
  MapPin, CheckCircle2, ChevronRight, Activity, Clock, Smartphone
} from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
  showPhoneFrame?: boolean;
  onTogglePhoneFrame?: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({
  onComplete,
  showPhoneFrame = true,
  onTogglePhoneFrame
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      className={`min-h-screen font-sans antialiased selection:bg-forest-100 selection:text-forest-900 transition-colors duration-300 ${
        showPhoneFrame
          ? 'bg-slate-950 sm:py-6 flex items-center justify-center'
          : 'bg-app-bg flex flex-col'
      }`}
    >
      {/* Floating Phone Frame ON / OFF Toggle Button */}
      {onTogglePhoneFrame && (
        <button
          onClick={onTogglePhoneFrame}
          className="fixed top-3 right-3 z-50 hidden sm:flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-full text-xs font-bold border border-slate-700 shadow-2xl backdrop-blur-md cursor-pointer transition active:scale-95"
          title="Toggle Phone Frame ON / OFF"
        >
          {showPhoneFrame ? (
            <>
              <Smartphone className="w-4 h-4 text-forest-400" />
              <span className="text-slate-200">Phone Frame:</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-forest-600 text-white">
                ON
              </span>
            </>
          ) : (
            <>
              <Smartphone className="w-4 h-4 text-slate-400" />
              <span className="text-slate-200">Phone Frame:</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-700 text-slate-300">
                OFF (Full Screen)
              </span>
            </>
          )}
        </button>
      )}

      {/* Main Container */}
      <div
        className={`w-full bg-app-bg flex flex-col justify-between relative transition-all duration-300 ${
          showPhoneFrame
            ? 'sm:max-w-[430px] min-h-screen sm:min-h-[880px] sm:max-h-[920px] sm:rounded-[40px] sm:border-[8px] sm:border-slate-800 shadow-2xl overflow-hidden p-5'
            : 'min-h-screen max-w-3xl mx-auto p-6 sm:p-10 rounded-none border-0 shadow-none'
        }`}
      >

        {/* Top Header: Logo, Language, Skip */}
        <div className="flex items-center justify-between z-10 shrink-0 pb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-forest-900 flex items-center justify-center shadow-xs">
              <Shield className="w-4 h-4 text-forest-100" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-forest-900">
              LandGuard <span className="text-forest-600">AI</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="flex items-center space-x-1 bg-white border border-app-border px-2 py-1 rounded-full text-[11px] font-bold text-slate-700 shadow-xs">
              <Globe className="w-3 h-3 text-forest-900" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
                className="bg-transparent border-none focus:outline-hidden text-[10px] cursor-pointer"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
              </select>
            </div>

            {/* Skip Button */}
            <button
              onClick={onComplete}
              className="text-[11px] font-bold text-slate-500 hover:text-forest-900 px-2 py-1 cursor-pointer"
            >
              Skip
            </button>
          </div>
        </div>

        {/* Central Scrollable Screen Content */}
        <div className="my-auto py-2 overflow-y-auto scrollbar-none z-10">
          {/* ====================================================
              SCREEN 1: Predict Delays Before Critical
             ==================================================== */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <h1 className="text-xl font-extrabold text-forest-950 tracking-tight leading-snug">
                  Predict Land Acquisition Delays Before They Become Critical
                </h1>
                <p className="text-xs text-slate-500 leading-relaxed px-1">
                  LandGuard AI helps project authorities identify delay risks, understand bottlenecks, and take preventive action using predictive analytics.
                </p>
              </div>

              {/* Premium Isometric Illustration Card */}
              <div className="bg-white rounded-3xl p-3 border border-app-border shadow-card">
                <div className="aspect-16/10 w-full bg-gradient-to-br from-[#123D30] to-[#0A261E] rounded-2xl relative flex items-center justify-center p-2 overflow-hidden shadow-inner">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#4ADE80_1px,transparent_1px)] [background-size:10px_10px]" />
                  <svg viewBox="0 0 280 180" className="w-full h-full max-w-[240px] drop-shadow-xl">
                    <polygon points="140,25 250,80 140,145 30,80" fill="#0D3B29" stroke="#166534" strokeWidth="1.5" />
                    <polygon points="30,80 140,145 140,165 30,100" fill="#072016" />
                    <polygon points="140,145 250,80 250,100 140,165" fill="#051710" />
                    <polygon points="85,65 140,95 115,110 60,80" fill="#15803D" opacity="0.7" stroke="#4ADE80" strokeWidth="0.8" />
                    <polygon points="140,95 195,65 220,80 165,110" fill="#16A34A" opacity="0.6" stroke="#86EFAC" strokeWidth="0.8" />
                    <path d="M 45,90 Q 140,85 235,72" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.9" />
                    <path d="M 45,90 Q 140,85 235,72" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="5,5" fill="none" />
                    <circle cx="140" cy="85" r="10" fill="#EF4444" opacity="0.25" className="animate-ping" />
                    <circle cx="140" cy="85" r="5" fill="#E53935" />
                  </svg>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="space-y-2">
                <div className="p-3 bg-white rounded-2xl border border-app-border shadow-card flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-forest-100 text-forest-900 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-forest-950">AI-Powered Prediction</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Predict potential project delays early.</p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-app-border shadow-card flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-forest-950">Smart Risk Detection</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Identify projects that require immediate attention.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              SCREEN 2: Know Which Projects Are At Risk
             ==================================================== */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <h1 className="text-xl font-extrabold text-forest-950 tracking-tight leading-snug">
                  Know Which Projects Are At Risk
                </h1>
                <p className="text-xs text-slate-500 leading-relaxed px-1">
                  Monitor every project using an easy-to-understand risk score and delay probability.
                </p>
              </div>

              {/* AI Risk Prediction Card (LA-JH-2026-0042) */}
              <div className="bg-white rounded-3xl p-4 border border-app-border shadow-card space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-2">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-forest-900 bg-forest-50 px-1.5 py-0.5 rounded border border-forest-200">
                      LA-JH-2026-0042
                    </span>
                    <h3 className="font-bold text-xs text-forest-950 mt-1">
                      Ranchi Infrastructure Project
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-red-100 text-risk-high border border-red-200">
                    HIGH RISK
                  </span>
                </div>

                {/* Semi-Circle Delay Gauge (84%) */}
                <div className="flex flex-col items-center justify-center py-1">
                  <div className="relative w-44 h-22 flex items-end justify-center">
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#EEF0EA" strokeWidth="20" strokeLinecap="round" />
                      <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="#E53935"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 * (1 - 0.84)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute bottom-0 text-center">
                      <span className="text-3xl font-extrabold font-mono text-forest-950 block">84%</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Delay Probability</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full mt-4 pt-3 border-t border-slate-100 text-center">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Risk Score</span>
                      <span className="text-sm font-extrabold text-forest-950 font-mono">8.4 / 10</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Predicted Delay</span>
                      <span className="text-sm font-extrabold text-risk-high font-mono">68 Days</span>
                    </div>
                  </div>
                </div>

                {/* Two Info Cards */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <h4 className="font-bold text-[11px] text-forest-950">1. Risk Score</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">A simple score to understand project health.</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <h4 className="font-bold text-[11px] text-forest-950">2. Delay Probability</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Estimate the likelihood of future delays.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              SCREEN 3: Understand WHY a Project Is At Risk
             ==================================================== */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <h1 className="text-xl font-extrabold text-forest-950 tracking-tight leading-snug">
                  Understand WHY a Project Is At Risk
                </h1>
                <p className="text-xs text-slate-500 leading-relaxed px-1">
                  LandGuard AI doesn't only show a risk score. It highlights the factors contributing to the predicted delay.
                </p>
              </div>

              {/* Explainable AI Card */}
              <div className="bg-white rounded-3xl p-4 border border-app-border shadow-card space-y-3">
                <h3 className="text-xs font-bold text-forest-950 uppercase tracking-wider border-b border-slate-100 pb-2">
                  WHY IS THIS PROJECT AT RISK?
                </h3>

                {/* Contribution Bars */}
                <div className="space-y-2">
                  {[
                    { name: "Compensation Delay", pct: 27, color: "bg-risk-high", icon: Scale },
                    { name: "Legal Dispute", pct: 21, color: "bg-orange-500", icon: AlertTriangle },
                    { name: "Approval Delay", pct: 17, color: "bg-risk-medium", icon: Clock },
                    { name: "Incomplete Documentation", pct: 11, color: "bg-amber-400", icon: FileText },
                    { name: "Stakeholder Responsiveness", pct: -5, color: "bg-forest-700", icon: Users, mitigator: true }
                  ].map((factor, i) => {
                    const Icon = factor.icon;
                    return (
                      <div key={i} className="space-y-0.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-medium text-slate-700 flex items-center">
                            <Icon className="w-3 h-3 mr-1 text-slate-400" />
                            {factor.name}
                          </span>
                          <span className={`font-mono font-bold ${factor.mitigator ? 'text-forest-700' : 'text-slate-900'}`}>
                            {factor.mitigator ? '-5%' : `${factor.pct}%`}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${factor.color}`}
                            style={{ width: `${Math.abs(factor.pct) * 3.3}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <h4 className="font-bold text-[11px] text-forest-950">Explainable AI</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Understand the factors behind every prediction.</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <h4 className="font-bold text-[11px] text-forest-950">Stage-wise Risk</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Identify bottlenecks across the lifecycle.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================
              SCREEN 4: Turn Predictions Into Action
             ==================================================== */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <h1 className="text-xl font-extrabold text-forest-950 tracking-tight leading-snug">
                  Turn Predictions Into Action
                </h1>
                <p className="text-xs text-slate-500 leading-relaxed px-1">
                  Get prioritized recommendations and alerts before they become major delays.
                </p>
              </div>

              {/* Recommendation Card */}
              <div className="bg-white rounded-3xl p-4 border border-app-border shadow-card space-y-2">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-red-100 text-risk-high border border-red-200">
                    HIGH PRIORITY
                  </span>
                </div>
                <h3 className="font-bold text-xs text-forest-950">Compensation Verification</h3>
                <p className="text-[11px] text-slate-600">
                  <strong className="text-slate-800">Problem:</strong> Compensation processing is delayed.
                </p>
                <div className="p-2 bg-forest-50 border border-forest-100 rounded-xl text-[11px] space-y-0.5">
                  <p className="text-forest-950 font-medium">
                    <strong className="text-forest-800">Recommended Action:</strong> Prioritize verification and disbursement review.
                  </p>
                  <p className="text-forest-700 font-bold text-[10px]">Expected Impact: Reduce projected delay.</p>
                </div>
              </div>

              {/* Alert Card */}
              <div className="bg-white rounded-2xl p-3 border border-red-200 bg-red-50/40 flex items-start space-x-2.5">
                <div className="p-1.5 rounded-lg bg-red-100 text-risk-high shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-extrabold uppercase bg-red-100 text-risk-high px-1.5 py-0.2 rounded">
                      ALERT
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">LA-JH-2026-0042</span>
                  </div>
                  <h4 className="font-bold text-xs text-forest-950">Delay probability increased</h4>
                  <p className="text-[11px] text-slate-700 font-mono">
                    61% → <strong className="text-risk-high">84%</strong> • Compensation Delay
                  </p>
                </div>
              </div>

              {/* Two Feature Cards */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded-2xl border border-app-border">
                  <h4 className="font-bold text-[11px] text-forest-950">Smart Recommendations</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Receive suggested corrective actions.</p>
                </div>
                <div className="p-2.5 bg-white rounded-2xl border border-app-border">
                  <h4 className="font-bold text-[11px] text-forest-950">Early Alerts</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Get notified when project risk increases.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation: Back, Dots, Next/Get Started */}
        <div className="flex items-center justify-between pt-3 border-t border-app-border shrink-0 z-10">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="px-3.5 py-2 rounded-xl bg-white border border-app-border text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
            >
              Back
            </button>
          ) : (
            <div className="w-14" />
          )}

          <div className="flex items-center space-x-1.5">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep === index ? 'w-5 bg-forest-900' : 'w-1.5 bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold transition shadow-xs flex items-center space-x-1 cursor-pointer"
          >
            <span>{currentStep === totalSteps - 1 ? 'Get Started →' : 'Next →'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
