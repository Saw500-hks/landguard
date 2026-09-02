import React, { useState } from 'react';
import {
  ArrowLeft, Search, SlidersHorizontal, AlertTriangle,
  CheckCircle2, MapPin, ChevronRight, X
} from 'lucide-react';
import { DEMO_PROJECTS, ProjectItem } from '../data/demoData';

interface ProjectsPageProps {
  onSelectProject: (projectId: string) => void;
  onBack?: () => void;
  userRole?: string;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject, onBack }) => {
  const [selectedRiskTab, setSelectedRiskTab] = useState<'All' | 'High Risk' | 'Medium' | 'Low'>('All');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSectorFilter, setShowSectorFilter] = useState<boolean>(false);
  const [selectedSector, setSelectedSector] = useState<string>('All');

  const filteredProjects = DEMO_PROJECTS.filter((p) => {
    // Search query
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.state.toLowerCase().includes(searchQuery.toLowerCase());

    // Risk tab
    let matchesRisk = true;
    if (selectedRiskTab === 'High Risk') {
      matchesRisk = p.risk_category === 'HIGH' || p.risk_category === 'CRITICAL';
    } else if (selectedRiskTab === 'Medium') {
      matchesRisk = p.risk_category === 'MEDIUM';
    } else if (selectedRiskTab === 'Low') {
      matchesRisk = p.risk_category === 'LOW';
    }

    // Sector filter
    let matchesSector = true;
    if (selectedSector !== 'All') {
      matchesSector = p.project_type === selectedSector;
    }

    return matchesSearch && matchesRisk && matchesSector;
  });

  return (
    <div className="space-y-3.5 animate-fadeIn">
      {/* ====================================================
          COMPACT MOBILE HEADER: [←] Projects [🔍 Search] [⚙ Filter]
         ==================================================== */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center space-x-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1 -ml-1 text-forest-900 hover:bg-forest-50 rounded-lg transition cursor-pointer"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-base font-extrabold text-forest-900 tracking-tight">
            Projects
          </h1>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              showSearch ? 'bg-forest-100 text-forest-900' : 'text-slate-500 hover:bg-slate-100'
            }`}
            aria-label="Toggle Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowSectorFilter(!showSectorFilter)}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              showSectorFilter ? 'bg-forest-100 text-forest-900' : 'text-slate-500 hover:bg-slate-100'
            }`}
            aria-label="Toggle Filter"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {showSearch && (
        <div className="relative animate-fadeIn">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search project ID or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-2 bg-white border border-app-border rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-forest-700 shadow-xs"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Expandable Sector Filter Chips */}
      {showSectorFilter && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none animate-fadeIn text-[11px]">
          {['All', 'Highways & Expressways', 'Railways & Freight', 'Industrial Corridors', 'Renewable Energy'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition cursor-pointer ${
                selectedSector === sec
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {sec.replace('& Expressways', '').replace('& Freight', '')}
            </button>
          ))}
        </div>
      )}

      {/* ====================================================
          HORIZONTAL FILTER CHIPS: All | High Risk | Medium | Low
         ==================================================== */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {(['All', 'High Risk', 'Medium', 'Low'] as const).map((tab) => {
          const isSelected = selectedRiskTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setSelectedRiskTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-forest-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-app-border hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ====================================================
          VERTICAL PROJECT CARDS
         ==================================================== */}
      <div className="space-y-3 pt-1">
        {filteredProjects.map((project) => {
          const isHigh = project.risk_category === 'HIGH' || project.risk_category === 'CRITICAL';
          const isCritical = project.risk_category === 'CRITICAL';

          const badgeColor = isCritical
            ? 'bg-red-100 text-risk-critical border-red-300'
            : isHigh
            ? 'bg-red-50 text-risk-high border-red-200'
            : project.risk_category === 'MEDIUM'
            ? 'bg-amber-50 text-risk-medium border-amber-200'
            : 'bg-emerald-50 text-risk-low border-emerald-200';

          return (
            <div
              key={project.id}
              className="bg-white rounded-3xl p-4 border border-app-border shadow-card hover:border-forest-600 transition-all space-y-3"
            >
              {/* Card Top: ID with Warning Icon & Risk Badge */}
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-1.5">
                  <span className={`text-xs ${isHigh ? 'text-risk-high' : 'text-forest-700'}`}>
                    {isHigh ? '⚠' : '✓'}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {project.id}
                  </span>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase border ${badgeColor}`}>
                  {project.risk_category} RISK
                </span>
              </div>

              {/* Project Name & Location */}
              <div>
                <h3 className="font-bold text-sm text-forest-950 leading-tight">
                  {project.name}
                </h3>
                <p className="text-[11px] text-slate-500 flex items-center mt-0.5">
                  <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                  {project.state} • {project.district}
                </p>
              </div>

              {/* 2x2 Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50/70 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Risk Score</span>
                  <span className="font-mono font-extrabold text-forest-950 text-xs">
                    {project.risk_score} / 10
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Delay Probability</span>
                  <span className="font-mono font-extrabold text-forest-950 text-xs">
                    {Math.round(project.delay_probability * 100)}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Stage</span>
                  <span className="font-semibold text-slate-800 text-[11px] truncate block">
                    {project.current_stage}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Updated</span>
                  <span className="text-slate-600 text-[11px]">{project.last_updated}</span>
                </div>
              </div>

              {/* Action Button: [ View Details → ] */}
              <button
                onClick={() => onSelectProject(project.id)}
                className="w-full py-2.5 px-3 bg-forest-50 hover:bg-forest-900 text-forest-900 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>View Details</span>
                <span className="text-sm">→</span>
              </button>
            </div>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-xs text-slate-400 bg-white rounded-3xl p-6 border border-app-border">
            No projects matched your filters.
          </div>
        )}
      </div>
    </div>
  );
};
