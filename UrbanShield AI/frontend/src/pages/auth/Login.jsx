import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  SlidersHorizontal, 
  Users, 
  Navigation, 
  RefreshCw, 
  HelpCircle, 
  ShieldCheck, 
  Eye,
  EyeOff,
  Flame,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState('citizen'); // 'citizen' | 'authority'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleLaunch = (roleToLaunch) => {
    const targetRole = roleToLaunch || selectedRole;
    login(email || (targetRole === 'authority' ? 'official@urbanshield.ai' : 'citizen@urbanshield.ai'), password || 'demo123', targetRole);
    if (targetRole === 'authority') {
      navigate('/authority');
    } else {
      navigate('/citizen');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-sans antialiased text-slate-100 bg-slate-900">
      
      {/* FULL-BLEED SMART CITY BACKGROUND (Brighter, Welcoming Overlay) */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/hero_bg.jpg" 
          alt="UrbanShield Smart City Operations" 
          className="w-full h-full object-cover opacity-85 filter brightness-[0.95] contrast-[1.05]"
        />
        {/* Adjusted Background Overlay Darkness by ~25% for a welcoming feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/60 to-slate-950/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/65"></div>
      </div>

      {/* TOP FLOATING HEADER */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-4 md:px-8 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-900/40 border border-emerald-400/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight leading-none drop-shadow">
              URBANSHIELD <span className="text-emerald-400">AI</span>
            </h1>
            <p className="text-xs text-slate-200 font-medium mt-1 drop-shadow">
              AI-Powered Civic Intelligence Platform
            </p>
          </div>
        </div>

        {/* Clean Civic Intelligence Platform Badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-slate-900/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>CIVIC INTELLIGENCE PLATFORM</span>
        </div>
      </header>

      {/* MAIN HERO CONTENT & AUTHENTICATION PANEL */}
      <main className="w-full max-w-7xl mx-auto my-auto px-4 md:px-8 py-6 relative z-20 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: PLATFORM HERO TITLE & BLUEPRINT HIGHLIGHTS (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left pr-0 lg:pr-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Civic Intelligence & Actionable Response
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05] drop-shadow-xl">
              From Citizen Complaints <br />
              to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Predictive Civic Action</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed max-w-2xl drop-shadow-md">
              Helping citizens report civic issues and enabling authorities to prioritize, verify, resolve and predict recurring problems.
            </p>

            {/* THREE BLUEPRINT CORE NOVELTY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              
              {/* CARD 1: AI CIVIC VISION */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md space-y-1.5 hover:border-emerald-500/50 transition-colors shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Eye className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">AI Civic Vision</h4>
                <p className="text-[11px] text-slate-300 leading-snug">Detect civic issues directly from submitted images.</p>
              </div>

              {/* CARD 2: CIVIC PRIORITY ENGINE */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md space-y-1.5 hover:border-cyan-500/50 transition-colors shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Civic Priority Engine</h4>
                <p className="text-[11px] text-slate-300 leading-snug">Combine severity, context and recurrence to prioritize action.</p>
              </div>

              {/* CARD 3: PREDICTIVE HOTSPOTS */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md space-y-1.5 hover:border-amber-500/50 transition-colors shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Predictive Hotspots</h4>
                <p className="text-[11px] text-slate-300 leading-snug">Identify locations with increasing civic-risk patterns.</p>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: GLASSMORPHIC AUTHENTICATION CARD (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-7 md:p-8 shadow-2xl space-y-5 relative overflow-hidden">
              
              {/* Subtle top ambient glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"></div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">Platform Access</h3>
                  <p className="text-xs text-slate-400">Select role to sign in to URBANSHIELD AI</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
              </div>

              {/* ROLE SELECTOR TAB BAR */}
              <div className="p-1 rounded-2xl bg-slate-950/80 border border-slate-800 grid grid-cols-2 gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSelectedRole('citizen')}
                  className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer text-center ${
                    selectedRole === 'citizen'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50 border border-emerald-400/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Citizen / Resident
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('authority')}
                  className={`py-2.5 px-3 rounded-xl transition-all cursor-pointer text-center ${
                    selectedRole === 'authority'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50 border border-emerald-400/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Municipal Official
                </button>
              </div>

              {/* REALISTIC FORM (EMAIL, PASSWORD, REMEMBER ME, FORGOT PASSWORD) */}
              <form onSubmit={(e) => { e.preventDefault(); handleLaunch(); }} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    {selectedRole === 'authority' ? 'Official Email / Designation' : 'Email / Mobile / Citizen ID'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={selectedRole === 'authority' ? 'official@urbanshield.ai' : 'citizen@urbanshield.ai'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/90 text-sm text-white placeholder-slate-500 px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950/90 text-sm text-white placeholder-slate-500 px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* REMEMBER ME & FORGOT PASSWORD */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input 
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-emerald-600 focus:ring-emerald-500 cursor-pointer" 
                    />
                    <span>Remember me</span>
                  </label>

                  <a 
                    href="#forgot" 
                    onClick={(e) => { e.preventDefault(); alert('For demo evaluation, click preset demo buttons below or click Sign In.'); }}
                    className="text-emerald-400 hover:underline font-medium"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* SUBMIT BUTTON WITH ROLE-SPECIFIC CTA */}
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/30"
                >
                  <span>
                    {selectedRole === 'authority' ? 'Open Authority Workspace' : 'Continue as Citizen'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* REGISTRATION / PROVISIONING FOOTNOTE */}
              <div className="text-center text-xs text-slate-400 pt-1">
                {selectedRole === 'citizen' ? (
                  <span>
                    Don't have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => handleLaunch('citizen')}
                      className="text-emerald-400 font-bold hover:underline cursor-pointer"
                    >
                      Create Citizen Account
                    </button>
                  </span>
                ) : (
                  <span className="text-slate-400 italic">
                    Authority accounts are provisioned by municipal administration.
                  </span>
                )}
              </div>

              {/* SECONDARY SEPARATED DEMO SECTION */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                
                <div className="flex items-center gap-3">
                  <div className="h-[1px] bg-slate-800 flex-1"></div>
                  <span className="text-[11px] font-mono text-slate-400 font-bold tracking-wider uppercase">
                    Demo Mode
                  </span>
                  <div className="h-[1px] bg-slate-800 flex-1"></div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleLaunch('citizen')}
                    className="py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer text-center shadow-xs"
                  >
                    Try Citizen Demo
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLaunch('authority')}
                    className="py-2.5 px-3 bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 text-xs font-bold rounded-xl border border-emerald-800/60 transition-all cursor-pointer text-center shadow-xs"
                  >
                    Try Authority Demo
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 text-center italic">
                  * Demo accounts use simulated project data.
                </p>

              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM CORE CAPABILITY BAR */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-1 text-center hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Incident Prioritization</h4>
              <p className="text-[10px] text-slate-400 leading-tight">Ranks complaints by urgency & impact score.</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-1 text-center hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/20">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Squad Capability Match</h4>
              <p className="text-[10px] text-slate-400 leading-tight">Assigns best crew & equipment for defect.</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-1 text-center hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/20">
                <Navigation className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Route Feasibility</h4>
              <p className="text-[10px] text-slate-400 leading-tight">Verifies road access & vehicle travel time.</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-1 text-center hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/20">
                <RefreshCw className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Dynamic Re-planning</h4>
              <p className="text-[10px] text-slate-400 leading-tight">Real-time updates when field conditions shift.</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-1 text-center hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Explainable Decisions</h4>
              <p className="text-[10px] text-slate-400 leading-tight">Transparent AI reasoning breakdown for triage.</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-1 text-center hover:border-slate-700 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white">Human-in-the-Loop</h4>
              <p className="text-[10px] text-slate-400 leading-tight">AI recommends, municipal coordinator confirms.</p>
            </div>

          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 py-4 px-4 md:px-8 border-t border-slate-800/60 text-xs text-slate-400 relative z-20 font-medium">
        <span>• URBANSHIELD AI Civic Platform</span>
        <span className="font-mono text-[11px] text-slate-500">DATA SOURCES: GIS MAPS • CWC • MUNICIPAL TELEMETRY</span>
      </footer>

    </div>
  );
};
