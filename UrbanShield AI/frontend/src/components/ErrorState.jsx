import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorState = ({ message = "An error occurred while loading data.", onRetry }) => {
  return (
    <div className="glass-panel p-8 rounded-xl text-center flex flex-col items-center justify-center border border-rose-900/50 bg-rose-950/20">
      <AlertCircle className="w-8 h-8 text-rose-400 mb-3" />
      <h3 className="text-sm font-bold text-rose-200 mb-1">Data Retrieval Issue</h3>
      <p className="text-xs text-rose-300/80 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-semibold rounded-lg transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
