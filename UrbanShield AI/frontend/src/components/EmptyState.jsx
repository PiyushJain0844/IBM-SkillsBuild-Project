import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({ title = "No Reports Found", message = "There are no civic reports matching your search or filter criteria.", actionText, onAction }) => {
  return (
    <div className="glass-panel p-12 rounded-xl text-center flex flex-col items-center justify-center border border-slate-800">
      <div className="p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-500 mb-4">
        <Inbox className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-slate-200">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm mt-1 mb-6">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
