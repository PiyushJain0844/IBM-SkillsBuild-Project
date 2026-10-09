import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ListFilter, MapPin, CheckCircle2, Clock, ShieldAlert, ArrowRight, Sparkles, Activity, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CitizenHome = () => {
  const { issues } = useData();
  const citizenIssues = issues.slice(0, 4);

  return (
    <div className="space-y-8 py-2 pb-16">
      {/* CITIZEN HERO */}
      <section className="rail-card p-6 md:p-10 bg-white border border-slate-300/80 shadow-md relative overflow-hidden rounded-3xl">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Neighborhood Action Portal
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Zone 02 — Central District
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Help improve your neighborhood.
          </h1>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            Report road damage, waste spills, water leaks, or broken streetlights. Your reports are automatically triaged by AI and prioritized for municipal repair teams.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              to="/citizen/report"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4.5 h-4.5" />
              Report an Issue Now
            </Link>
            <Link
              to="/citizen/my-reports"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs md:text-sm rounded-xl border border-slate-300 transition-all flex items-center gap-2"
            >
              <ListFilter className="w-4.5 h-4.5 text-emerald-600" />
              Track My Complaints
            </Link>
          </div>
        </div>
      </section>

      {/* MY PERSONAL CIVIC ACTIVITY STATS */}
      <section className="space-y-4">
        <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-slate-800">
          My Personal Civic Activity
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rail-card p-5 bg-white border border-slate-200 space-y-1 rounded-2xl">
            <span className="text-xs font-bold text-slate-600 block">Reports Submitted</span>
            <div className="text-3xl font-extrabold font-mono text-slate-900">12</div>
            <span className="text-xs text-slate-500 font-medium">Total logged</span>
          </div>

          <div className="rail-card p-5 bg-white border border-slate-200 space-y-1 rounded-2xl">
            <span className="text-xs font-bold text-emerald-700 block">Resolved Issues</span>
            <div className="text-3xl font-extrabold font-mono text-emerald-600">8</div>
            <span className="text-xs text-emerald-700 font-bold">8 of 12 resolved (67%)</span>
          </div>

          <div className="rail-card p-5 bg-white border border-slate-200 space-y-1 rounded-2xl">
            <span className="text-xs font-bold text-blue-700 block">In Repair</span>
            <div className="text-3xl font-extrabold font-mono text-blue-600">3</div>
            <span className="text-xs text-blue-700 font-bold">Squad assigned</span>
          </div>

          <div className="rail-card p-5 bg-white border border-slate-200 space-y-1 rounded-2xl">
            <span className="text-xs font-bold text-amber-700 block">Awaiting Verification</span>
            <div className="text-3xl font-extrabold font-mono text-amber-500">1</div>
            <span className="text-xs text-amber-700 font-bold">AI Triaged</span>
          </div>
        </div>
      </section>

      {/* DEDICATED "YOUR LATEST REPORT" CARD */}
      <section className="rail-card p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl border border-emerald-800/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-emerald-300">
              Your Latest Report Status
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400">
            Last updated: Today, 4:32 PM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 flex items-start gap-4">
            <img 
              src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&q=80" 
              alt="Pothole Damage" 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-700 shrink-0" 
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/40">
                  US-1047
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  ✓ AI Prediction + Human Verified
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-white">Pothole & Asphalt Structural Failure</h4>
              <p className="text-xs text-slate-300 line-clamp-1">Connaught Place Sector 4 • Zone 02 Central District</p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-slate-800 md:pl-6">
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-400 font-semibold block">AI Assessment</span>
              <span className="text-xs font-extrabold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 inline-block">
                High Priority • AI Confidence: 98.4%
              </span>
            </div>

            <Link 
              to="/citizen/report-details/US-1047"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>View Live Progress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* RECENT CIVIC ISSUES NEAR YOU */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-slate-800">
            RECENT CIVIC ISSUES NEAR YOU
          </h2>
          <Link to="/citizen/my-reports" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
            View All My Complaints
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {citizenIssues.map((issue) => (
            <div key={issue.id} className="rail-card p-4 bg-white border border-slate-200 flex items-start gap-4 hover:border-emerald-400 transition-all rounded-2xl">
              <img src={issue.image} alt={issue.title} className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    {issue.id}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    issue.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                    issue.status === 'Verified' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{issue.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{issue.address}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">
                    {new Date(issue.reportedAt).toLocaleDateString()}
                  </span>
                  <Link to={`/citizen/report-details/${issue.id}`} className="text-emerald-600 font-bold hover:underline">
                    Track Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
