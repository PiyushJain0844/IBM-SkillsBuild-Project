import React, { useState } from 'react';
import { useReports } from '../context/ReportContext';
import { ReportCard } from '../components/ReportCard';
import { EmptyState } from '../components/EmptyState';
import { LoadingState } from '../components/LoadingState';
import { Search, PlusCircle, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyReports = () => {
  const { reports, loading } = useReports();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return <LoadingState message="Fetching your submitted civic reports..." />;
  }

  const filteredReports = reports.filter(r => {
    if (selectedStatus !== "All" && r.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const statuses = ["All", "Submitted", "AI Triaged", "Verified", "Assigned", "In Progress", "Resolved"];

  return (
    <div className="space-y-6 py-4 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">My Submitted Reports</h1>
          <p className="text-xs text-slate-400">Track real-time AI triage, authority verification, and repair progress.</p>
        </div>
        <Link
          to="/report-issue"
          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Report New Issue
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none">
            {statuses.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-xs text-slate-200 pl-9 pr-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Report Cards */}
      {filteredReports.length === 0 ? (
        <EmptyState
          title="No Reports Found"
          message="No citizen reports match your selected status filter or search query."
          actionText="Reset Filters"
          onAction={() => { setSelectedStatus("All"); setSearchQuery(""); }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};
