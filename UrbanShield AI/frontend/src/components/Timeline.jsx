import React from 'react';
import { Clock, UserCheck, ShieldCheck, AlertCircle, PlayCircle, CheckCheck } from 'lucide-react';

export const Timeline = ({ history = [] }) => {
  if (!history || history.length === 0) return null;

  const getIcon = (status) => {
    switch (status) {
      case 'Submitted': return Clock;
      case 'AI Triaged': return AlertCircle;
      case 'Verified': return ShieldCheck;
      case 'Assigned': return UserCheck;
      case 'In Progress': return PlayCircle;
      case 'Resolved': return CheckCheck;
      default: return Clock;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {history.map((event, idx) => {
          const Icon = getIcon(event.status);
          const isLast = idx === history.length - 1;

          return (
            <li key={idx}>
              <div className="relative pb-8">
                {!isLast && (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-800" aria-hidden="true" />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-xs font-semibold text-slate-200">
                        {event.status} <span className="text-slate-400 font-normal">by {event.actor}</span>
                      </p>
                      {event.notes && (
                        <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">{event.notes}</p>
                      )}
                    </div>
                    <div className="whitespace-nowrap text-right text-[11px] font-mono text-slate-500">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
