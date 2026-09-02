import React, { useState } from 'react';
import {
  Bell, AlertTriangle, CheckCircle2, ArrowRight, Check,
  Clock, ShieldAlert, Filter, Eye
} from 'lucide-react';
import { DEMO_ALERTS, AlertItem } from '../data/demoData';

interface AlertsPageProps {
  onSelectProject: (projectId: string) => void;
  userRole?: string;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({ onSelectProject }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>(DEMO_ALERTS);
  const [filterCategory, setFilterCategory] = useState<'All' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('All');

  const handleMarkAsRead = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, is_read: true } : a));
  };

  const handleAcknowledge = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, is_acknowledged: true, is_read: true } : a));
  };

  const filteredAlerts = alerts.filter(a => {
    if (filterCategory === 'All') return true;
    return a.severity === filterCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-forest-950 tracking-tight">System Alerts</h1>
          <p className="text-xs text-warm-600 font-medium">
            Real-time threshold breaches, risk profile escalations, and statutory bottleneck warnings.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1.5 bg-white p-1 rounded-2xl border border-warm-200 shadow-soft-sm text-xs font-bold">
          {(['All', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-forest-900 text-white shadow-soft-sm'
                  : 'text-warm-600 hover:text-forest-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL';
          const isHigh = alert.severity === 'HIGH';
          const badgeColor = isCritical
            ? 'bg-red-100 text-red-800 border-red-300'
            : isHigh
            ? 'bg-orange-100 text-orange-800 border-orange-300'
            : 'bg-amber-100 text-amber-800 border-amber-300';

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-3xl p-6 border shadow-soft-sm transition-all space-y-4 ${
                alert.is_read ? 'border-warm-200 opacity-90' : 'border-orange-300 shadow-soft-md'
              }`}
            >
              {/* Alert Header */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-xl shrink-0 ${isCritical ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${badgeColor}`}>
                        {alert.severity} RISK ALERT
                      </span>
                      <span className="font-mono text-xs font-bold text-forest-900 bg-warm-100 px-2 py-0.5 rounded border border-warm-200">
                        {alert.project_id}
                      </span>
                      <span className="text-xs text-warm-500 font-medium hidden sm:inline">
                        • {alert.project_name}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-forest-950 mt-1">{alert.title}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs text-warm-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{alert.time}</span>
                </div>
              </div>

              {/* Alert Body */}
              <div className="p-4 bg-warm-50 rounded-2xl border border-warm-200 space-y-2 text-xs">
                <p className="text-forest-950 font-semibold text-sm">
                  "{alert.message}"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-warm-500 block">Primary Reason</span>
                    <span className="font-semibold text-warm-800">{alert.primary_factor}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-warm-500 block">Recommended Action</span>
                    <span className="font-semibold text-forest-900">{alert.recommended_action}</span>
                  </div>
                </div>
              </div>

              {/* Actions: Mark as read, Acknowledge alert, View project */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center space-x-2">
                  {!alert.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(alert.id)}
                      className="px-3 py-1.5 rounded-xl border border-warm-300 bg-white text-xs font-bold text-warm-700 hover:bg-warm-100 transition cursor-pointer"
                    >
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    disabled={alert.is_acknowledged}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                      alert.is_acknowledged
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-warm-100 hover:bg-warm-200 text-forest-950'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{alert.is_acknowledged ? 'Acknowledged' : 'Acknowledge Alert'}</span>
                  </button>
                </div>

                <button
                  onClick={() => onSelectProject(alert.project_id)}
                  className="px-4 py-2 bg-forest-900 hover:bg-forest-950 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-soft cursor-pointer"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
