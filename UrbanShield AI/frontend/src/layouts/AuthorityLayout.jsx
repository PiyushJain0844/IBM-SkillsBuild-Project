import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Bell, Clock, LogOut, Radio, User, Activity, Menu, X, LayoutDashboard, SlidersHorizontal, MapPin, Flame, Wrench, FileText, BarChart3, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthorityLayout = () => {
  const { user, setRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [timeString, setTimeString] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when drawer open & listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'OVERVIEW', path: '/authority', icon: LayoutDashboard },
    { name: 'PRIORITY QUEUE', path: '/authority/queue', icon: SlidersHorizontal },
    { name: 'LIVE MAP', path: '/authority/map', icon: MapPin },
    { name: 'HOTSPOTS', path: '/authority/hotspots', icon: Flame },
    { name: 'OPERATIONS', path: '/authority/assignments', icon: Wrench },
    { name: 'REPORTS', path: '/authority/reports', icon: FileText },
    { name: 'ANALYTICS', path: '/authority/analytics', icon: BarChart3 },
    { name: 'MODEL MONITOR', path: '/authority/monitor', icon: Cpu },
  ];

  return (
    <div className="min-h-screen bg-[#eaf0f6] text-slate-900 bg-rail-grid flex flex-col font-sans antialiased">
      
      {/* FLOATING PILL NAVBAR HEADER */}
      <header className="sticky top-2 sm:top-3 z-40 w-full max-w-7xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2">
        <div className="rail-pill-nav px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md border border-slate-300 shadow-md rounded-2xl sm:rounded-full">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight leading-none">
                URBANSHIELD AI
              </h1>
              <span className="text-[10px] text-emerald-600 font-mono font-bold block mt-0.5">
                AI-Powered Civic Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Visible ≥ 1024px) */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/90 p-1 rounded-full border border-slate-200 text-[11px] font-mono font-bold">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/authority'}
                className={({ isActive }) => `
                  px-3 py-1.5 rounded-full transition-all whitespace-nowrap
                  ${isActive 
                    ? 'bg-emerald-600 text-white shadow-xs font-extrabold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Status Badges */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Live Clock */}
            <div className="hidden xl:flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono text-[11px] font-bold">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{timeString || '9:35:23 PM'}</span>
            </div>

            {/* Operator Control Status Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-mono font-bold">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span className="truncate max-w-[150px]">AUTHORITY WORKSPACE</span>
            </div>

            {/* Switch to Citizen or Logout */}
            <button
              onClick={() => {
                setRole('citizen');
                navigate('/citizen');
              }}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
              title="Switch to Citizen Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
            aria-label="Open Authority Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

        </div>
      </header>

      {/* MOBILE SLIDE-OUT DRAWER WITH BACKDROP (< 1024px) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          
          {/* Dark Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Slide-out Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-5 border-l border-slate-200 z-10 animate-in slide-in-from-right duration-200">
            
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 block leading-none">URBANSHIELD AI</span>
                    <span className="text-[10px] text-emerald-600 font-mono font-bold">Authority Workspace</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/authority'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all
                        ${isActive 
                          ? 'bg-emerald-600 text-white shadow-xs' 
                          : 'text-slate-700 hover:bg-slate-100'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>

            </div>

            {/* Drawer Footer Status & Switch Role */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                <div className="text-[10px] font-mono text-emerald-700 font-bold uppercase flex items-center gap-1">
                  <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                  <span>Authority Control Room</span>
                </div>
                <div className="text-xs font-bold text-slate-900">{user?.name || 'Municipal Official'}</div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRole('citizen');
                  navigate('/citizen');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs border border-slate-300 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Switch to Citizen Portal</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Main Operational Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-12">
        <Outlet />
      </main>

    </div>
  );
};
