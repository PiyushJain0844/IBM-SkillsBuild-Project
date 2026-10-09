import React from 'react';
import { HelpCircle, Shield, FileText, Code2, Globe2, Layers, Lock } from 'lucide-react';

export const HelpDocs = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-cyan-400" />
          UrbanShield AI Documentation & Blueprint Spec
        </h1>
        <p className="text-xs text-slate-400">
          IBM SkillsBuild Machine Learning & Applied AI Internship Project Blueprint & Architecture
        </p>
      </div>

      {/* Blueprint Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-5 rounded-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-cyan-400" />
            1. SDG 11 Alignment
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            UrbanShield AI directly advances Sustainable Cities & Communities by replacing reactive complaint logs with computer vision triage and geospatial risk prioritization.
          </p>
        </div>

        <div className="glass-card p-5 rounded-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            2. Responsible AI & Privacy
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            AI predictions function exclusively as assistance tools. Human operators must verify predictions before dispatching field crews. Photos undergo privacy redacts.
          </p>
        </div>

        <div className="glass-card p-5 rounded-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            3. Multi-Factor Priority Scoring
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Priority Score = (Vision Confidence × 0.4) + (Severity Index × 0.3) + (Zone Recurrence × 0.2) + (Report Age × 0.1).
          </p>
        </div>

        <div className="glass-card p-5 rounded-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-400" />
            4. API Service Integration
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The frontend connects via VITE_API_BASE_URL to FastAPI/Flask endpoints (`POST /api/reports`, `GET /api/dashboard/summary`, `PATCH /api/reports/:id/verify`).
          </p>
        </div>
      </div>
    </div>
  );
};
