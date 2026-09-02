import React, { useState } from 'react';
import {
  MapPin, Filter, Layers, Eye, ArrowRight,
  AlertTriangle, CheckCircle2, SlidersHorizontal
} from 'lucide-react';
import { DEMO_PROJECTS, ProjectItem } from '../data/demoData';
import { ProjectMapLeaflet } from '../components/ProjectMapLeaflet';

interface MapPageProps {
  onSelectProject: (projectId: string) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ onSelectProject }) => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(DEMO_PROJECTS[0]);

  const filteredProjects = DEMO_PROJECTS.filter((p) => {
    const matchesState = selectedState === 'All' || p.state === selectedState;
    const matchesRisk = selectedRisk === 'All' || p.risk_category === selectedRisk;
    const matchesSector = selectedSector === 'All' || p.project_type === selectedSector;
    const matchesStage = selectedStage === 'All' || p.current_stage === selectedStage;
    return matchesState && matchesRisk && matchesSector && matchesStage;
  });

  const states = Array.from(new Set(DEMO_PROJECTS.map(p => p.state)));
  const sectors = Array.from(new Set(DEMO_PROJECTS.map(p => p.project_type)));
  const stages = Array.from(new Set(DEMO_PROJECTS.map(p => p.current_stage)));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-forest-950 tracking-tight">GIS Geo-Spatial Explorer</h1>
          <p className="text-xs text-warm-600 font-medium">
            Interactive multi-district acquisition risk mapping and corridor visualization.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 bg-white px-3 py-1.5 rounded-2xl border border-warm-200 text-xs font-bold shadow-soft-sm">
          <span className="flex items-center text-emerald-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1" /> Low
          </span>
          <span className="flex items-center text-amber-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1" /> Medium
          </span>
          <span className="flex items-center text-orange-700">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mr-1" /> High
          </span>
          <span className="flex items-center text-red-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 mr-1" /> Critical
          </span>
        </div>
      </div>

      {/* Multi-Filter Bar: State, District, Risk Level, Project Type, Current Stage */}
      <div className="bg-white p-4 rounded-3xl border border-warm-200 shadow-soft-sm grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* State Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-warm-500 mb-1">State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full p-2 bg-warm-50 border border-warm-200 rounded-xl text-warm-900 font-semibold focus:outline-hidden"
          >
            <option value="All">All States</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Risk Level Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-warm-500 mb-1">Risk Level</label>
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="w-full p-2 bg-warm-50 border border-warm-200 rounded-xl text-warm-900 font-semibold focus:outline-hidden"
          >
            <option value="All">All Risk Levels</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        {/* Project Sector Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-warm-500 mb-1">Project Type</label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full p-2 bg-warm-50 border border-warm-200 rounded-xl text-warm-900 font-semibold focus:outline-hidden"
          >
            <option value="All">All Sectors</option>
            {sectors.map(sec => <option key={sec} value={sec}>{sec}</option>)}
          </select>
        </div>

        {/* Current Stage Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-warm-500 mb-1">Current Stage</label>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="w-full p-2 bg-warm-50 border border-warm-200 rounded-xl text-warm-900 font-semibold focus:outline-hidden"
          >
            <option value="All">All Stages</option>
            {stages.map(st => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>
      </div>

      {/* Main Map + Side Detail Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaflet Interactive Map View (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-3 border border-warm-200 shadow-soft-md h-[560px] overflow-hidden relative">
          <ProjectMapLeaflet
            projects={filteredProjects as any}
            onSelectProject={(p) => setActiveProject(p as any)}
          />
        </div>

        {/* Project Detail Card on Map Click (1 Col) */}
        <div className="bg-white rounded-3xl p-6 border border-warm-200 shadow-soft-sm flex flex-col justify-between space-y-4">
          {activeProject ? (
            <div className="space-y-4">
              <div className="border-b border-warm-100 pb-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-forest-900 bg-warm-100 px-2.5 py-0.5 rounded border border-warm-200">
                    {activeProject.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    activeProject.risk_category === 'CRITICAL'
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : activeProject.risk_category === 'HIGH'
                      ? 'bg-orange-100 text-orange-800 border-orange-300'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}>
                    {activeProject.risk_category} RISK
                  </span>
                </div>
                <h3 className="font-bold text-base text-forest-950 mt-2">
                  {activeProject.name}
                </h3>
                <p className="text-xs text-warm-500 mt-0.5 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-warm-400" />
                  {activeProject.state} • {activeProject.district}
                </p>
              </div>

              {/* Metrics Breakdown */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-warm-50 rounded-2xl border border-warm-200">
                  <span className="text-[10px] uppercase font-bold text-warm-500 block">Risk Score</span>
                  <span className="text-lg font-extrabold font-mono text-forest-950">{activeProject.risk_score} / 10</span>
                </div>
                <div className="p-3 bg-warm-50 rounded-2xl border border-warm-200">
                  <span className="text-[10px] uppercase font-bold text-warm-500 block">Delay Prob</span>
                  <span className="text-lg font-extrabold font-mono text-orange-600">{Math.round(activeProject.delay_probability * 100)}%</span>
                </div>
                <div className="p-3 bg-warm-50 rounded-2xl border border-warm-200">
                  <span className="text-[10px] uppercase font-bold text-warm-500 block">Current Stage</span>
                  <span className="font-bold text-forest-900 block truncate">{activeProject.current_stage}</span>
                </div>
                <div className="p-3 bg-warm-50 rounded-2xl border border-warm-200">
                  <span className="text-[10px] uppercase font-bold text-warm-500 block">Predicted Delay</span>
                  <span className="font-bold text-forest-950">+{activeProject.predicted_delay_days} Days</span>
                </div>
              </div>

              {/* Bottleneck Summary */}
              <div className="p-3 bg-warm-50 rounded-2xl border border-warm-200 text-xs">
                <span className="text-[10px] uppercase font-bold text-warm-500 block">Primary Bottleneck</span>
                <p className="text-warm-800 font-medium mt-0.5">{activeProject.bottleneck}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-warm-400 text-xs">
              Click any map marker to view detailed corridor telemetry.
            </div>
          )}

          {activeProject && (
            <button
              onClick={() => onSelectProject(activeProject.id)}
              className="w-full py-3 bg-forest-900 hover:bg-forest-950 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-soft cursor-pointer"
            >
              <span>Inspect Full Project Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
