import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Flame, Sparkles, AlertCircle, MapPin, TrendingUp, RefreshCw, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AuthorityHotspots = () => {
  const { zones } = useData();
  const [selectedZone, setSelectedZone] = useState(zones[0]);

  return (
    <div className="space-y-6 py-2 pb-16 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-600" />
            Predictive Civic Hotspots & Civic DNA
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify recurring problem zones, predicted 7-day issue surges, and spatial Civic DNA profiles.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 font-bold">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>AI Hotspot Prediction Model</span>
        </div>
      </div>

      {/* Grid of Zones Hotspot Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zones.map((zone) => (
          <div 
            key={zone.id}
            onClick={() => setSelectedZone(zone)}
            className={`rail-card p-5 rounded-3xl space-y-3 cursor-pointer transition-all bg-white border ${
              selectedZone.id === zone.id 
                ? 'border-emerald-600 shadow-md ring-2 ring-emerald-500/20' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {zone.id}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                zone.riskLevel === 'Critical' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                zone.riskLevel === 'High' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}>
                {zone.riskScore} / 100 Risk ({zone.riskLevel})
              </span>
            </div>

            <h3 className="text-sm font-extrabold text-slate-900">{zone.name}</h3>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Primary Issue:</span>
                <span className="font-bold text-slate-900">{zone.topIssue}</span>
              </div>
              <div className="flex justify-between">
                <span>Recent Frequency:</span>
                <span className="font-mono font-bold text-emerald-700">{zone.issueCount} cases ({zone.trend})</span>
              </div>
              <div className="flex justify-between">
                <span>Average Resolution:</span>
                <span className="font-mono text-slate-700">{zone.avgResolutionTime}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Predicted 7-Day Risk:</span>
              <span className="font-bold text-rose-600 font-mono">AI Prediction: High</span>
            </div>
          </div>
        ))}
      </div>

      {/* CIVIC DNA EXPANDED PROFILE PANEL */}
      {selectedZone && (
        <div className="rail-card p-6 rounded-3xl space-y-4 bg-white border border-emerald-300 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 uppercase">Civic DNA Profile</span>
              <h2 className="text-lg font-extrabold text-slate-900">{selectedZone.name}</h2>
            </div>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
              AI Prediction • 7-Day Forecast Window
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Primary Defect</span>
              <span className="font-extrabold text-slate-900 block text-sm">{selectedZone.topIssue}</span>
              <span className="text-[10px] text-slate-500 block">Frequency: {selectedZone.issueCount} cases</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Recurrence Pattern</span>
              <span className="font-extrabold text-slate-900 block text-sm">{selectedZone.recurringPattern}</span>
              <span className="text-[10px] text-slate-500 block">Trend: {selectedZone.trend}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Predicted 7-Day Surge Risk</span>
              <span className="font-extrabold text-rose-600 block text-sm font-mono">{selectedZone.riskScore}% Surge Prob.</span>
              <span className="text-[10px] text-rose-700 font-bold block">AI Prediction</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Recommended Action</span>
              <span className="font-bold text-emerald-700 block text-xs">Schedule proactive crew before peak window.</span>
              <span className="text-[10px] text-amber-700 font-semibold block">Requires Authority Approval</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
