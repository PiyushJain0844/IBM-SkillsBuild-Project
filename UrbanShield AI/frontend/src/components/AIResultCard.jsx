import React from 'react';
import { Cpu, AlertCircle, ShieldAlert, CheckCircle, Sparkles, Lightbulb } from 'lucide-react';
import { SeverityBadge } from './SeverityBadge';

export const AIResultCard = ({ report, onVerifyClick }) => {
  if (!report) return null;

  return (
    <div className="glass-card p-6 rounded-xl border border-cyan-900/40 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              UrbanShield AI Computer Vision Triage
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
            <span className="text-xs text-slate-400">Processed in 240ms • Model v1.2</span>
          </div>
        </div>

        {/* Responsible AI Verification Tag */}
        {report.isVerifiedByHuman ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
            <CheckCircle className="w-4 h-4" />
            Human Verified by {report.verifiedBy || 'Operator'}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-700/60">
            <AlertCircle className="w-4 h-4" />
            AI Predicted — Not Yet Verified
          </span>
        )}
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 block uppercase font-mono">Detected Issue</span>
          <span className="text-sm font-semibold text-slate-100 mt-1 block truncate">
            {report.predictedCategory || report.category}
          </span>
        </div>

        <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 block uppercase font-mono">Model Confidence</span>
          <span className="text-sm font-bold font-mono text-cyan-400 mt-1 block">
            {Math.round((report.confidence || 0.9) * 100)}%
          </span>
        </div>

        <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 block uppercase font-mono">Priority Score</span>
          <span className="text-sm font-bold font-mono text-rose-400 mt-1 block">
            {report.priorityScore || 85} / 100
          </span>
        </div>

        <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 block uppercase font-mono">Assessed Severity</span>
          <div className="mt-1">
            <SeverityBadge severity={report.severity || "High"} />
          </div>
        </div>
      </div>

      {/* Reasoning & Action */}
      <div className="space-y-3">
        <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800/80">
          <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-cyan-400" />
            Why this prediction? (Explainable AI)
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {report.aiReasoning || "Image feature activation matches high-density defect training clusters. Geospatial context factor applied."}
          </p>
        </div>

        <div className="bg-cyan-950/40 p-4 rounded-lg border border-cyan-900/50">
          <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            Recommended Next Action
          </h4>
          <p className="text-xs text-slate-200">
            {report.recommendedNextAction || "Inspect visual evidence and assign to area maintenance squad."}
          </p>
        </div>
      </div>

      {/* Human Verification CTA if Authority */}
      {!report.isVerifiedByHuman && onVerifyClick && (
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-amber-300/80">
            ⚠️ Responsible AI Rule: Decision requires explicit operator confirmation before municipal dispatch.
          </p>
          <button
            onClick={onVerifyClick}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-cyan-500/20 transition-all shrink-0 cursor-pointer"
          >
            Verify Prediction
          </button>
        </div>
      )}
    </div>
  );
};
