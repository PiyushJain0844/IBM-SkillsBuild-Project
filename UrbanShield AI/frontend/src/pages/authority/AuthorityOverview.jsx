import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { MapView } from '../../components/MapView';
import { 
  Shield, 
  Search, 
  Clock, 
  Activity, 
  AlertTriangle, 
  Flame, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  Zap,
  MapPin,
  HelpCircle,
  FileCheck,
  Sparkles,
  Users,
  AlertCircle
} from 'lucide-react';

export const AuthorityOverview = () => {
  const { issues, stats, updateReportStatus } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssueId, setSelectedIssueId] = useState('US-1047');
  const [isActionApproved, setIsActionApproved] = useState(false);

  const selectedIssue = issues.find(i => i.id === selectedIssueId) || issues[0];

  const filteredIssues = issues.filter(i => 
    i.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApproveAction = () => {
    setIsActionApproved(true);
    updateReportStatus('US-1047', 'Assigned', 'Road Maintenance Team Alpha');
    alert("Authority Approval Confirmed: Recommendation approved for Zone 02. Issue status updated to Assigned.");
  };

  return (
    <div className="space-y-5 pb-12 font-sans text-slate-900">
      
      {/* TOP 6 EXACT REQUIRED KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* KPI 1: ACTIVE CIVIC ISSUES */}
        <div className="rail-card p-3.5 bg-white border border-slate-200/90 flex flex-col justify-between rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Active Civic Issues</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono my-1">{stats.totalActiveIssues || 11}</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Live Active Feed
          </span>
        </div>

        {/* KPI 2: CRITICAL / HIGH PRIORITY */}
        <div className="rail-card p-3.5 bg-white border border-slate-200/90 flex flex-col justify-between rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">Critical / High Priority</span>
          <div className="text-2xl font-extrabold text-rose-600 font-mono my-1">{stats.highPriority || 4}</div>
          <span className="text-[10px] text-rose-600 font-bold">Action Required</span>
        </div>

        {/* KPI 3: AWAITING VERIFICATION */}
        <div className="rail-card p-3.5 bg-white border border-slate-200/90 flex flex-col justify-between rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Awaiting Verification</span>
          <div className="text-2xl font-extrabold text-amber-500 font-mono my-1">{stats.awaitingVerification || 2}</div>
          <span className="text-[10px] text-amber-700 font-bold">AI Triaged</span>
        </div>

        {/* KPI 4: IN PROGRESS */}
        <div className="rail-card p-3.5 bg-white border border-slate-200/90 flex flex-col justify-between rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">In Progress</span>
          <div className="text-2xl font-extrabold text-blue-600 font-mono my-1">{stats.inProgress || 3}</div>
          <span className="text-[10px] text-blue-600 font-bold">Field Team Deployed</span>
        </div>

        {/* KPI 5: RESOLVED TODAY */}
        <div className="rail-card p-3.5 bg-white border border-slate-200/90 flex flex-col justify-between rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">Resolved Today</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono my-1">{stats.resolvedToday || 8}</div>
          <span className="text-[10px] text-emerald-600 font-bold">Human Confirmed</span>
        </div>

        {/* KPI 6: AVERAGE RESOLUTION TIME */}
        <div className="rail-card p-3.5 bg-white border border-slate-200/90 flex flex-col justify-between rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Avg Resolution Time</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono my-1">4.8 Hours</div>
          <span className="text-[10px] text-slate-400 italic">Simulated Pilot Data</span>
        </div>

      </div>

      {/* MAIN 3-COLUMN OPERATIONAL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* LEFT COLUMN: LIVE CIVIC REPORTS QUEUE (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="rail-card p-4 bg-white border border-slate-300/80 space-y-3 rounded-3xl shadow-xs">
            
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                Live Civic Reports
              </h2>
              <Link to="/authority/reports" className="text-xs font-bold text-emerald-600 hover:underline">
                View All →
              </Link>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Report ID / Title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-900 pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1 scrollbar-none">
              {filteredIssues.map((issue) => {
                const isSelected = issue.id === selectedIssueId;
                let statusBadge = "bg-emerald-100 text-emerald-800 border-emerald-200";
                if (issue.severity === "Critical") {
                  statusBadge = "bg-rose-100 text-rose-800 border-rose-200";
                } else if (issue.severity === "High") {
                  statusBadge = "bg-amber-100 text-amber-800 border-amber-200";
                }

                return (
                  <div
                    key={issue.id}
                    onClick={() => setSelectedIssueId(issue.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                      isSelected 
                        ? 'bg-emerald-50/70 border-emerald-500 shadow-xs ring-1 ring-emerald-400/30' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {issue.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge}`}>
                        {issue.severity}
                      </span>
                    </div>

                    <h3 className="text-xs font-extrabold text-slate-900 line-clamp-1">{issue.title}</h3>
                    <p className="text-[10px] text-slate-500 truncate">{issue.address}</p>

                    <div className="flex items-center justify-between text-[10px] font-mono pt-1.5 border-t border-slate-100">
                      <span className="text-slate-500">Score: {issue.priorityScore}/100</span>
                      <span className="text-emerald-700 font-bold">{Math.round((issue.aiConfidence || 0.94) * 100)}% AI Conf.</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* CENTER COLUMN: CIVIC ISSUE MAP & AI RECOMMENDED ACTION (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* CIVIC ISSUE INTELLIGENCE MAP */}
          <MapView reports={issues} height="400px" showHotspots={true} isCitizenView={false} />

          {/* AI RECOMMENDED CIVIC ACTION CARD */}
          <div className="rail-card p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-800/40 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                  AI RECOMMENDATION
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-extrabold text-white">
                "Prioritize Zone 02 for road inspection & asphalt clearance."
              </h4>

              <div className="text-xs text-slate-300 space-y-0.5 leading-relaxed">
                <p><strong>Reason:</strong> 4 recurring structural pothole reports within 200m radius in last 48 hours.</p>
                <p><strong>Supporting Data:</strong> Zone 02 Risk Score: 89/100 (Critical) • Recurrence Trend: ↑ +18%</p>
              </div>

              <span className="inline-block text-[11px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40 mt-1">
                ⚠️ AI recommendation — requires authority approval.
              </span>
            </div>

            <button
              onClick={handleApproveAction}
              disabled={isActionApproved}
              className={`px-5 py-3 rounded-xl font-extrabold text-xs shadow-lg transition-all shrink-0 cursor-pointer ${
                isActionApproved
                  ? 'bg-emerald-700 text-white border border-emerald-400/40 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/30'
              }`}
            >
              {isActionApproved ? '✓ Recommendation Approved' : 'Review & Approve'}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: ADDITIONAL INTELLIGENCE & CIVIC ALERTS (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* ADDITIONAL INTELLIGENCE PANELS */}
          <div className="rail-card p-4 bg-white border border-slate-300/80 space-y-3 rounded-3xl shadow-xs">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-600" />
              Additional Intelligence
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold text-rose-700 block">🔥 Predicted Hotspots</span>
                <p className="text-[11px] text-slate-600">Zone 02 & Zone 07 flagged for 7-day road risk deterioration.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold text-amber-700 block">🔁 Recurring Issues</span>
                <p className="text-[11px] text-slate-600">6 recurring commercial garbage spills in Zone 01.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold text-blue-700 block">🔍 Low-Confidence AI Reports</span>
                <p className="text-[11px] text-slate-600">2 submitted photos flagged for human inspector verification.</p>
              </div>
            </div>
          </div>

          {/* CIVIC ALERTS PANEL */}
          <div className="rail-card p-4 bg-white border border-slate-300/80 space-y-3 rounded-3xl shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                Civic Alerts
              </h3>
              <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                5 Active
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-0.5">
                <span className="font-extrabold text-xs block">Critical road damage</span>
                <p className="text-[11px] text-rose-800">14cm pothole reported on Connaught Place Radial Rd 3.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-0.5">
                <span className="font-extrabold text-xs block">High recurrence zone</span>
                <p className="text-[11px] text-amber-800">Zone 01 Karol Bagh Market overflow frequency ↑ +18%.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 space-y-0.5">
                <span className="font-extrabold text-xs block">Low-confidence AI prediction</span>
                <p className="text-[11px] text-blue-800">Report US-1049 requires human inspector verification.</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 space-y-0.5">
                <span className="font-extrabold text-xs block">Unassigned critical issue</span>
                <p className="text-[11px] text-slate-600">US-1048 awaiting field team allocation.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
