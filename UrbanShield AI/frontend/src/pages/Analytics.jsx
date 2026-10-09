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
import { BarChart3, AlertCircle, TrendingUp, Layers, MapPin } from 'lucide-react';
import { MOCK_HOTSPOTS } from '../services/mockService';

const timeData = [
  { day: 'Mon', reports: 14, resolved: 12 },
  { day: 'Tue', reports: 22, resolved: 18 },
  { day: 'Wed', reports: 19, resolved: 15 },
  { day: 'Thu', reports: 31, resolved: 24 },
  { day: 'Fri', reports: 28, resolved: 26 },
  { day: 'Sat', reports: 12, resolved: 10 },
  { day: 'Sun', reports: 16, resolved: 14 }
];

const categoryData = [
  { name: 'Waste Overflow', value: 42, color: '#00f0ff' },
  { name: 'Road Damage', value: 35, color: '#f43f5e' },
  { name: 'Water Leakage', value: 15, color: '#3b82f6' },
  { name: 'Broken Streetlight', value: 8, color: '#f59e0b' }
];

const severityData = [
  { severity: 'Critical', count: 12, fill: '#f43f5e' },
  { severity: 'High', count: 28, fill: '#f59e0b' },
  { severity: 'Medium', count: 34, fill: '#06b6d4' },
  { severity: 'Low', count: 18, fill: '#3b82f6' }
];

export const Analytics = () => {
  return (
    <div className="space-y-6 py-4 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            Civic Analytics & Trend Intelligence
          </h1>
          <p className="text-xs text-slate-400">
            Spatial distribution, category breakdown, resolution performance, and predictive hotspot analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1.5 rounded-lg border border-amber-800/60">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>Demo Data — Awaiting Measured Pilot Evaluation</span>
        </div>
      </div>

      {/* CHART GRID ROW 1: TIME TREND & CATEGORY PIE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Reports Over Time Area Chart */}
        <div className="lg:col-span-7 glass-card p-5 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Weekly Issue Inflow vs Resolution Volume
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Last 7 Days</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeData}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1628', borderColor: '#1e293b', color: '#f8fafc', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="reports" stroke="#00f0ff" fillOpacity={1} fill="url(#colorReports)" name="Report Inflow" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Donut Chart */}
        <div className="lg:col-span-5 glass-card p-5 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Category Share Ratio</h3>
            <span className="text-[10px] font-mono text-cyan-400">Computer Vision</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1628', borderColor: '#1e293b', color: '#f8fafc', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                <span className="text-slate-300 truncate">{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: SEVERITY BAR CHART + HOTSPOT RISK PREDICTION TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Severity Distribution Bar Chart */}
        <div className="lg:col-span-5 glass-card p-5 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">Severity Distribution</h3>
            <span className="text-[10px] font-mono text-slate-400">Total 92 Cases</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData}>
                <XAxis dataKey="severity" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1628', borderColor: '#1e293b', color: '#f8fafc', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Predictive Hotspot Table */}
        <div className="lg:col-span-7 glass-card p-5 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Predictive Zone Hotspot Risk Modeling
            </h3>
            <span className="text-[10px] font-mono text-cyan-400">Civic DNA Model</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-mono text-[11px]">
                <tr>
                  <th className="p-2.5">Hotspot ID</th>
                  <th className="p-2.5">Zone Name</th>
                  <th className="p-2.5">Primary Defect</th>
                  <th className="p-2.5">Volume</th>
                  <th className="p-2.5">Risk Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {MOCK_HOTSPOTS.map((hs) => (
                  <tr key={hs.id} className="hover:bg-slate-900/40">
                    <td className="p-2.5 font-mono text-cyan-400 font-bold">{hs.id}</td>
                    <td className="p-2.5 text-slate-200 font-medium">{hs.zone}</td>
                    <td className="p-2.5 text-slate-300">{hs.primaryIssue}</td>
                    <td className="p-2.5 text-slate-400 font-mono">{hs.recentCount} ({hs.trend})</td>
                    <td className="p-2.5 font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        hs.riskLevel === 'Critical' 
                          ? 'bg-rose-950 text-rose-400 border border-rose-800' 
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {hs.riskScore} / 100 ({hs.riskLevel})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
