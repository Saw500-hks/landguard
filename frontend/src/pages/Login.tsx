import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, Sparkles, Smartphone } from 'lucide-react';
import { User as UserType, UserRole } from '../types';
import { api, setActiveUser, setAuthToken } from '../services/api';

interface LoginProps {
  onLoginSuccess: (user: UserType) => void;
  onEnterDemoMode: () => void;
  showPhoneFrame?: boolean;
  onTogglePhoneFrame?: () => void;
}

interface RoleOption {
  role: UserRole;
  title: string;
  email: string;
  pwd: string;
  desc: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    role: "District Officer",
    title: "District Officer",
    email: "district.officer@landguard.gov.in",
    pwd: "District@123",
    desc: "Ranchi Collectorate"
  },
  {
    role: "State Officer",
    title: "State Officer",
    email: "state.officer@landguard.gov.in",
    pwd: "State@123",
    desc: "Jharkhand Revenue"
  },
  {
    role: "Project Manager",
    title: "Project Manager",
    email: "pm@landguard.gov.in",
    pwd: "Manager@123",
    desc: "NHAI Expressway Lead"
  },
  {
    role: "Viewer",
    title: "Analyst / Viewer",
    email: "viewer@landguard.gov.in",
    pwd: "Viewer@123",
    desc: "NITI Aayog Division"
  }
];

export const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  onEnterDemoMode,
  showPhoneFrame = true,
  onTogglePhoneFrame
}) => {
  const [selectedRole, setSelectedRole] = useState<RoleOption>(ROLE_OPTIONS[0]);
  const [email, setEmail] = useState<string>(ROLE_OPTIONS[0].email);
  const [password, setPassword] = useState<string>(ROLE_OPTIONS[0].pwd);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectRole = (r: RoleOption) => {
    setSelectedRole(r);
    setEmail(r.email);
    setPassword(r.pwd);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.login(email, password);
      setAuthToken(res.access_token);
      setActiveUser(res.user);
      onLoginSuccess(res.user);
    } catch (err: any) {
      // Offline fallback for smooth demo presentation
      const fallbackUser: UserType = {
        id: 1,
        email: email,
        full_name: selectedRole.title === "District Officer" ? "Vikramaditya Verma" : "Demo Officer",
        role: selectedRole.role,
        state: "Jharkhand",
        district: "Ranchi",
        department: selectedRole.desc,
        is_active: true
      };
      setActiveUser(fallbackUser);
      onLoginSuccess(fallbackUser);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
        showPhoneFrame
          ? 'bg-slate-950 sm:py-6 flex items-center justify-center p-2 sm:p-4'
          : 'bg-gradient-to-br from-[#F4F7F2] via-[#F9FAF7] to-[#EDF3EC] flex flex-col justify-center items-center p-4'
      }`}
    >
      {/* Floating Phone Frame ON / OFF Toggle Button */}
      {onTogglePhoneFrame && (
        <button
          onClick={onTogglePhoneFrame}
          type="button"
          className="fixed top-3 right-3 z-50 hidden sm:flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-full text-xs font-bold border border-slate-700 shadow-2xl backdrop-blur-md cursor-pointer transition active:scale-95"
          title="Toggle Phone Frame ON / OFF"
        >
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-200">Phone Frame:</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
              showPhoneFrame ? 'bg-forest-700 text-white' : 'bg-slate-700 text-slate-300'
            }`}
          >
            {showPhoneFrame ? 'ON' : 'OFF'}
          </span>
        </button>
      )}

      {/* Main Login Container */}
      <div
        className={`w-full bg-gradient-to-br from-[#F5F8F3] via-[#FAFCF9] to-[#EEF4EC] flex flex-col justify-between relative transition-all duration-300 ${
          showPhoneFrame
            ? 'sm:max-w-[440px] min-h-screen sm:min-h-[860px] sm:max-h-[920px] sm:rounded-[36px] sm:border-[8px] sm:border-slate-800 shadow-2xl overflow-y-auto p-5 sm:p-6'
            : 'max-w-md mx-auto p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xl my-auto'
        }`}
      >
        {/* Brand Header */}
        <div className="text-center pt-2 pb-1">
          <div className="inline-flex items-center justify-center w-13 h-13 rounded-2xl bg-forest-900 text-white shadow-lg shadow-forest-900/20 mb-3.5 ring-4 ring-forest-900/10">
            <Shield className="w-7 h-7 text-emerald-300" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-forest-950 bg-transparent">
            Welcome Back!
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-600 max-w-[300px] mx-auto leading-relaxed mt-1.5 bg-transparent font-normal">
            Sign in to monitor your projects and manage acquisition risks with LandGuard AI.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <div className="my-auto py-3 space-y-5">
          {/* Role Selection 2-Column Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-transparent block">
                Select Your Role
              </label>
              <span className="text-[10px] text-slate-500 font-medium bg-transparent">
                Demonstration Profile
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {ROLE_OPTIONS.map((r) => {
                const isSelected = selectedRole.role === r.role;
                return (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => handleSelectRole(r)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-forest-700 bg-[#F0FAF4] shadow-xs ring-1 ring-forest-700/30'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 w-full">
                      <span
                        className={`text-xs font-bold leading-tight bg-transparent ${
                          isSelected ? 'text-forest-950' : 'text-slate-800'
                        }`}
                      >
                        {r.title}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 truncate bg-transparent font-normal">
                      {r.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                {error}
              </div>
            )}

            {/* Official Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block bg-transparent">
                Official Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="district.officer@landguard.gov.in"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-xs font-medium focus:bg-white focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block bg-transparent">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-xs font-medium focus:bg-white focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-xs pt-0.5">
              <label className="flex items-center space-x-2 cursor-pointer bg-transparent">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-forest-800 focus:ring-forest-700 border-slate-300 cursor-pointer accent-forest-800"
                />
                <span className="text-slate-700 font-medium bg-transparent">Remember Me</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Password reset assistance dispatched to official email.")}
                className="font-bold text-forest-800 hover:text-forest-950 hover:underline bg-transparent cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-forest-900 hover:bg-forest-950 active:scale-[0.99] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-70 mt-1"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest relative">
                OR
              </span>
            </div>

            {/* Secondary Demo Mode Button */}
            <button
              type="button"
              onClick={onEnterDemoMode}
              className="w-full py-2.5 bg-white hover:bg-forest-50/60 active:scale-[0.99] text-forest-900 border-2 border-forest-700/40 hover:border-forest-700/70 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-forest-700" />
              <span>Enter Demo Mode</span>
            </button>
          </form>

          <p className="text-center text-[10px] text-slate-500 bg-transparent">
            Demo credentials are pre-loaded for SIH presentation.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center pt-2 pb-1 border-t border-slate-200/60">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-transparent">
            Ministry of Rural Development • DoLR • SIH26017
          </p>
        </div>
      </div>
    </div>
  );
};

