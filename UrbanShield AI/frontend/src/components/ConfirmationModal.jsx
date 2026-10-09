import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmationModal = ({ isOpen, title, description, confirmText = "Confirm Action", onConfirm, onClose, isDanger = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="glass-card w-full max-w-md p-6 rounded-xl border border-slate-700 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${isDanger ? 'bg-rose-950/80 text-rose-400 border border-rose-800' : 'bg-cyan-950/80 text-cyan-400 border border-cyan-800'}`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-slate-100 bg-slate-900 border border-slate-800 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-xs font-bold text-slate-950 rounded-lg shadow-lg transition-all ${
              isDanger 
                ? 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/20' 
                : 'bg-cyan-400 hover:bg-cyan-300 shadow-cyan-500/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
