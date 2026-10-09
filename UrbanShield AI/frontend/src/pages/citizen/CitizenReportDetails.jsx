import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { Timeline } from '../../components/Timeline';

export const CitizenReportDetails = () => {
  const { id } = useParams();
  const { issues } = useData();

  const issue = issues.find(i => i.id === id) || issues[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/citizen/my-reports" className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" />
          Back to My Complaints
        </Link>
        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
          Report ID: {issue.id}
        </span>
      </div>

      {/* Main Details Card */}
      <div className="civic-card p-6 rounded-2xl space-y-6 bg-white border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs text-slate-500 font-medium">{issue.category}</span>
            <h1 className="text-xl font-extrabold text-slate-900">{issue.title}</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              {issue.address}
            </p>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {issue.status}
          </span>
        </div>

        {/* Image */}
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <img src={issue.image} alt={issue.title} className="w-full max-h-80 object-cover" />
        </div>

        {/* AI Triage Summary */}
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2 text-xs">
          <span className="font-bold text-blue-900 block">AI Vision Triage & Scoring</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <span className="text-[10px] text-slate-500">AI Category</span>
              <span className="font-semibold text-slate-900 block">{issue.aiPrediction}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500">Vision Confidence</span>
              <span className="font-mono font-bold text-blue-600 block">{Math.round(issue.aiConfidence * 100)}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500">Priority Score</span>
              <span className="font-mono font-bold text-rose-600 block">{issue.priorityScore} / 100</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500">Human Status</span>
              <span className="font-semibold text-emerald-700 block">
                {issue.verifiedBy ? 'Human Verified' : 'Pending Verification'}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Citizen Observations</h3>
          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
            {issue.description}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Complaint Progress Timeline</h3>
          <Timeline history={issue.history} />
        </div>
      </div>
    </div>
  );
};
