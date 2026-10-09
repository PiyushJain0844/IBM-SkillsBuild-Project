import React, { useState } from 'react';
import { Search, Bell, Menu, Shield, User, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { useRole } from '../context/RoleContext';

export const Navbar = ({ onMobileMenuOpen, pageTitle = "Command Center" }) => {
  const { role, toggleRole } = useRole();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
      {/* Left section: Mobile menu button + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-900 transition-colors"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base md:text-lg font-bold text-slate-100 flex items-center gap-2">
            {pageTitle}
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Sparkles className="w-3 h-3" />
              SDG 11 Platform
            </span>
          </h1>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report ID, location, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 text-xs text-slate-200 pl-9 pr-4 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500 placeholder-slate-500 font-sans"
          />
        </div>
      </div>

      {/* Right section: Role switcher + Notifications + Profile */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Button */}
        <button
          onClick={toggleRole}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
          title="Switch view mode between Citizen and Authority"
        >
          {role === 'authority' ? (
            <>
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Mode:</span>
              <span className="text-cyan-400 font-mono">AUTHORITY</span>
            </>
          ) : (
            <>
              <User className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Mode:</span>
              <span className="text-emerald-400 font-mono">CITIZEN</span>
            </>
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 glass-card p-3 rounded-xl border border-slate-700 shadow-xl z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span className="text-xs font-bold text-slate-200">Alerts & System Logs</span>
                <span className="text-[10px] font-mono text-cyan-400">3 New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-rose-400">
                    <span>US-1047 Critical Pothole</span>
                    <span className="text-slate-500 font-mono">14:30</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Verified by Operator #402. Dispatched team B.</p>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-amber-400">
                    <span>US-1048 Waste Overflow</span>
                    <span className="text-slate-500 font-mono">15:10</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">AI Triaged with 91% confidence. Needs human verification.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-slate-950 font-mono">
            {role === 'authority' ? 'OP' : 'CZ'}
          </div>
        </div>
      </div>
    </header>
  );
};
