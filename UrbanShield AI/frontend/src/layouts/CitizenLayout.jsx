import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Shield, LogOut, User, Menu, X, Home, Camera, ClipboardList, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CitizenLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'HOME', path: '/citizen', icon: Home },
    { name: 'REPORT ISSUE', path: '/citizen/report', icon: Camera },
    { name: 'MY REPORTS', path: '/citizen/my-reports', icon: ClipboardList },
    { name: 'NEARBY MAP', path: '/citizen/nearby', icon: MapPin },
  ];

  // Close drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open & listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
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

  return (
    <div className="min-h-screen bg-[#eaf0f6] text-slate-900 bg-rail-grid flex flex-col font-sans antialiased">
      
      {/* FLOATING PILL NAVBAR HEADER */}
      <header className="sticky top-2 sm:top-3 z-40 w-full max-w-7xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2">
        <div className="rail-pill-nav px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md border border-slate-300 shadow-md rounded-2xl sm:rounded-full">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-slate-900 tracking-tight leading-none">
                URBANSHIELD AI
              </h1>
              <span className="text-[10px] sm:text-xs text-emerald-600 font-mono font-bold uppercase block mt-0.5">
                Citizen Portal
              </span>
            </div>
          </div>

          {/* Desktop Nav Links (Visible ≥ 768px) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200 text-xs font-mono font-bold">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/citizen'}
                className={({ isActive }) => `
                  px-3.5 py-2 rounded-full transition-all whitespace-nowrap
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

          {/* Desktop User Profile & Logout (Visible ≥ 768px) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                PJ
              </div>
              <span className="text-xs font-bold text-slate-800">{user?.name || 'Citizen'}</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all border border-rose-200 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Mobile Hamburger Button (< 768px) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

        </div>
      </header>

      {/* MOBILE SLIDE-OUT DRAWER WITH BACKDROP (< 768px) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          
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
                  <span className="font-extrabold text-sm text-slate-900">URBANSHIELD AI</span>
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
                      end={item.path === '/citizen'}
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

            {/* Drawer Footer User Profile & Sign Out */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono shrink-0">
                  PJ
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Piyush Jain'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Citizen ID: US-8021</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs border border-rose-200 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between py-6 border-t border-slate-300/60 text-xs text-slate-500 font-semibold px-4 gap-2">
        <span>• URBANSHIELD AI Civic Platform</span>
        <span>Civic Intelligence & Dynamic Resource Allocation</span>
      </footer>

    </div>
  );
};
