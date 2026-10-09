import React, { useState } from 'react';
import { useReports } from '../context/ReportContext';
import { useRole } from '../context/RoleContext';
import { StatusBadge } from '../components/StatusBadge';
import { SeverityBadge } from '../components/SeverityBadge';
import { LoadingState } from '../components/LoadingState';
import { Link } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, ArrowUpDown, Filter, Search, ArrowRight } from 'lucide-react';

export const PriorityQueue = () => {
  const { reports, loading, handleVerify } = useReports();
  const { role } = useRole();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return <LoadingState message="Calculating Priority Scores..." />;
  }

  // Sort by Priority Score descending
  const sortedReports = [...reports]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .filter(r => {
      if (categoryFilter !== "All" && r.category !== categoryFilter) return false;
      if (severityFilter !== "All" && r.severity !== severityFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          r.id.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.zone.toLowerCase().includes(q)
        );
      }
      return true;
    });

  return (
    <div className="space-y-6 py-4 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            Triage Priority Queue
          </h1>
          <p className="text-xs text-slate-400">
            Issues ranked algorithmically by severity, historical frequency, and location vulnerability.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1.5 rounded-lg border border-cyan-800">
          <ArrowUpDown className="w-4 h-4" />
          <span>Sorted by Priority Score ↓</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Categories</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Waste Overflow">Waste Overflow</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Broken Streetlight">Broken Streetlight</option>
            <option value="Fallen Tree / Obstruction">Fallen Tree</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-950 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report ID or zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 text-xs text-slate-200 pl-9 pr-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Priority Queue Table View */}
      <div className="glass-card rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Score</th>
                <th className="p-3.5">Report ID</th>
                <th className="p-3.5">Issue & Category</th>
                <th className="p-3.5">Zone & Address</th>
                <th className="p-3.5">Severity</th>
                <th className="p-3.5">AI Conf.</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sortedReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-900/50 transition-colors">
                  {/* Priority Score Cell */}
                  <td className="p-3.5 font-mono">
                    <span className={`inline-flex items-center px-2 py-1 rounded font-bold text-xs ${
                      report.priorityScore >= 90 
                        ? 'bg-rose-950 text-rose-400 border border-rose-800' 
                        : report.priorityScore >= 75
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-slate-900 text-cyan-400 border border-slate-700'
                    }`}>
                      {report.priorityScore}
                    </span>
                  </td>

                  {/* ID Cell */}
                  <td className="p-3.5 font-mono font-bold text-cyan-400">
                    {report.id}
                  </td>

                  {/* Issue Cell */}
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-200 line-clamp-1">{report.title}</div>
                    <div className="text-[11px] text-slate-400">{report.category}</div>
                  </td>

                  {/* Zone Cell */}
                  <td className="p-3.5 text-slate-300">
                    <div className="font-medium truncate max-w-[160px]">{report.zone}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>

                  {/* Severity */}
                  <td className="p-3.5">
                    <SeverityBadge severity={report.severity} />
                  </td>

                  {/* AI Confidence */}
                  <td className="p-3.5 font-mono text-cyan-400">
                    {Math.round(report.confidence * 100)}%
                  </td>

                  {/* Status */}
                  <td className="p-3.5">
                    <StatusBadge status={report.status} />
                  </td>

                  {/* Action */}
                  <td className="p-3.5 text-right space-x-2">
                    <Link
                      to={`/report/${report.id}`}
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:underline"
                    >
                      Inspect
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
