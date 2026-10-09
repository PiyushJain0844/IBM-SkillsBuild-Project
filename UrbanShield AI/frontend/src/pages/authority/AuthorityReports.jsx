import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/StatusBadge';
import { SeverityBadge } from '../../components/SeverityBadge';
import { Link } from 'react-router-dom';
import { FileText, Search, Filter, Calendar, ArrowRight, Eye, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const AuthorityReports = () => {
  const { issues } = useData();

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const statusTabs = [
    'All Reports',
    'Pending Verification',
    'Verified',
    'Assigned',
    'In Progress',
    'Resolved',
    'Duplicate / Rejected'
  ];

  // Unique lists for filters
  const categories = ['All', ...Array.from(new Set(issues.map(i => i.category)))];
  const zones = ['All', ...Array.from(new Set(issues.map(i => i.zone)))];
  const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const filteredIssues = issues.filter(issue => {
    // Tab filtering
    if (activeTab === 'Pending Verification' && issue.status !== 'Pending Verification' && issue.status !== 'Submitted') return false;
    if (activeTab === 'Verified' && issue.status !== 'Verified') return false;
    if (activeTab === 'Assigned' && issue.status !== 'Assigned') return false;
    if (activeTab === 'In Progress' && issue.status !== 'In Progress') return false;
    if (activeTab === 'Resolved' && issue.status !== 'Resolved') return false;
    if (activeTab === 'Duplicate / Rejected' && issue.status !== 'Duplicate' && issue.status !== 'Rejected') return false;

    // Dropdown filters
    if (categoryFilter !== 'All' && issue.category !== categoryFilter) return false;
    if (statusFilter !== 'All' && issue.status !== statusFilter) return false;
    if (zoneFilter !== 'All' && issue.zone !== zoneFilter) return false;
    if (severityFilter !== 'All' && issue.severity !== severityFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = issue.id.toLowerCase().includes(q);
      const matchTitle = issue.title.toLowerCase().includes(q);
      const matchZone = issue.zone.toLowerCase().includes(q);
      const matchAddress = (issue.address || '').toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchZone && !matchAddress) return false;
    }

    return true;
  });

  const formatDate = (isoString) => {
    if (!isoString) return 'Oct 8, 2026';
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6 py-2 pb-16 px-2 sm:px-0">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            Civic Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete database of all citizen-submitted and AI-detected municipal civic issues.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{filteredIssues.length} Reports Displayed</span>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200">
        {statusTabs.map(tab => {
          const isActive = (tab === 'All Reports' && activeTab === 'All') || activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab === 'All Reports' ? 'All' : tab)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Filter Controls Row */}
      <div className="rail-card p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 shadow-xs">
        
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-bold"
          >
            <option value="All">All Categories</option>
            {categories.filter(c => c !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-bold"
          >
            <option value="All">All Statuses</option>
            <option value="Pending Verification">Pending Verification</option>
            <option value="Verified">Verified</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Zone Filter */}
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-bold max-w-[160px]"
          >
            <option value="All">All Zones</option>
            {zones.filter(z => z !== 'All').map(z => (
              <option key={z} value={z}>{z.split(' — ')[0]}</option>
            ))}
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-bold"
          >
            <option value="All">All Severities</option>
            {severities.filter(s => s !== 'All').map(sev => (
              <option key={sev} value={sev}>{sev}</option>
            ))}
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 font-bold"
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="This Month">This Month</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report ID, title, zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-xs text-slate-900 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* DESKTOP TABLE VIEW (hidden < md) */}
      <div className="hidden md:block rail-card rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-mono uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3.5">Report ID</th>
                <th className="p-3.5">Issue & Category</th>
                <th className="p-3.5">Zone</th>
                <th className="p-3.5">Reported Date</th>
                <th className="p-3.5">Severity</th>
                <th className="p-3.5">AI Conf.</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Assigned Team</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Report ID */}
                  <td className="p-3.5 font-mono font-bold text-emerald-700">
                    {issue.id}
                  </td>

                  {/* Issue & Category */}
                  <td className="p-3.5">
                    <div className="font-extrabold text-slate-900 line-clamp-1">{issue.title}</div>
                    <div className="text-[11px] text-slate-500">{issue.category}</div>
                  </td>

                  {/* Zone */}
                  <td className="p-3.5 text-slate-700 font-medium truncate max-w-[150px]">
                    {issue.zone.split(' — ')[0]}
                  </td>

                  {/* Reported Date */}
                  <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                    {formatDate(issue.reportedAt)}
                  </td>

                  {/* Severity */}
                  <td className="p-3.5">
                    <SeverityBadge severity={issue.severity} />
                  </td>

                  {/* AI Confidence */}
                  <td className="p-3.5 font-mono text-emerald-700 font-bold">
                    {Math.round((issue.aiConfidence || 0.94) * 100)}% AI Conf.
                  </td>

                  {/* Status */}
                  <td className="p-3.5">
                    <StatusBadge status={issue.status} />
                  </td>

                  {/* Assigned Team */}
                  <td className="p-3.5 text-slate-700 text-[11px] font-semibold truncate max-w-[160px]">
                    {issue.assignedTeam || 'Unassigned'}
                  </td>

                  {/* Action */}
                  <td className="p-3.5 text-right">
                    <Link
                      to={`/authority/reports/${issue.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Report</span>
                    </Link>
                  </td>

                </tr>
              ))}
              {filteredIssues.length === 0 && (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-slate-500 text-xs italic">
                    No reports match the selected filters or search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE RESPONSIVE CARDS VIEW (visible < md) */}
      <div className="md:hidden space-y-3">
        {filteredIssues.map((issue) => (
          <div 
            key={issue.id}
            className="rail-card p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {issue.id}
              </span>
              <StatusBadge status={issue.status} />
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{issue.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{issue.category} • {issue.zone.split(' — ')[0]}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Severity</span>
                <SeverityBadge severity={issue.severity} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">AI Confidence</span>
                <span className="font-bold text-emerald-700">{Math.round((issue.aiConfidence || 0.94) * 100)}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Reported Date</span>
                <span className="text-slate-700 font-semibold">{formatDate(issue.reportedAt)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Assigned Team</span>
                <span className="text-slate-800 font-semibold truncate block max-w-[130px]">{issue.assignedTeam || 'Unassigned'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Link
                to={`/authority/reports/${issue.id}`}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Report</span>
              </Link>
            </div>
          </div>
        ))}

        {filteredIssues.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs italic">
            No reports match the selected filters or search criteria.
          </div>
        )}
      </div>

    </div>
  );
};
