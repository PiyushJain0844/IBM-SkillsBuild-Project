import React from 'react';
import { useReports } from '../context/ReportContext';
import { StatCard } from '../components/StatCard';
import { MapView } from '../components/MapView';
import { ReportCard } from '../components/ReportCard';
import { LoadingState } from '../components/LoadingState';
import { 
  FileText, 
  Flame, 
  Clock, 
  CheckCheck, 
  Timer, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { reports, summary, loading } = useReports();

  if (loading) {
    return <LoadingState message="Loading Municipal Command Center Telemetry..." />;
  }

  const criticalQueue = reports
    .filter(r => r.status !== 'Resolved')
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 3);

  return (
    <div className="space-y-6 py-4 pb-16">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            Authority Command Overview
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              Live Operator Telemetry
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time civic intelligence, vision triage queue, and spatial hotspot monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/queue"
            className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <AlertTriangle className="w-4 h-4" />
            Full Priority Queue ({reports.length})
          </Link>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Reports"
          value={summary?.totalReports || reports.length}
          icon={FileText}
          trend="+12%"
          color="cyan"
          isDemo={true}
        />
        <StatCard
          title="Critical Issues"
          value={summary?.criticalIssues || 2}
          icon={Flame}
          trend="+2"
          trendLabel="requires immediate Patch"
          color="rose"
          isDemo={true}
        />
        <StatCard
          title="Pending Verification"
          value={summary?.pendingVerification || 3}
          icon={Clock}
          trend="Needs Operator"
          color="amber"
          isDemo={true}
        />
        <StatCard
          title="Resolved Cases"
          value={summary?.resolvedCount || 1}
          icon={CheckCheck}
          trend="+8"
          color="emerald"
          isDemo={true}
        />
        <StatCard
          title="Avg Resolution Time"
          value="4.2h"
          icon={Timer}
          trend="-18%"
          trendLabel="vs last month"
          color="purple"
          isDemo={true}
        />
      </div>

      {/* MAIN GRID: MAP + PRIORITY QUEUE SNAPSHOT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT 7 COLS: LIVE MAP */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Live Geospatial Operations Map
            </h2>
            <Link to="/map" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
              Expanded Map View
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <MapView reports={reports} height="420px" showHotspots={true} />
        </div>

        {/* RIGHT 5 COLS: TOP CRITICAL QUEUE SNAPSHOT */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Highest Priority Queue Snapshot
            </h2>
            <Link to="/queue" className="text-xs text-rose-400 hover:underline flex items-center gap-1 font-mono">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {criticalQueue.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: CATEGORY DISTRIBUTION & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Category Breakdown Progress */}
        <div className="glass-card p-5 rounded-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Category Volume & AI Confidence</h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Waste Overflow</span>
                <span className="font-mono text-cyan-400">42% (91% Avg Conf.)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Road Damage / Pothole</span>
                <span className="font-mono text-rose-400">35% (94% Avg Conf.)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-400 h-full rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Water Leakage</span>
                <span className="font-mono text-blue-400">15% (88% Avg Conf.)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Broken Streetlight / Tree</span>
                <span className="font-mono text-amber-400">8% (95% Avg Conf.)</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Live System Log Activity Stream */}
        <div className="glass-card p-5 rounded-xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Operator Audit Activity Stream</h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-emerald-400 block">US-1051 Resolved</span>
                <span className="text-[11px] text-slate-400">Horticulture team cleared fallen tree obstruction.</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">13:45</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-cyan-400 block">US-1047 Verified</span>
                <span className="text-[11px] text-slate-400">Operator #402 confirmed critical pothole rating.</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">14:30</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-amber-400 block">US-1048 AI Triaged</span>
                <span className="text-[11px] text-slate-400">Computer Vision flagged 91% waste overflow.</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">15:10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
