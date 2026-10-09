import React from 'react';

export const StatCard = ({ title, value, icon: Icon, trend, trendLabel, color = "cyan", isDemo = true }) => {
  const getColorClasses = (c) => {
    switch(c) {
      case 'rose': return { iconBg: 'bg-rose-950/60 text-rose-400 border-rose-800/40', border: 'hover:border-rose-500/40' };
      case 'amber': return { iconBg: 'bg-amber-950/60 text-amber-400 border-amber-800/40', border: 'hover:border-amber-500/40' };
      case 'emerald': return { iconBg: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40', border: 'hover:border-emerald-500/40' };
      case 'purple': return { iconBg: 'bg-purple-950/60 text-purple-400 border-purple-800/40', border: 'hover:border-purple-500/40' };
      case 'cyan':
      default: return { iconBg: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/40', border: 'hover:border-cyan-500/40' };
    }
  };

  const style = getColorClasses(color);

  return (
    <div className={`glass-card p-5 rounded-xl transition-all duration-300 relative overflow-hidden ${style.border}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-1">
            {title}
          </span>
          <div className="text-2xl md:text-3xl font-bold font-mono text-slate-100">
            {value}
          </div>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg border ${style.iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        {trend && (
          <span className={`font-mono font-medium ${trend.startsWith('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
            {trend} <span className="text-slate-500 font-sans">{trendLabel || 'from last week'}</span>
          </span>
        )}
        {isDemo && (
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800">
            Demo Data
          </span>
        )}
      </div>
    </div>
  );
};
