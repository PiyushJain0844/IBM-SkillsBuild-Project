import React from 'react';
import { useData } from '../../context/DataContext';
import { HardHat, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AuthorityAssignments = () => {
  const { teams } = useData();

  return (
    <div className="space-y-6 py-2 pb-16 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-emerald-600" />
            Field Operations & Team Workloads
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor municipal repair team capacity, active issue workloads, and zone coverage.
          </p>
        </div>

        <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
          {teams.length} Active Field Teams
        </span>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teams.map((team) => {
          const loadRatio = Math.round((team.activeIssues / team.capacity) * 100);
          const isHeavy = loadRatio >= 80;

          return (
            <div key={team.id} className="rail-card p-5 rounded-3xl space-y-4 bg-white border border-slate-200 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${
                    isHeavy ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}>
                    {team.status || (isHeavy ? 'High Capacity Load' : 'Available')}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{team.name}</h3>
                  <span className="text-[11px] text-slate-500 font-mono block mt-0.5">Assigned Zone: {team.zone}</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-600">Active Workload:</span>
                    <span className="font-mono text-emerald-700">{team.activeIssues} / {team.capacity} issues</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5">
                    <div 
                      className={`h-full rounded-full ${isHeavy ? 'bg-rose-600' : 'bg-emerald-600'}`} 
                      style={{ width: `${loadRatio}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between items-center mt-2">
                <span className="truncate pr-2">Leader: {team.leader}</span>
                <Link to="/authority/queue" className="text-emerald-600 font-extrabold hover:underline shrink-0">
                  Queue →
                </Link>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
