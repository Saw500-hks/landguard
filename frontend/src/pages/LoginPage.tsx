import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { User, UserRole } from '../types';
import { api, setActiveUser, setAuthToken } from '../services/api';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

const DEMO_ACCOUNTS = [
  { role: "Administrator" as UserRole, name: "Rajesh Sharma, IAS", email: "admin@landguard.gov.in", pwd: "Admin@123", desc: "Full administrative & ML retraining access" },
  { role: "State Officer" as UserRole, name: "Dr. Anita Soren", email: "state.officer@landguard.gov.in", pwd: "State@123", desc: "State-level monitoring for Jharkhand" },
  { role: "District Officer" as UserRole, name: "Vikramaditya Verma", email: "district.officer@landguard.gov.in", pwd: "District@123", desc: "Ranchi District Land Acquisition Officer" },
  { role: "Project Manager" as UserRole, name: "Sanjay Kulkarni", email: "pm@landguard.gov.in", pwd: "Manager@123", desc: "NHAI Project Manager (Ranchi Expressway)" },
  { role: "Viewer" as UserRole, name: "Pooja Sen", email: "viewer@landguard.gov.in", pwd: "Viewer@123", desc: "NITI Aayog Read-only Infrastructure Analyst" },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('admin@landguard.gov.in');
  const [password, setPassword] = useState<string>('Admin@123');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.pwd);
    setLoading(true);
    setError(null);
    try {
      const res = await api.login(acc.email, acc.pwd);
      setAuthToken(res.access_token);
      setActiveUser(res.user);
      onLoginSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Quick login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Emblem & Portal Identity */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gov-blue border border-sky-400/40 shadow-xl shadow-sky-950 mb-2">
            <Shield className="w-8 h-8 text-sky-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            LandGuard <span className="text-sky-400">AI</span>
          </h1>
          <p className="text-xs text-sky-300 font-semibold uppercase tracking-widest">
            Ministry of Rural Development • Department of Land Resources (DoLR)
          </p>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
            <span>Smart India Hackathon 2026</span>
            <span>•</span>
            <span className="font-mono text-sky-400 font-semibold">SIH26017</span>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-5 border border-slate-200">
          <div>
            <h2 className="text-base font-bold text-slate-900">Official Portal Login</h2>
            <p className="text-xs text-slate-500">Enter authorized government email and security credentials</p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>
          </form>

          {/* Quick Demo Logins for Judges */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider text-center">
              ⚡ Quick Demo Login for SIH Judges
            </p>
            <div className="space-y-1.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => handleQuickLogin(acc)}
                  className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-sky-50/70 border border-slate-200 hover:border-sky-300 transition flex items-center justify-between text-xs group cursor-pointer"
                >
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-slate-900 group-hover:text-sky-700">{acc.role}</span>
                      <span className="text-[10px] text-slate-400">• {acc.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500">{acc.desc}</p>
                  </div>
                  <UserCheck className="w-4 h-4 text-slate-400 group-hover:text-sky-600" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-World Honesty Notice */}
        <p className="text-center text-[11px] text-slate-500 max-w-sm mx-auto">
          Demonstration Dataset: Predictions are for demonstration purposes under SIH26017 and should not be used as official administrative decisions.
        </p>
      </div>
    </div>
  );
};
