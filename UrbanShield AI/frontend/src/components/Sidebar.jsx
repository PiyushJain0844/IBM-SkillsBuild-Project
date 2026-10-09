import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Shield, 
  Home, 
  PlusCircle, 
  ListFilter, 
  LayoutDashboard, 
  Map, 
  AlertTriangle, 
  BarChart3, 
  Cpu, 
  HelpCircle, 
  Settings, 
  X,
  Globe2,
  Sparkles
} from 'lucide-react';
import { useRole } from '../context/RoleContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { role } = useRole();

  const citizenNav = [
    { name: 'Home Landing', path: '/', icon: Home },
    { name: 'Report Issue', path: '/report-issue', icon: PlusCircle },
    { name: 'My Reports', path: '/my-reports', icon: ListFilter }
  ];

  const authorityNav = [
    { name: 'Overview Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Issue Map', path: '/map', icon: Map },
    { name: 'Priority Queue', path: '/queue', icon: AlertTriangle },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Model Monitor', path: '/monitor', icon: Cpu }
  ];

  const activeNav = role === 'authority' ? authorityNav : citizenNav;

  const NavItem = ({ item }) => {
    const Icon = item.icon;
    return (
      <NavLink
        to={item.path}
        onClick={onClose}
        className={({ isActive }) => `
          flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
          ${isActive 
            ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 text-cyan-300 border border-cyan-800/60 shadow-lg shadow-cyan-950/40' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
          }
        `}
      >
        <Icon className="w-4 h-4 shrink-0" />
        <span className="truncate">{item.name}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 glass-panel border-r border-slate-800 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Header & Logo */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-100 tracking-tight flex items-center gap-1">
                  UrbanShield AI
                </h2>
                <p className="text-[10px] text-slate-400 font-mono">Civic Intelligence Platform</p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-slate-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Role Label */}
          <div className="mb-4 px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400">Navigation Portal</span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${role === 'authority' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'}`}>
              {role === 'authority' ? 'Authority' : 'Citizen'}
            </span>
          </div>

          {/* Primary Navigation Items */}
          <nav className="space-y-1">
            {activeNav.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </nav>

          {/* SDG 11 Section */}
          <div className="mt-6 p-3 rounded-xl bg-gradient-to-br from-slate-900/90 to-cyan-950/30 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-1">
              <Globe2 className="w-4 h-4" />
              <span>SDG 11 Commitment</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Sustainable Cities & Communities — Transforming civic issues into predictive action.
            </p>
          </div>
        </div>

        {/* Footer & Support Links */}
        <div className="pt-4 border-t border-slate-800 space-y-1 text-xs">
          <NavLink
            to="/help"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Help & Documentation</span>
          </NavLink>
          <div className="px-3 pt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>v1.2.0-Prod</span>
            <span>IBM SkillsBuild</span>
          </div>
        </div>
      </aside>
    </>
  );
};
