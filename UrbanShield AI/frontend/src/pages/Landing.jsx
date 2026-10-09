import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Sparkles, 
  ArrowRight, 
  Globe2, 
  Cpu, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  Activity, 
  AlertTriangle,
  FileText,
  Lock,
  Layers
} from 'lucide-react';
import { MapView } from '../components/MapView';
import { useReports } from '../context/ReportContext';

export const Landing = () => {
  const { reports } = useReports();

  return (
    <div className="space-y-16 py-6 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden glass-panel rounded-2xl p-8 md:p-12 border border-slate-800 bg-radial-glow">
        <div className="max-w-3xl space-y-6 relative z-10">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Sparkles className="w-3.5 h-3.5" />
              SDG 11: Sustainable Cities & Communities
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Human-in-the-Loop AI
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800">
              <Globe2 className="w-3.5 h-3.5" />
              Geospatial Intelligence
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
            UrbanShield AI
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 text-2xl sm:text-4xl mt-2 font-bold">
              From Citizen Complaints to Predictive Civic Action
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
            Turn everyday civic complaints into structured, prioritized and actionable intelligence.
            Using computer vision, multi-factor priority scoring, and spatial analytics to help city operators resolve issue hotspots.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/report-issue"
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              Report an Issue
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-cyan-400" />
              Open Authority Dashboard
            </Link>
          </div>
        </div>

        {/* Hero Interactive Map Preview Card */}
        <div className="mt-10 pt-8 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Live Civic Hotspot Map Preview
            </h3>
            <span className="text-xs font-mono text-slate-400">Smart City Zone 01–04</span>
          </div>
          <MapView reports={reports} height="360px" showHotspots={true} />
        </div>
      </section>

      {/* HOW IT WORKS WORKFLOW */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">End-to-End Civic Intelligence Workflow</h2>
          <p className="text-xs text-slate-400">
            Citizen report → Computer vision triage → Priority scoring → Operator verification → Dispatch & resolution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-200">1. Citizen Submission</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mobile-first upload of evidence image, geolocation pin, and optional category description.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-200">2. AI Vision Triage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Computer vision classifies defect (Pothole, Waste, Streetlight) and estimates confidence & severity.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-200">3. Priority Queue</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-factor priority score ranks issues by severity, location risk, and issue age for operators.
            </p>
          </div>

          <div className="glass-card p-5 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="text-sm font-bold text-slate-200">4. Human Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Operator verifies AI prediction, dispatches municipal crew, and tracks resolution analytics.
            </p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-slate-100">Key Platform Modules</h2>
          <span className="text-xs font-mono text-cyan-400">UrbanShield Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-xl space-y-3">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-200">Computer Vision Classifier</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-class identification for road damage, waste overflow, water main leaks, dark streetlights, and fallen trees.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-3">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200">Civic Priority Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Algorithmic scoring combining AI severity, historical issue recurrence, report age, and proximity to sensitive zones.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-3">
            <Lock className="w-6 h-6 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-200">Responsible AI & Privacy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strict Human-in-the-Loop design. Privacy warnings to avoid faces and license plates. Unverified AI tags.
            </p>
          </div>
        </div>
      </section>

      {/* SDG 11 COMMITMENT BANNER */}
      <section className="glass-panel p-8 rounded-2xl border border-cyan-900/40 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-blue-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase font-bold">UN Sustainable Development Goals</span>
          <h3 className="text-xl font-bold text-slate-100">Aligned with SDG 11 — Sustainable Cities & Communities</h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            UrbanShield AI empowers citizens and local authorities to build safer, more resilient urban infrastructure through transparent digital reporting and proactive maintenance triage.
          </p>
        </div>

        <Link
          to="/report-issue"
          className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-cyan-400/20 transition-all shrink-0"
        >
          Submit Citizen Report
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
        <div>
          <span>© 2026 UrbanShield AI • IBM SkillsBuild Internship Blueprint</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/help" className="hover:text-slate-300">Architecture Spec</Link>
          <Link to="/monitor" className="hover:text-slate-300">Model Telemetry</Link>
          <a href="#top" className="hover:text-slate-300">Back to Top ↑</a>
        </div>
      </footer>
    </div>
  );
};
