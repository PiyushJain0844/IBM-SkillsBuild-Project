import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/StatusBadge';
import { SeverityBadge } from '../../components/SeverityBadge';
import { MapView } from '../../components/MapView';
import { Timeline } from '../../components/Timeline';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { ArrowLeft, ShieldCheck, Building2, UserCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AuthorityReportDetails = () => {
  const { id } = useParams();
  const { issues, teams, verifyReport, updateReportStatus } = useData();

  const issue = issues.find(i => i.id === id) || issues[0];

  const [selectedTeam, setSelectedTeam] = useState(issue.assignedTeam || teams[0].name);
  const [selectedStatus, setSelectedStatus] = useState(issue.status);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', description: '', onConfirm: () => {} });

  const triggerVerifyModal = () => {
    setModalConfig({
      isOpen: true,
      title: `Verify AI Classification for ${issue.id}`,
      description: `Confirm that AI category '${issue.aiPrediction}' is accurate. This action records human operator confirmation in compliance with Responsible AI standards.`,
      onConfirm: () => {
        verifyReport(issue.id, "Operator A. Sharma");
        alert("Report verified!");
      }
    });
  };

  const triggerUpdateModal = () => {
    setModalConfig({
      isOpen: true,
      title: `Update Status & Team Assignment`,
      description: `Assign '${selectedTeam}' and update status to '${selectedStatus}'.`,
      onConfirm: () => {
        updateReportStatus(issue.id, selectedStatus, selectedTeam);
        alert("Issue workflow status updated!");
      }
    });
  };

  return (
    <div className="space-y-6 py-2 pb-16">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/authority/reports" className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-xs">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {issue.id}
              </span>
              <h1 className="text-lg font-bold text-slate-900">{issue.title}</h1>
            </div>
            <p className="text-xs text-slate-500">{issue.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={issue.status} />
          <SeverityBadge severity={issue.severity} score={issue.priorityScore} />
        </div>
      </div>

      {/* Grid: 3-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Large Image & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="civic-card p-4 rounded-xl space-y-2 bg-white border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Citizen Evidence Image</h3>
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              <img src={issue.image} alt={issue.title} className="w-full max-h-80 object-cover" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">GIS Context Map Pin</h3>
            <MapView reports={[issue]} height="260px" showHotspots={false} />
          </div>
        </div>

        {/* CENTER COLUMN: AI Prediction & Priority Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="civic-card p-5 rounded-xl space-y-4 bg-white border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                AI Vision & Priority Engine
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Model v0.3</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">AI Classification:</span>
                <span className="font-semibold text-slate-900">{issue.aiPrediction}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Vision Confidence:</span>
                <span className="font-mono font-bold text-emerald-600">{Math.round((issue.aiConfidence || 0.94) * 100)}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Priority Score:</span>
                <span className="font-mono font-bold text-rose-600">{issue.priorityScore} / 100</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Human Verification:</span>
                <span className={`font-semibold ${issue.verifiedBy ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {issue.verifiedBy ? `Verified (${issue.verifiedBy})` : 'Awaiting Verification'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="text-[11px] font-bold text-slate-800 block mb-1">Explainable AI Reasoning:</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">{issue.aiReasoning}</p>
            </div>
          </div>

          <div className="civic-card p-5 rounded-xl space-y-3 bg-white border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Audit History Timeline</h3>
            <Timeline history={issue.history} />
          </div>
        </div>

        {/* RIGHT COLUMN: Authority Control Panel (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="civic-card p-5 rounded-xl space-y-4 bg-white border border-emerald-200 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">Authority Decision Panel</h3>

            {!issue.verifiedBy && (
              <button
                onClick={triggerVerifyModal}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                Verify AI Prediction
              </button>
            )}

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Assign Field Operations Team:</label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.name}>{t.name} ({t.activeIssues}/{t.capacity})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Update Issue Workflow:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600"
                >
                  <option value="Verified">Verified</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <button
                onClick={triggerUpdateModal}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                Apply Assignment Update
              </button>
            </div>
          </div>
        </div>
      </div>

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
