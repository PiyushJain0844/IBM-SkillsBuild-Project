import React from 'react';
import { useData } from '../../context/DataContext';
import { MapView } from '../../components/MapView';
import { MapPin, Globe2 } from 'lucide-react';

export const AuthorityLiveMap = () => {
  const { issues } = useData();

  return (
    <div className="space-y-4 py-2 pb-16 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-600" />
            Civic Issue Intelligence Map
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive GIS view showing report location pins, severity clusters, zone boundaries, and predictive hotspots.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
          <Globe2 className="w-4 h-4 text-emerald-600" />
          <span>{issues.length} Operational GIS Pins</span>
        </div>
      </div>

      {/* Full Size Map */}
      <MapView reports={issues} height="650px" showHotspots={true} isCitizenView={false} />
    </div>
  );
};
