import React from 'react';
import { Flame, AlertTriangle, Info, ArrowUpRight } from 'lucide-react';

export const SeverityBadge = ({ severity, score }) => {
  const getStyle = (sev) => {
    switch (sev) {
      case 'Critical':
        return {
          bg: 'bg-rose-950/80 text-rose-300 border-rose-700/60 shadow-rose-950/50',
          icon: Flame,
          label: 'CRITICAL'
        };
      case 'High':
        return {
          bg: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
          icon: AlertTriangle,
          label: 'HIGH'
        };
      case 'Medium':
        return {
          bg: 'bg-sky-950/80 text-sky-300 border-sky-700/60',
          icon: ArrowUpRight,
          label: 'MEDIUM'
        };
      case 'Low':
      default:
        return {
          bg: 'bg-slate-900/80 text-slate-300 border-slate-700',
          icon: Info,
          label: 'LOW'
        };
    }
  };

  const style = getStyle(severity);
  const Icon = style.icon;

  return (
    <div className="inline-flex items-center gap-1.5">
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-mono text-xs font-semibold border ${style.bg}`}>
        <Icon className="w-3.5 h-3.5" />
        <span>{style.label}</span>
      </span>
      {score !== undefined && (
        <span className="text-xs font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
          Priority: {score}/100
        </span>
      )}
    </div>
  );
};
