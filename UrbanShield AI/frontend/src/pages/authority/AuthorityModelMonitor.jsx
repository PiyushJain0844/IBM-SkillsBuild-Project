import React from 'react';
import { Cpu, ShieldCheck, AlertCircle, Database, Activity, CheckCircle2, FileText, UserCheck, AlertTriangle } from 'lucide-react';

export const AuthorityModelMonitor = () => {
  return (
    <div className="space-y-6 py-2 pb-16 font-sans text-slate-900 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-600" />
            Responsible AI & Model Health Monitor
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Model versioning, dataset provenance, supported classes, evaluation status, and Responsible AI governance.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Human-in-the-Loop Enforced</span>
        </div>
      </div>

      {/* Model Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rail-card p-4 rounded-2xl space-y-1.5 bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Vision Model</span>
          <div className="text-sm font-extrabold text-slate-900 font-mono">UrbanShield Vision Model</div>
          <span className="text-[11px] text-emerald-700 font-mono font-bold block">
            v0.3 — Prototype / Demo Configuration
          </span>
        </div>

        <div className="rail-card p-4 rounded-2xl space-y-1.5 bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Dataset Provenance</span>
          <div className="text-sm font-extrabold text-slate-900 font-mono">UrbanShield Civic Dataset</div>
          <span className="text-[11px] text-amber-700 font-bold block">
            Validation Status: Under Evaluation
          </span>
        </div>

        <div className="rail-card p-4 rounded-2xl space-y-1.5 bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Supported Classes</span>
          <div className="text-sm font-extrabold text-emerald-700 font-mono">5 Defect Classes</div>
          <span className="text-[11px] text-slate-500 block">
            Road, Waste, Water, Light, Tree (Demo Dataset Classes)
          </span>
        </div>

        <div className="rail-card p-4 rounded-2xl space-y-1.5 bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Evaluation Status</span>
          <div className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 inline-block">
            Awaiting Measured Validation Data
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Zero Fabricated Numbers</span>
        </div>
      </div>

      {/* RESPONSIBLE AI DISCLOSURE CARD */}
      <div className="rail-card p-6 rounded-3xl border border-amber-200 bg-amber-50/70 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Responsible AI Metric Governance Notice</span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          Quantitative model performance metrics (Accuracy, Macro F1, Precision, Recall, Inference Latency) are explicitly labeled as 
          <strong className="text-amber-950 font-mono"> "Awaiting Measured Validation Data"</strong> until evaluated on a verified, held-out test split. UrbanShield AI never presents unverified simulated metrics as real-world ML measurements.
        </p>
      </div>

      {/* DEMO DATASET VERIFICATION COUNTS CARD */}
      <div className="rail-card p-5 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            Verification Workflow Status — Demo Dataset
          </h3>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Verification Workflow Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 block uppercase">Reports Requiring Review</span>
            <span className="text-lg font-bold text-slate-900">2</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] text-emerald-800 block uppercase">Human Confirmed</span>
            <span className="text-lg font-bold text-emerald-700">2</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 block uppercase">Human Overrides</span>
            <span className="text-lg font-bold text-slate-700">0</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-[10px] text-amber-800 block uppercase">Pending Verification</span>
            <span className="text-lg font-bold text-amber-700">0</span>
          </div>
        </div>
      </div>

      {/* LOW-CONFIDENCE PREDICTIONS & HUMAN CORRECTIONS AUDIT LOG */}
      <div className="rail-card p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              Low-Confidence Predictions & Human Corrections Audit
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Log of predictions requiring human coordinator review or manual class overrides.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Human Verification Active
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">US-1049</span>
                <span className="font-bold text-slate-900">Water Leakage Surface Pool</span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Human Verified
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">AI Confidence: 88% • Confirmed by Inspector #108 (Water Board)</p>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">Today, 12:00 PM</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">US-1047</span>
                <span className="font-bold text-slate-900">Pothole & Asphalt Failure</span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  Human Confirmed
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">AI Confidence: 94% • Confirmed by Operator A. Sharma</p>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">Today, 02:30 PM</span>
          </div>
        </div>

      </div>

    </div>
  );
};
