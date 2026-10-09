import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { StatusBadge } from './StatusBadge';
import { SeverityBadge } from './SeverityBadge';
import { Link } from 'react-router-dom';
import { MapPin, Flame, Eye } from 'lucide-react';

// Custom Marker DivIcon for Civic Defects
const createCustomMarker = (severity, isVerified) => {
  let color = '#2563eb'; // blue
  if (severity === 'Critical') color = '#dc2626'; // red
  if (severity === 'High') color = '#ea580c'; // orange
  if (severity === 'Medium') color = '#d97706'; // amber

  const html = `
    <div style="
      background-color: ${color};
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 3px solid ${isVerified ? '#ffffff' : '#f1f5f9'};
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 11px;
    ">
      ${severity === 'Critical' ? '!' : '•'}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

export const MapView = ({ reports = [], height = "520px", showHotspots = true, isCitizenView = false }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSeverity, setActiveSeverity] = useState("All");
  const [radiusFilter, setRadiusFilter] = useState("2km");
  const [hotspotLayerOn, setHotspotLayerOn] = useState(true);

  const defaultCenter = [28.6050, 77.2150]; // New Delhi center

  const filteredReports = reports.filter(r => {
    if (activeCategory !== "All" && r.category !== activeCategory) return false;
    if (activeSeverity !== "All" && r.severity !== activeSeverity) return false;
    return true;
  });

  return (
    <div className="rail-card p-3 sm:p-4 bg-white border border-slate-300/80 flex flex-col gap-3 rounded-3xl shadow-md w-full max-w-full overflow-hidden">
      
      {/* Map Control & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/90 p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-extrabold text-slate-800">
            {isCitizenView ? "Nearby Reported Issues" : "CIVIC ISSUE INTELLIGENCE"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          
          {/* Category Filter */}
          <select 
            value={activeCategory} 
            onChange={(e) => setActiveCategory(e.target.value)}
            className="bg-white text-slate-800 text-xs px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 font-bold"
          >
            <option value="All">All Categories</option>
            <option value="Road Damage">Road Damage</option>
            <option value="Garbage Overflow">Garbage Overflow</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Broken Streetlight">Broken Streetlight</option>
            <option value="Fallen Tree / Obstruction">Fallen Tree</option>
          </select>

          {/* Severity Filter */}
          <select 
            value={activeSeverity} 
            onChange={(e) => setActiveSeverity(e.target.value)}
            className="bg-white text-slate-800 text-xs px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 font-bold"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Citizen Radius vs Authority Hotspot Toggle */}
          {isCitizenView ? (
            <select 
              value={radiusFilter} 
              onChange={(e) => setRadiusFilter(e.target.value)}
              className="bg-white text-slate-800 text-xs px-3 py-1.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 font-bold"
            >
              <option value="2km">Within 2 km</option>
              <option value="5km">Within 5 km</option>
              <option value="10km">Within 10 km</option>
            </select>
          ) : (
            <button
              type="button"
              onClick={() => setHotspotLayerOn(!hotspotLayerOn)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                hotspotLayerOn 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{hotspotLayerOn ? 'Hotspot Layer ON' : 'Hotspot Layer OFF'}</span>
            </button>
          )}

          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200">
            {filteredReports.length} Issue Pins
          </span>

        </div>
      </div>

      {/* Map Container */}
      <div style={{ height }} className="w-full relative rounded-2xl overflow-hidden border border-slate-300 shadow-inner">
        
        {/* Authority Operational Overlay */}
        {!isCitizenView && (
          <div className="absolute top-3 left-3 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-300 shadow-md text-xs space-y-1.5 max-w-[200px] hidden sm:block">
            <div className="font-extrabold text-slate-900 flex items-center justify-between">
              <span>CIVIC RISK DENSITY</span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">Active GIS</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-600 font-medium">
              <div className="flex justify-between">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-600"></span> Zone 02 Hotspot:</span>
                <span className="font-mono font-bold text-rose-600">Critical</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Zone 01 Spill:</span>
                <span className="font-mono font-bold text-amber-600">High Risk</span>
              </div>
            </div>
          </div>
        )}

        <MapContainer 
          center={defaultCenter} 
          zoom={12} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Tile Provider */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Hotspot Risk Zone Circles (Authority Only) */}
          {!isCitizenView && showHotspots && hotspotLayerOn && (
            <>
              <Circle 
                center={[28.6139, 77.2090]} 
                radius={1200} 
                pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: 0.15, weight: 1.5 }} 
              />
              <Circle 
                center={[28.6315, 77.2167]} 
                radius={900} 
                pathOptions={{ color: '#d97706', fillColor: '#d97706', fillOpacity: 0.15, weight: 1.5 }} 
              />
            </>
          )}

          {/* Render Interactive Defect Pins */}
          {filteredReports.map((report) => (
            <Marker 
              key={report.id} 
              position={[report.latitude, report.longitude]}
              icon={createCustomMarker(report.severity, report.status === 'Verified' || report.verifiedBy)}
            >
              <Popup>
                {isCitizenView ? (
                  /* CITIZEN POPUP DETAILS */
                  <div className="p-1.5 space-y-2 max-w-[220px]">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-extrabold text-slate-900 leading-tight">{report.title}</h4>
                      <StatusBadge status={report.status} />
                    </div>
                    
                    <div className="text-[11px] text-slate-600 space-y-1 font-sans">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Severity:</span>
                        <SeverityBadge severity={report.severity} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Zone:</span>
                        <span className="font-bold text-slate-800">{report.zone.split(' — ')[0]}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <Link 
                        to={`/citizen/report-details/${report.id}`} 
                        className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View Issue</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* AUTHORITY TRIAGE POPUP DETAILS */
                  <div className="p-1 space-y-2 max-w-[240px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-emerald-600 font-bold">{report.id}</span>
                      <StatusBadge status={report.status} />
                    </div>
                    
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{report.title}</h4>
                    
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{report.address || report.zone}</span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-600 font-mono font-bold">
                        <span>Score: {report.priorityScore}/100</span>
                        <span>{Math.round((report.aiConfidence || 0.94) * 100)}% AI Conf.</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <SeverityBadge severity={report.severity} />
                      <Link 
                        to={`/authority/reports/${report.id}`} 
                        className="text-[11px] text-emerald-600 hover:underline font-bold"
                      >
                        Inspect →
                      </Link>
                    </div>
                  </div>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Map Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-slate-700 font-bold">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-600 shadow-2xs"></span> Critical Severity
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-600 shadow-2xs"></span> High Severity
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-2xs"></span> Medium Severity
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 shadow-2xs"></span> Low Severity
          </span>
        </div>

        {!isCitizenView && (
          <span className="font-mono text-slate-400 text-[11px]">Civic GIS Risk Overlay</span>
        )}
      </div>

    </div>
  );
};
