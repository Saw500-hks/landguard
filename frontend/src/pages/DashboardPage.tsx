import React from 'react';
import {
  TrendingUp, AlertTriangle, CheckCircle2, Clock,
  ArrowRight, Scale, FileText, Users, ChevronRight,
  Bell, ChevronDown, Activity, Sparkles
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
  LineChart, Line, XAxis, YAxis
} from 'recharts';
import { DEMO_PROJECTS, DEMO_ALERTS } from '../data/demoData';

interface DashboardPageProps {
  onSelectProject: (projectId: string) => void;
  onNavigate: (page: string) => void;
  userRole?: string;
}

const RISK_DONUT_DATA = [
  { name: 'High', value: 18, color: '#E53935' },
  { name: 'Medium', value: 42, color: '#F9A825' },
  { name: 'Low', value: 65, color: '#2E7D32' },
];

const COMPACT_TREND_DATA = [
  { w: 'W1', val: 32 },
  { w: 'W2', val: 34 },
  { w: 'W3', val: 33 },
  { w: 'W4', val: 35 },
  { w: 'W5', val: 37 },
];

const TOP_DELAY_FACTORS = [
  { name: 'Compensation Delay', pct: 27, color: 'bg-risk-high', text: 'text-risk-high' },
  { name: 'Legal Dispute', pct: 21, color: 'bg-orange-500', text: 'text-orange-600' },
  { name: 'Approval Delay', pct: 17, color: 'bg-risk-medium', text: 'text-risk-medium' },
  { name: 'Incomplete Documents', pct: 11, color: 'bg-amber-400', text: 'text-amber-500' },
  { name: 'R&R Issues', pct: 7, color: 'bg-forest-700', text: 'text-forest-700' },
];

