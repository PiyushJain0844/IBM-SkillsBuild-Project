import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const weeklyData = [
  { day: 'Mon', reports: 18, resolved: 14 },
  { day: 'Tue', reports: 24, resolved: 20 },
  { day: 'Wed', reports: 21, resolved: 17 },
  { day: 'Thu', reports: 35, resolved: 28 },
  { day: 'Fri', reports: 30, resolved: 27 },
  { day: 'Sat', reports: 15, resolved: 13 },
  { day: 'Sun', reports: 19, resolved: 16 }
];

const categoryRatio = [
  { name: 'Road Damage / Pothole', value: 38, color: '#059669' },
  { name: 'Garbage Overflow', value: 32, color: '#2563eb' },
  { name: 'Water Pipe Leakage', value: 18, color: '#d97706' },
  { name: 'Broken Streetlight', value: 12, color: '#dc2626' }
];

const aiVsHumanAudit = [
  { category: 'Road Damage', aiPredicted: 45, humanVerified: 43 },
  { category: 'Garbage Overflow', aiPredicted: 38, humanVerified: 36 },
  { category: 'Water Leakage', aiPredicted: 22, humanVerified: 21 },
  { category: 'Broken Lighting', aiPredicted: 15, humanVerified: 15 }
];

export const AuthorityAnalytics = () => {
  const { zones, teams } = useData();

  return (
    <div className="space-y-6 py-2 pb-16 font-sans text-slate-900 px-2 sm:px-0">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
            Civic Analytics Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Spatial issue distribution, resolution efficiency trends, team performance, and Responsible AI verification audit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-extrabold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 shadow-2xs">
            DEMO DATASET
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-xl border border-amber-200 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Demo dataset used for evaluation</span>
          </div>
        </div>
      </div>

      {/* DEMO METRICS DISCLAIMER NOTICE */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <span className="font-medium">
          💡 <strong>Evaluation Note:</strong> Demo values are illustrative and do not represent measured real-world impact.
        </span>
        <span className="font-mono text-[11px] text-slate-400">Prototype Environment</span>
      </div>

      {/* TOP 5 CIVIC ANALYTICS KPI SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="rail-card p-4 bg-white border border-slate-200/90 space-y-1 rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">High-Priority Resolved</span>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono">8 Cases</div>
          <span className="text-[10px] text-emerald-600 font-bold">Human Verified</span>
        </div>

        <div className="rail-card p-4 bg-white border border-slate-200/90 space-y-1 rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">Recurring Identified</span>
          <div className="text-2xl font-extrabold text-amber-600 font-mono">6 Patterns</div>
          <span className="text-[10px] text-amber-700 font-bold">Cluster AI Analysis</span>
        </div>

        <div className="rail-card p-4 bg-white border border-slate-200/90 space-y-1 rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">Hotspots Detected</span>
          <div className="text-2xl font-extrabold text-rose-600 font-mono">3 Zones</div>
          <span className="text-[10px] text-rose-600 font-bold">7-Day Risk Forecast</span>
        </div>

        <div className="rail-card p-4 bg-white border border-slate-200/90 space-y-1 rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">AI-Triaged Reports</span>
          <div className="text-2xl font-extrabold text-blue-600 font-mono">5 / 5</div>
          <span className="text-[10px] text-blue-600 font-bold">Demo Reports</span>
        </div>

        <div className="rail-card p-4 bg-white border border-slate-200/90 space-y-1 rounded-2xl shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Avg Resolution Time</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">4.8 Hours</div>
          <span className="text-[10px] text-slate-400 italic">Simulated Pilot Data</span>
        </div>
      </div>

      {/* ROW 1: PRIMARY TREND CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Complaint Inflow Area Chart (8 cols) */}
        <div className="lg:col-span-8 rail-card p-6 bg-white border border-slate-300/80 space-y-4 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Weekly Complaint Inflow vs Resolution Volume
            </h3>
            <span className="text-xs font-mono text-slate-500 font-bold">Demo Dataset</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorRep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} fontWeight={600} />
                <YAxis stroke="#64748b" fontSize={12} fontWeight={600} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', fontSize: '13px', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="reports" stroke="#2563eb" strokeWidth={3} fill="url(#colorRep)" name="Report Inflow" />
                <Area type="monotone" dataKey="resolved" stroke="#059669" strokeWidth={3} fill="url(#colorRes)" name="Resolved Cases" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut Chart (4 cols) */}
        <div className="lg:col-span-4 rail-card p-6 bg-white border border-slate-300/80 space-y-4 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">Defect Share Ratio</h3>
            <span className="text-xs font-mono text-emerald-600 font-bold">CV Vision AI</span>
          </div>

          <div className="h-52 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryRatio} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={4}>
                  {categoryRatio.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', fontSize: '13px', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs pt-1 border-t border-slate-100">
            {categoryRatio.map((c, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold text-slate-700">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }}></span>
                  {c.name}
                </span>
                <span className="font-mono font-bold text-slate-900">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: RESPONSIBLE AI AUDIT */}
      <div className="rail-card p-6 bg-white border border-slate-300/80 space-y-4 rounded-3xl shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Responsible AI Audit: AI Predicted vs Human Operator Verification
          </h3>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
            Human-in-the-Loop Audit
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aiVsHumanAudit}>
              <XAxis dataKey="category" stroke="#64748b" fontSize={12} fontWeight={600} />
              <YAxis stroke="#64748b" fontSize={12} fontWeight={600} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', fontSize: '13px', borderRadius: '12px' }} />
              <Bar dataKey="aiPredicted" fill="#2563eb" name="AI Predicted" radius={[4, 4, 0, 0]} />
              <Bar dataKey="humanVerified" fill="#059669" name="Human Confirmed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 italic text-center">
          * Demo dataset used for evaluation; demo values are illustrative and do not represent measured real-world impact. All actions require authority approval.
        </p>
      </div>

    </div>
  );
};
