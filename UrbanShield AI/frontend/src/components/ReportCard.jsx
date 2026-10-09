import React from 'react';
import { MapPin, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { SeverityBadge } from './SeverityBadge';
import { Link } from 'react-router-dom';

export const ReportCard = ({ report }) => {
  return (
    <div className="glass-card p-4 rounded-xl hover:border-cyan-500/40 transition-all group flex flex-col justify-between">
      <div>
        {/* Header bar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              {report.id}
            </span>
            <span className="text-xs text-slate-400 font-medium">{report.category}</span>
          </div>
          <StatusBadge status={report.status} />
        </div>

        {/* Thumbnail & Title */}
        <div className="flex items-start gap-3 mb-3">
          <img 
            src={report.image} 
            alt={report.title} 
            className="w-16 h-16 rounded-lg object-cover border border-slate-800 shrink-0" 
          />
          <div>
            <h4 className="text-sm font-semibold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
              {report.title}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2 mt-1">
              {report.description}
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-1.5 text-xs text-slate-400 mb-4 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{report.address || report.zone}</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-1 text-cyan-400 font-mono">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{Math.round(report.confidence * 100)}% AI Conf.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer & Action */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        <SeverityBadge severity={report.severity} score={report.priorityScore} />
        <Link 
          to={`/report/${report.id}`} 
          className="inline-flex items-center gap-1 text-xs text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
