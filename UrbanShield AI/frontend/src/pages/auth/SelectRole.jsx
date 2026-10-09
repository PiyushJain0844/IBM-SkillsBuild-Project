import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Building2, HardHat, Building, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SelectRole = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const handleChooseRole = (role) => {
    setRole(role);
    if (role === 'authority') {
      navigate('/authority');
    } else {
      navigate('/citizen');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 bg-city-grid flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-blue-600 text-white font-bold shadow-md mb-2">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Select Your Workspace Role</h1>
          <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto">
            Choose your portal role to access customized civic tools, queues, and workflows.
          </p>
        </div>

        {/* Grid of Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* CITIZEN CARD */}
          <div 
            onClick={() => handleChooseRole('citizen')}
            className="civic-card p-6 rounded-2xl hover:border-blue-600 hover:shadow-md cursor-pointer transition-all space-y-4 group bg-white border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <User className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                Primary Flow
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Citizen Portal
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Report civic defects, capture image evidence, attach GPS pins, and track complaint status from submission to resolution.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
              <span>Enter Citizen Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* AUTHORITY CARD */}
          <div 
            onClick={() => handleChooseRole('authority')}
            className="civic-card p-6 rounded-2xl hover:border-blue-600 hover:shadow-md cursor-pointer transition-all space-y-4 group bg-white border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Command Center
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Authority & Operator Portal
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Prioritize urgent issues, verify AI vision triage, dispatch municipal squads, inspect live GIS maps, and analyze hotspots.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
              <span>Enter Command Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* FIELD INSPECTOR CARD */}
          <div 
            onClick={() => handleChooseRole('authority')}
            className="civic-card p-5 rounded-2xl hover:border-slate-300 cursor-pointer transition-all space-y-3 bg-white border border-slate-200"
          >
            <div className="p-2.5 w-fit rounded-lg bg-slate-100 text-slate-700">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Field Inspector</h3>
              <p className="text-xs text-slate-500 mt-0.5">On-site verification queue & mobile dispatch tools.</p>
            </div>
          </div>

          {/* FACILITY MANAGER CARD */}
          <div 
            onClick={() => handleChooseRole('authority')}
            className="civic-card p-5 rounded-2xl hover:border-slate-300 cursor-pointer transition-all space-y-3 bg-white border border-slate-200"
          >
            <div className="p-2.5 w-fit rounded-lg bg-slate-100 text-slate-700">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Facility Manager</h3>
              <p className="text-xs text-slate-500 mt-0.5">Campus maintenance, recurring issue prevention & Civic DNA.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
