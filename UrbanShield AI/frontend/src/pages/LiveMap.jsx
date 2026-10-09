import React from 'react';
import { useReports } from '../context/ReportContext';
import { MapView } from '../components/MapView';
import { LoadingState } from '../components/LoadingState';
import { Map, Layers, ShieldAlert } from 'lucide-react';

export const LiveMap = () => {
  const { reports, loading } = useReports();

  if (loading) {
    return <LoadingState message="Initializing Geospatial Intelligence Engine..." />;
  }

  return (
    <div className="space-y-4 py-4 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Map className="w-6 h-6 text-cyan-400" />
            Live Geospatial Intelligence Map
          </h1>
          <p className="text-xs text-slate-400">
            Interactive GIS view showing report location pins, severity markers, and municipal risk zones.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 bg-cyan-950 px-3 py-1.5 rounded-lg border border-cyan-800">
          <ShieldAlert className="w-4 h-4" />
          <span>{reports.length} Verified & Triaged Pins</span>
        </div>
      </div>

      {/* Main Full-Size Map Component */}
      <MapView reports={reports} height="650px" showHotspots={true} />
    </div>
  );
};
