import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { RefreshCw, BarChart2, TrendingUp, AlertCircle, PieChart as PieIcon } from 'lucide-react';
import { DashboardData } from '../types';
import { api } from '../services/api';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const d = await api.getDashboard();
        setData(d);
      } catch (e) {
        console.error('Analytics load error', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-8 h-8 text-sky-600 animate-spin mb-2" />
        <p className="text-xs text-slate-500">Aggregating Cross-Sectional Analytics...</p>
      </div>
    );
  }

  if (!data) return null;

  const stateChartData = data.state_distribution.map(s => ({
    name: s.state,
    projects: s.total_projects,
    critical: s.critical_risk_count,
    high: s.high_risk_count,
    delayPct: Math.round(s.avg_delay_prob * 100)
  }));

  const stageData = Object.entries(data.stage_bottlenecks).map(([stage, vals]) => ({
    stage: stage.replace(' (Sec 11)', '').replace(' (Sec 15)', '').replace(' (Sec 38)', ''),
    total: vals.total,
    delayed: vals.delayed,
    delayed_pct: vals.delayed_pct
  }));

  const projectTypeComparison = [
    { type: 'Highways', avgDelayDays: 62, highRiskPct: 48 },
    { type: 'Railways', avgDelayDays: 54, highRiskPct: 42 },
    { type: 'Mining', avgDelayDays: 78, highRiskPct: 58 },
    { type: 'Irrigation', avgDelayDays: 69, highRiskPct: 51 },
    { type: 'Solar Parks', avgDelayDays: 32, highRiskPct: 22 },
    { type: 'Industrial SEZ', avgDelayDays: 58, highRiskPct: 45 },
    { type: 'Urban Metros', avgDelayDays: 65, highRiskPct: 49 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center">
          <BarChart2 className="w-5 h-5 mr-2 text-sky-600" />
          Cross-Sectional Delay & Risk Analytics
        </h2>
        <p className="text-xs text-slate-500">
          Empirical evaluation of acquisition friction factors across states, sectors, and statutory stages
        </p>
      </div>

      {/* Chart Row 1: State Comparison & Monthly Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* State Average Delay Probability */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-1">State-wise Average Delay Probability (%)</h3>
          <p className="text-xs text-slate-500 mb-4">Empirical likelihood of acquisition slipping past statutory deadlines</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" height={50} />
                <YAxis unit="%" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="delayPct" name="Avg Delay Prob %" fill="#0284C7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Retrospective Trend */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-1">6-Month Delay Probability Trajectory</h3>
          <p className="text-xs text-slate-500 mb-4">Systemic tracking of high-risk project proportion over time</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthly_trend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="delayed_projects" name="Delayed Projects" stroke="#EF4444" fill="#FEE2E2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Row 2: Statutory Stage Bottlenecks & Sector Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage-wise Delay Ratio */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Statutory Stage Bottlenecks (% At Risk/Delayed)</h3>
          <p className="text-xs text-slate-500 mb-4">Percentage of projects currently experiencing delay in each stage</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" unit="%" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="stage" tick={{ fontSize: 10 }} width={120} />
                <Tooltip />
                <Bar dataKey="delayed_pct" name="% Delayed" fill="#F97316" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Comparison */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Sector Vulnerability (Predicted Additional Latency)</h3>
          <p className="text-xs text-slate-500 mb-4">Average additional delay days projected by infrastructure category</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectTypeComparison}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="type" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" height={50} />
                <YAxis unit="d" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="avgDelayDays" name="Avg Additional Days" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
