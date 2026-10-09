import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({ message = "Loading civic intelligence..." }) => {
  return (
    <div className="glass-panel p-12 rounded-xl text-center flex flex-col items-center justify-center border border-slate-800">
      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
      <span className="text-xs font-mono text-slate-300">{message}</span>
    </div>
  );
};
