// UrbanShield AI — API Abstraction Layer
// Connects to production backend endpoint (VITE_API_BASE_URL) when available,
// falling back gracefully to mockService for hackathon demonstration.

import { INITIAL_REPORTS, MOCK_HOTSPOTS, MOCK_MODEL_TELEMETRY } from './mockService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// In-memory state store for interactive client session updates
let localReports = [...INITIAL_REPORTS];

export const getReports = async (filters = {}) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reports`);
    if (res.ok) return await res.json();
  } catch (err) {
    // API unavailable — fallback to local state with applied filters
    console.info("Using local demo store for getReports()");
  }

  let filtered = [...localReports];
  if (filters.category && filters.category !== "All") {
    filtered = filtered.filter(r => r.category === filters.category);
  }
  if (filters.severity && filters.severity !== "All") {
    filtered = filtered.filter(r => r.severity === filters.severity);
  }
  if (filters.status && filters.status !== "All") {
    filtered = filtered.filter(r => r.status === filters.status);
  }
  if (filters.zone && filters.zone !== "All") {
    filtered = filtered.filter(r => r.zone === filters.zone);
  }
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(r => 
      r.id.toLowerCase().includes(query) || 
      r.title.toLowerCase().includes(query) ||
      r.address.toLowerCase().includes(query)
    );
  }
  return filtered;
};

export const getReportById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reports/${id}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.info(`Using local demo store for getReportById(${id})`);
  }
  return localReports.find(r => r.id === id) || null;
};

export const createReport = async (reportData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.info("Using local demo store for createReport()");
  }

  // Simulate AI Computer Vision Triage Engine
  const newId = `US-${1050 + localReports.length + 1}`;
  const mockConfidence = 0.89 + (Math.random() * 0.08);
  const mockPriority = Math.floor(75 + Math.random() * 20);

  const newReport = {
    id: newId,
    category: reportData.category || "Waste Overflow",
    title: reportData.title || `${reportData.category || "Civic Defect"} Reported`,
    description: reportData.description || "Citizen submitted issue.",
    image: reportData.image || "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=800&auto=format&fit=crop",
    latitude: parseFloat(reportData.latitude) || 28.6139,
    longitude: parseFloat(reportData.longitude) || 77.2090,
    zone: reportData.zone || "Zone 02 — Central District",
    address: reportData.address || "Sector 14, City Center",
    predictedCategory: reportData.category || "Waste Overflow",
    confidence: parseFloat(mockConfidence.toFixed(2)),
    severity: reportData.severity || "High",
    priorityScore: mockPriority,
    status: "AI Triaged",
    isVerifiedByHuman: false,
    verifiedBy: null,
    verifiedAt: null,
    assignedTo: null,
    assignedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    aiReasoning: "Visual anomaly patterns detected matching trained civic issue signatures.",
    recommendedNextAction: "Verify visual evidence and route to municipal team.",
    history: [
      { status: "Submitted", timestamp: new Date().toISOString(), actor: "Citizen (App)", notes: "Report logged." },
      { status: "AI Triaged", timestamp: new Date().toISOString(), actor: "UrbanShield Vision Engine v1.2", notes: `AI Triaged (${Math.round(mockConfidence*100)}% confidence).` }
    ]
  };

  localReports.unshift(newReport);
  return newReport;
};

export const verifyReport = async (id, operatorName = "Authority Operator") => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reports/${id}/verify`, { method: 'PATCH' });
    if (res.ok) return await res.json();
  } catch (err) {
    console.info(`Using local demo store for verifyReport(${id})`);
  }

  const idx = localReports.findIndex(r => r.id === id);
  if (idx !== -1) {
    const updated = {
      ...localReports[idx],
      status: "Verified",
      isVerifiedByHuman: true,
      verifiedBy: operatorName,
      verifiedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        ...localReports[idx].history,
        { status: "Verified", timestamp: new Date().toISOString(), actor: operatorName, notes: "Human verification confirmed." }
      ]
    };
    localReports[idx] = updated;
    return updated;
  }
  return null;
};

export const updateReportStatus = async (id, newStatus, assignee = null) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reports/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, assignee })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.info(`Using local demo store for updateReportStatus(${id})`);
  }

  const idx = localReports.findIndex(r => r.id === id);
  if (idx !== -1) {
    const updated = {
      ...localReports[idx],
      status: newStatus,
      assignedTo: assignee || localReports[idx].assignedTo,
      assignedAt: assignee ? new Date().toISOString() : localReports[idx].assignedAt,
      updatedAt: new Date().toISOString(),
      history: [
        ...localReports[idx].history,
        { status: newStatus, timestamp: new Date().toISOString(), actor: "Authority Admin", notes: assignee ? `Assigned to ${assignee}` : `Status changed to ${newStatus}` }
      ]
    };
    localReports[idx] = updated;
    return updated;
  }
  return null;
};

export const getDashboardSummary = async () => {
  const reports = await getReports();
  const critical = reports.filter(r => r.severity === 'Critical').length;
  const pending = reports.filter(r => r.status === 'Pending Verification' || r.status === 'AI Triaged').length;
  const resolved = reports.filter(r => r.status === 'Resolved').length;

  return {
    totalReports: reports.length,
    criticalIssues: critical,
    pendingVerification: pending,
    resolvedCount: resolved,
    avgResolutionTime: "4.2 Hours (Demo Metric)",
    hotspots: MOCK_HOTSPOTS
  };
};

export const getModelMonitor = async () => {
  return MOCK_MODEL_TELEMETRY;
};
