import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AIResultCard } from '../components/AIResultCard';
import { ArrowLeft, ListFilter, Building2, CheckCircle2 } from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { useReports } from '../context/ReportContext';

export const AIResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useRole();
  const { handleVerify, latestSubmittedReport } = useReports();

  const report = location.state?.report || latestSubmittedReport;

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-200">No recent submission context found.</h2>
        <Link to="/report-issue" className="text-xs text-cyan-400 font-semibold hover:underline">
          Return to Report Issue →
        </Link>
      </div>
    );
  }

  const onVerify = async () => {
    await handleVerify(report.id, "Operator #402 (Municipal Ops)");
    alert("Prediction successfully verified by human operator!");
    navigate(`/report/${report.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link to="/my-reports" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Back to Reports
        </Link>
        <span className="font-mono text-xs text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
          Report ID: {report.id}
        </span>
      </div>

      {/* Hero Success Badge */}
      <div className="glass-panel p-4 rounded-xl border border-emerald-800/40 bg-emerald-950/20 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-100">Report Successfully Logged & Triaged</h3>
          <p className="text-xs text-slate-300">
            UrbanShield Vision Model executed initial classification. Issue placed into priority queue.
          </p>
        </div>
      </div>

      {/* Main AI Result Component */}
      <AIResultCard report={report} onVerifyClick={role === 'authority' ? onVerify : null} />

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <Link
          to="/my-reports"
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
        >
          <ListFilter className="w-4 h-4 text-cyan-400" />
          Track Status in My Reports
        </Link>

        {role === 'authority' && (
          <button
            onClick={onVerify}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            Human Verification & Dispatch
          </button>
        )}
      </div>
    </div>
  );
};
