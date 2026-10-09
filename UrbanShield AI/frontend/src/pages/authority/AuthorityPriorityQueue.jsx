import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/StatusBadge';
import { SeverityBadge } from '../../components/SeverityBadge';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { Link } from 'react-router-dom';
import { AlertTriangle, Filter, Search, ArrowUpDown, ShieldCheck, UserCheck, ArrowRight, HelpCircle, Sparkles, Eye } from 'lucide-react';

export const AuthorityPriorityQueue = () => {
  const { issues, verifyReport } = useData();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExplainIssue, setSelectedExplainIssue] = useState(issues[0] || null);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', description: '', onConfirm: () => {} });

  const sortedIssues = [...issues]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .filter(i => {
      if (categoryFilter !== "All" && i.category !== categoryFilter) return false;
      if (severityFilter !== "All" && i.severity !== severityFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return i.id.toLowerCase().includes(q) || i.title.toLowerCase().includes(q) || i.zone.toLowerCase().includes(q);
      }
      return true;
    });

  const handleQuickVerify = (issue) => {
    setModalConfig({
      isOpen: true,
      title: `Confirm AI Triage for ${issue.id}`,
      description: `Verify that AI prediction '${issue.aiPrediction}' is accurate for ${issue.title}. This will confirm operational field team assignment.`,
      onConfirm: () => {
        verifyReport(issue.id, "Operator A. Sharma");
        alert(`Issue ${issue.id} verified! Status updated.`);
      }
    });
  };

  return (
    <div className="space-y-6 py-2 pb-16 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-600" />
            Triage Priority Queue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Issues ranked using severity, report age, recurrence, spatial risk, and AI confidence.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 font-bold">
          <ArrowUpDown className="w-4 h-4 text-emerald-600" />
          <span>Priority Score Descending ↓</span>
        </div>
      </div>

      {/* PRIORITY SCORE EXPLANATION BREAKDOWN PANEL */}
      {selectedExplainIssue && (
        <div className="rail-card p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl border border-emerald-800/40 shadow-xl space-y-3">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                Priority Score Explanation Breakdown — {selectedExplainIssue.id}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-amber-300/80 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Demo weighting methodology
              </span>
              <span className="text-xs font-mono font-bold text-amber-300">
                Total Score: {selectedExplainIssue.priorityScore} / 100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Severity Component</span>
              <span className="text-sm font-bold text-rose-400">+35 pts</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Recurrence Weight</span>
              <span className="text-sm font-bold text-amber-400">+20 pts</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Report Age Factor</span>
              <span className="text-sm font-bold text-blue-400">+15 pts</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Location Risk</span>
              <span className="text-sm font-bold text-teal-400">+16 pts</span>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 block">AI Conf. Weight</span>
              <span className="text-sm font-bold text-emerald-400">+10 pts</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter Controls */}
      <div className="rail-card p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-bold"
          >
            <option value="All">All Categories</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Garbage Overflow">Garbage Overflow</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Broken Streetlight">Broken Streetlight</option>
            <option value="Fallen Tree / Obstruction">Fallen Tree</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-bold"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ID, title or zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-xs text-slate-900 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* DESKTOP QUEUE TABLE (hidden < md) */}
      <div className="hidden md:block rail-card rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3.5">Score</th>
                <th className="p-3.5">Report ID</th>
                <th className="p-3.5">Issue & Category</th>
                <th className="p-3.5">Zone</th>
                <th className="p-3.5">Severity</th>
                <th className="p-3.5">AI Conf.</th>
                <th className="p-3.5">Assigned Team</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedIssues.map((issue) => (
                <tr 
                  key={issue.id} 
                  onClick={() => setSelectedExplainIssue(issue)}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                    selectedExplainIssue?.id === issue.id ? 'bg-emerald-50/50' : ''
                  }`}
                >
                  <td className="p-3.5 font-mono">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold text-xs ${
                      issue.priorityScore >= 90 ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      issue.priorityScore >= 75 ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {issue.priorityScore}
                    </span>
                  </td>

                  <td className="p-3.5 font-mono font-bold text-emerald-700">
                    {issue.id}
                  </td>

                  <td className="p-3.5">
                    <div className="font-extrabold text-slate-900 line-clamp-1">{issue.title}</div>
                    <div className="text-[11px] text-slate-500">{issue.category}</div>
                  </td>

                  <td className="p-3.5 text-slate-700 font-medium truncate max-w-[150px]">
                    {issue.zone.split(' — ')[0]}
                  </td>

                  <td className="p-3.5">
                    <SeverityBadge severity={issue.severity} />
                  </td>

                  <td className="p-3.5 font-mono text-emerald-700 font-bold">
                    {Math.round((issue.aiConfidence || 0.94) * 100)}%
                  </td>

                  <td className="p-3.5 text-slate-700 text-[11px] font-semibold truncate max-w-[150px]">
                    {issue.assignedTeam || 'Unassigned'}
                  </td>

                  <td className="p-3.5">
                    <StatusBadge status={issue.status} />
                  </td>

                  <td className="p-3.5 text-right space-x-2">
                    {!issue.verifiedBy && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleQuickVerify(issue); }}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition-all cursor-pointer shadow-xs"
                      >
                        Verify
                      </button>
                    )}
                    <Link
                      to={`/authority/reports/${issue.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold hover:underline"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE QUEUE CARDS (visible < md) */}
      <div className="md:hidden space-y-3">
        {sortedIssues.map((issue) => (
          <div
            key={issue.id}
            onClick={() => setSelectedExplainIssue(issue)}
            className={`rail-card p-4 rounded-2xl bg-white border transition-all space-y-3 shadow-xs ${
              selectedExplainIssue?.id === issue.id ? 'border-emerald-500 ring-1 ring-emerald-400/30' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {issue.id}
              </span>
              <span className="font-mono text-xs font-extrabold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                Priority: {issue.priorityScore}/100
              </span>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{issue.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{issue.category}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge severity={issue.severity} />
              <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                {issue.zone.split(' — ')[0]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">AI Confidence</span>
                <span className="font-bold text-emerald-700">{Math.round((issue.aiConfidence || 0.94) * 100)}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Status</span>
                <StatusBadge status={issue.status} />
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-400 block uppercase">Assigned Team</span>
                <span className="text-slate-800 font-semibold">{issue.assignedTeam || 'Unassigned'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              {!issue.verifiedBy && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleQuickVerify(issue); }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Verify AI
                </button>
              )}
              <Link
                to={`/authority/reports/${issue.id}`}
                onClick={(e) => e.stopPropagation()}
                className="ml-auto inline-flex items-center gap-1 text-xs text-emerald-600 font-bold hover:underline py-1.5"
              >
                <span>Inspect →</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        description={modalConfig.description}
        onConfirm={modalConfig.onConfirm}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
};
