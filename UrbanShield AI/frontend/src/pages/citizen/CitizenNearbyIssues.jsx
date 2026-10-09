import React from 'react';
import { useData } from '../../context/DataContext';
import { MapView } from '../../components/MapView';
import { MapPin, Globe2 } from 'lucide-react';

export const CitizenNearbyIssues = () => {
  const { issues } = useData();

  return (
    <div className="space-y-4 py-2 pb-16 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-600" />
            Nearby Civic Issues
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            View reported civic issues around your area without exposing reporter information.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 font-bold">
          <Globe2 className="w-4 h-4 text-emerald-600" />
          <span>{issues.length} Active Community Defects</span>
        </div>
      </div>

      {/* Map (Clean Citizen Mode: No squad vehicles, no operational polylines) */}
      <MapView reports={issues} height="580px" showHotspots={false} isCitizenView={true} />
    </div>
  );
};
