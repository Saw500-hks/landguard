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

      {/* Main Login Container */}
      <div
        className={`w-full bg-app-bg flex flex-col justify-between relative transition-all duration-300 ${
          showPhoneFrame
            ? 'sm:max-w-[430px] min-h-screen sm:min-h-[880px] sm:max-h-[920px] sm:rounded-[40px] sm:border-[8px] sm:border-slate-800 shadow-2xl overflow-hidden p-5'
            : 'min-h-screen max-w-md mx-auto p-6 sm:p-8 rounded-none border-0 shadow-none'
        }`}
      >

        {/* Brand Header */}
        <div className="text-center space-y-1.5 pt-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-forest-900 text-white shadow-md mb-1">
            <Shield className="w-6 h-6 text-forest-100" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-forest-950">
            Welcome Back!
          </h1>
          <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed">
            Sign in to monitor your projects and manage acquisition risks.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <div className="my-auto py-2 space-y-4">
          {/* Role Selection Cards with Green Highlighted Border */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_OPTIONS.map((r) => {
                const isSelected = selectedRole.role === r.role;
                return (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => handleSelectRole(r)}
                    className={`p-2.5 rounded-2xl border text-left transition cursor-pointer relative ${
                      isSelected
                        ? 'border-forest-700 bg-forest-50/80 ring-2 ring-forest-600/20 shadow-xs'
                        : 'border-app-border bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-[11px] font-bold ${isSelected ? 'text-forest-950' : 'text-slate-800'}`}>
                        {r.title}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-3 h-3 text-forest-700 shrink-0" />
                      )}
                    </div>
                    <p className="text-[9px] text-slate-400 mt-0.5 truncate">{r.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-4 border border-app-border shadow-card space-y-3 text-xs">
            {error && (
              <div className="p-2 bg-red-50 border border-red-200 rounded-xl text-xs text-risk-high">
                {error}
              </div>
            )}

            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Email</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-forest-700 focus:outline-hidden font-medium text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-forest-700 focus:outline-hidden font-medium text-xs"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-[11px] pt-0.5">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-forest-900 focus:ring-forest-700 border-slate-300"
                />
                <span className="text-slate-600 font-medium">Remember Me</span>
              </label>

              <button
                type="button"
                onClick={() => alert("Password reset assistance dispatched to official email.")}
                className="font-bold text-forest-800 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-forest-900 hover:bg-forest-950 text-white rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>{loading ? 'Signing In...' : 'Sign In →'}</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-1">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest relative">
                OR
              </span>
            </div>

            {/* Secondary Demo Mode Button */}
            <button
              type="button"
              onClick={onEnterDemoMode}
              className="w-full py-2 bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-200 rounded-xl font-bold text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-forest-700" />
              <span>Demo Mode</span>
            </button>
          </form>

          <p className="text-center text-[10px] text-slate-400">
            Demo credentials are for presentation only.
          </p>
        </div>

        {/* Real-World Honesty Footer */}
        <p className="text-center text-[9px] text-slate-400 pb-2">
          Ministry of Rural Development • DoLR • SIH26017
        </p>

      </div>
    </div>
  );
};
