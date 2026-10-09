import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReports } from '../context/ReportContext';
import { useRole } from '../context/RoleContext';
import { MapPin, Clock, ShieldCheck, UserCheck, AlertTriangle, ArrowLeft, CheckCircle2, Building2 } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { SeverityBadge } from '../components/SeverityBadge';
import { Timeline } from '../components/Timeline';
import { MapView } from '../components/MapView';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const ReportDetails = () => {
  const { id } = useParams();
  const { role } = useRole();
  const { reports, handleVerify, handleUpdateStatus } = useReports();

  const [report, setReport] = useState(null);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', description: '', onConfirm: () => {} });
  const [selectedAssignee, setSelectedAssignee] = useState("Road & Infrastructure Team B");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const found = reports.find(r => r.id === id);
    if (found) {
      setReport(found);
      setSelectedStatus(found.status);
    }
  }, [id, reports]);

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-200">Report {id} Not Found</h2>
        <Link to="/my-reports" className="text-xs text-cyan-400 font-semibold hover:underline">
          Return to My Reports →
        </Link>
      </div>
    );
  }

  const triggerVerificationModal = () => {
    setModalConfig({
      isOpen: true,
      title: "Confirm Human Verification",
      description: `You are verifying AI prediction '${report.predictedCategory}' for report ${report.id}. This will confirm dispatch priority.`,
      onConfirm: async () => {
        const updated = await handleVerify(report.id, "Operator #402");
        setReport(updated);
      }
    });
  };

  const triggerStatusModal = () => {
    setModalConfig({
      isOpen: true,
      title: `Update Status to '${selectedStatus}'`,
      description: `Change operational status for report ${report.id}. Assignee: ${selectedAssignee}`,
      onConfirm: async () => {
        const updated = await handleUpdateStatus(report.id, selectedStatus, selectedAssignee);
        setReport(updated);
      }
    });
  };

  return (
    <div className="space-y-6 py-4 pb-16">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to={role === 'authority' ? "/queue" : "/my-reports"} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {report.id}
              </span>
              <h1 className="text-lg font-bold text-slate-100">{report.title}</h1>
            </div>
            <p className="text-xs text-slate-400">{report.address || report.zone}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={report.status} />
          <SeverityBadge severity={report.severity} score={report.priorityScore} />
        </div>
      </div>

      {/* Grid: Left Evidence & Map vs Right AI Triage & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: 7 cols */}
        <div className="lg:col-span-7 space-y-6">
          {/* Evidence Image */}
          <div className="glass-card p-4 rounded-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Visual Evidence Image</h3>
            <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
              <img src={report.image} alt={report.title} className="w-full max-h-96 object-cover" />
              <div className="absolute bottom-2 right-2 font-mono text-[10px] bg-slate-950/80 text-slate-300 px-2 py-1 rounded border border-slate-800">
                Lat {report.latitude}, Lng {report.longitude}
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Geospatial Context Map</h3>
            <MapView reports={[report]} height="280px" showHotspots={false} />
          </div>

          {/* Citizen Description */}
          <div className="glass-card p-4 rounded-xl space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Submitted Observations</h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              {report.description}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI Triage Breakdown */}
          <div className="glass-card p-5 rounded-xl space-y-4 border border-cyan-900/40">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-cyan-400" />
                AI Vision Triage Output
              </h3>
              <span className="text-[10px] font-mono text-cyan-400">Engine v1.2</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Predicted Category:</span>
                <span className="font-semibold text-slate-100">{report.predictedCategory}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Vision Confidence:</span>
                <span className="font-mono font-bold text-cyan-400">{Math.round(report.confidence * 100)}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Priority Score:</span>
                <span className="font-mono font-bold text-rose-400">{report.priorityScore} / 100</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Human Verification:</span>
                <span className={`font-semibold ${report.isVerifiedByHuman ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {report.isVerifiedByHuman ? `Verified (${report.verifiedBy})` : 'Pending Verification'}
                </span>
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
              <span className="text-[11px] font-semibold text-slate-300 block mb-1">Reasoning:</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">{report.aiReasoning}</p>
            </div>
          </div>

          {/* Authority Controls Panel (Visible to Authority Users) */}
          {role === 'authority' && (
            <div className="glass-card p-5 rounded-xl space-y-4 border border-blue-900/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Authority Dispatch & Status Control</h3>

              {!report.isVerifiedByHuman && (
                <button
                  onClick={triggerVerificationModal}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Verify AI Classification
                </button>
              )}

              <div className="space-y-3 pt-2">
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Assign Responsible Unit:</span>
                  <select
                    value={selectedAssignee}
                    onChange={(e) => setSelectedAssignee(e.target.value)}
                    className="w-full bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Road & Infrastructure Team B">Road & Infrastructure Team B</option>
                    <option value="Jal Board Rapid Response Team 1">Jal Board Rapid Response Team 1</option>
                    <option value="Electrical Maintenance Unit 4">Electrical Maintenance Unit 4</option>
                    <option value="Horticulture Quick Clearance">Horticulture Quick Clearance</option>
                    <option value="Municipal Waste Compactor Squad">Municipal Waste Compactor Squad</option>
                  </select>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Update Status Workflow:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-slate-950 text-xs text-slate-200 px-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <button
                  onClick={triggerStatusModal}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-semibold rounded-lg transition-all"
                >
                  Update Report Status
                </button>
              </div>
            </div>
          )}

          {/* Workflow Timeline */}
          <div className="glass-card p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Audit History & Timeline</h3>
            <Timeline history={report.history} />
          </div>
        </div>
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
