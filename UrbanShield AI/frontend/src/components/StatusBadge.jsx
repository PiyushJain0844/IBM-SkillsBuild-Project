import React from 'react';
import { Clock, CheckCircle2, ShieldCheck, AlertCircle, UserCheck, PlayCircle, CheckCheck } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const getBadgeStyle = (st) => {
    switch (st) {
      case 'Submitted':
        return { bg: 'bg-slate-800/80 text-slate-300 border-slate-700', icon: Clock };
      case 'AI Triaged':
        return { bg: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/50', icon: AlertCircle };
      case 'Pending Verification':
        return { bg: 'bg-amber-950/80 text-amber-300 border-amber-700/50', icon: Clock };
      case 'Verified':
        return { bg: 'bg-blue-950/80 text-blue-300 border-blue-700/50', icon: ShieldCheck };
      case 'Assigned':
        return { bg: 'bg-purple-950/80 text-purple-300 border-purple-700/50', icon: UserCheck };
      case 'In Progress':
        return { bg: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/50', icon: PlayCircle };
      case 'Resolved':
        return { bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50', icon: CheckCheck };
      default:
        return { bg: 'bg-slate-800 text-slate-300 border-slate-700', icon: CheckCircle2 };
    }
  };

  const style = getBadgeStyle(status);
  const Icon = style.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${style.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};
