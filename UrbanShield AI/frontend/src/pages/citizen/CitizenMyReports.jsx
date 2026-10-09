import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Search, PlusCircle, ArrowRight, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export const CitizenMyReports = () => {
  const { issues } = useData();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = issues.filter(i => {
    if (selectedStatus !== "All" && i.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return i.id.toLowerCase().includes(q) || i.title.toLowerCase().includes(q);
    }
    return true;
  });

  const statuses = ["All", "Pending", "Verified", "Assigned", "In Progress", "Resolved"];

  return (
    <div className="space-y-6 py-2 pb-16 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">My Reports</h1>
          <p className="text-xs text-slate-500">Track your civic complaints and their resolution status.</p>
        </div>

        <Link
          to="/citizen/report"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Report New Issue
        </Link>
      </div>

      {/* Filter Tabs & Search (Horizontally Scrollable Filters on Mobile) */}
      <div className="rail-card p-4 rounded-2xl space-y-3 bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 md:pb-0 scrollbar-none whitespace-nowrap">
            {statuses.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedStatus === st 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-xs text-slate-900 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
            />
          </div>

        </div>
      </div>

      {/* List of Report Cards (Stacked 1-column on Mobile, 2-column on Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(issue => (
          <div key={issue.id} className="rail-card p-5 rounded-2xl space-y-3 hover:border-emerald-400 transition-all bg-white border border-slate-200/80 shadow-xs">
            
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {issue.id}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                issue.status === 'Verified' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {issue.status}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <img src={issue.image} alt={issue.title} className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-200 shrink-0" />
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-1">{issue.title}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-2">{issue.description}</p>
                <div className="text-[10px] font-mono text-slate-400">
                  GPS: {issue.latitude?.toFixed(4)}°N, {issue.longitude?.toFixed(4)}°E
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono text-[11px]">Reported: {new Date(issue.reportedAt).toLocaleDateString()}</span>
              <Link to={`/citizen/report-details/${issue.id}`} className="text-emerald-600 font-bold hover:underline flex items-center gap-1">
                <span>View Tracking Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