export const DashboardPage: React.FC<DashboardPageProps> = ({ onSelectProject, onNavigate, userRole = "District Officer" }) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Greeting & Subtitle */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-extrabold text-forest-900 tracking-tight">
            Good Morning, Demo Officer 👋
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-forest-100 text-forest-900 border border-forest-200 shrink-0">
            {userRole}
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Here's your project risk overview.
        </p>
      </div>

      {/* ====================================================
          PROJECT SUMMARY: Three compact cards in one row
         ==================================================== */}
      <div className="grid grid-cols-3 gap-2">
        {/* Total Projects */}
        <div className="bg-white p-3 rounded-2xl border border-app-border shadow-card flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</span>
          <span className="text-xl font-extrabold font-mono text-forest-900 mt-1">125</span>
          <span className="text-[9px] text-slate-500 mt-0.5">Projects</span>
        </div>

        {/* High Risk */}
        <div className="bg-white p-3 rounded-2xl border border-red-100 shadow-card flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-risk-high">High Risk</span>
          <span className="text-xl font-extrabold font-mono text-risk-high mt-1">18</span>
          <span className="text-[9px] text-red-500 mt-0.5">Critical</span>
        </div>

        {/* Medium Risk */}
        <div className="bg-white p-3 rounded-2xl border border-amber-100 shadow-card flex flex-col justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-risk-medium">Medium</span>
          <span className="text-xl font-extrabold font-mono text-risk-medium mt-1">42</span>
          <span className="text-[9px] text-amber-600 mt-0.5">Watch</span>
        </div>
      </div>

      {/* ====================================================
          AVERAGE DELAY RISK: Compact card with line chart
         ==================================================== */}
      <div className="bg-white p-4 rounded-3xl border border-app-border shadow-card space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Average Delay Risk
            </span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="text-2xl font-extrabold font-mono text-forest-900">37%</span>
              <span className="text-[11px] font-bold text-risk-high flex items-center">
                ↑ 5% vs last week
              </span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-forest-50 text-forest-800 font-bold border border-forest-100">
            5-Week Trend
          </span>
        </div>

        {/* Compact Line Chart */}
        <div className="h-24 w-full -ml-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={COMPACT_TREND_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="w" stroke="#94A3B8" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis domain={[25, 42]} hide />
              <RechartsTooltip
                formatter={(v: any) => [`${v}%`, 'Delay Likelihood']}
                contentStyle={{ backgroundColor: '#0F4D35', color: '#fff', borderRadius: '8px', fontSize: '10px', padding: '4px 8px' }}
              />
              <Line
                type="monotone"
                dataKey="val"
                stroke="#0F4D35"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#0F4D35', stroke: '#fff', strokeWidth: 1.5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ====================================================
          RISK DISTRIBUTION: Compact donut chart card
         ==================================================== */}
      <div className="bg-white p-4 rounded-3xl border border-app-border shadow-card space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
            Risk Distribution
          </h3>
          <span className="text-[10px] text-slate-500 font-semibold">125 Total</span>
        </div>

        <div className="flex items-center justify-between">
          {/* Donut Chart */}
          <div className="w-24 h-24 relative flex items-center justify-center shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RISK_DONUT_DATA}
                  innerRadius={28}
                  outerRadius={44}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {RISK_DONUT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-mono font-bold text-forest-900">125</span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="flex-1 pl-4 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center text-slate-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-risk-high mr-1.5" /> High
              </span>
              <span className="font-mono font-bold text-risk-high">18 (14%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-slate-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-risk-medium mr-1.5" /> Medium
              </span>
              <span className="font-mono font-bold text-risk-medium">42 (34%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center text-slate-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-risk-low mr-1.5" /> Low
              </span>
              <span className="font-mono font-bold text-risk-low">65 (52%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          TOP DELAY FACTORS: Compact horizontal bars
         ==================================================== */}
      <div className="bg-white p-4 rounded-3xl border border-app-border shadow-card space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
            Top Delay Factors
          </h3>
          <span className="text-[10px] text-slate-500 font-semibold">Impact %</span>
        </div>

        <div className="space-y-2.5">
          {TOP_DELAY_FACTORS.map((f, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-700">{f.name}</span>
                <span className={`font-mono font-bold ${f.text}`}>{f.pct}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${f.color}`}
                  style={{ width: `${f.pct * 3.2}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          HIGH RISK PROJECTS: Compact vertical list with thumbnails
         ==================================================== */}
      <div className="bg-white p-4 rounded-3xl border border-app-border shadow-card space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
            High Risk Projects
          </h3>
          <button
            onClick={() => onNavigate('projects')}
            className="text-[11px] font-bold text-forest-900 hover:underline flex items-center cursor-pointer"
          >
            <span>See all</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="space-y-2">
          {[
            {
              id: "LA-JH-2026-0042",
              name: "Ranchi Infrastructure Project",
              prob: "84%",
              badge: "HIGH",
              color: "bg-red-50 text-risk-high border-red-200",
              thumb: "🛣️"
            },
            {
              id: "LA-OD-2026-0032",
              name: "Odisha Highway Project",
              prob: "91%",
              badge: "CRITICAL",
              color: "bg-red-100 text-risk-critical border-red-300",
              thumb: "🌊"
            },
            {
              id: "LA-BR-2026-0017",
              name: "Patna Connectivity Project",
              prob: "72%",
              badge: "HIGH",
              color: "bg-red-50 text-risk-high border-red-200",
              thumb: "🚆"
            }
          ].map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              className="p-2.5 bg-slate-50 hover:bg-forest-50/50 rounded-2xl border border-slate-200/80 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-base shrink-0 shadow-xs">
                  {proj.thumb}
                </div>
                <div className="overflow-hidden">
                  <span className="font-mono text-[10px] font-bold text-slate-500 block">
                    {proj.id}
                  </span>
                  <h4 className="font-bold text-xs text-forest-950 truncate group-hover:text-forest-800">
                    {proj.name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0 ml-2">
                <span className="font-mono font-extrabold text-xs text-forest-900">{proj.prob}</span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase border ${proj.color}`}>
                  {proj.badge}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================
          RECENT ALERTS: Compact vertical list
         ==================================================== */}
      <div className="bg-white p-4 rounded-3xl border border-app-border shadow-card space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
            Recent Alerts
          </h3>
          <button
            onClick={() => onNavigate('alerts')}
            className="text-[11px] font-bold text-forest-900 hover:underline cursor-pointer"
          >
            All alerts
          </button>
        </div>

        <div className="space-y-2">
          <div
            onClick={() => onSelectProject("LA-JH-2026-0042")}
            className="p-2.5 bg-red-50/50 rounded-2xl border border-red-200/70 flex items-start space-x-2.5 cursor-pointer hover:bg-red-50 transition"
          >
            <div className="p-1.5 rounded-lg bg-red-100 text-risk-high shrink-0 mt-0.5">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-xs text-slate-900 truncate">Delay probability increased</h4>
                <span className="text-[10px] text-slate-400 shrink-0 ml-1">2m ago</span>
              </div>
              <p className="text-[11px] text-slate-600 font-mono mt-0.5">LA-JH-2026-0042 • 61% → 84%</p>
            </div>
          </div>

          <div
            onClick={() => onSelectProject("LA-OD-2026-0032")}
            className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-2.5 cursor-pointer hover:bg-slate-100 transition"
          >
            <div className="p-1.5 rounded-lg bg-amber-100 text-risk-medium shrink-0 mt-0.5">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-xs text-slate-900 truncate">Compensation delay detected</h4>
                <span className="text-[10px] text-slate-400 shrink-0 ml-1">15m ago</span>
              </div>
              <p className="text-[11px] text-slate-600 font-mono mt-0.5">LA-OD-2026-0032 • Overdue by 45d</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
