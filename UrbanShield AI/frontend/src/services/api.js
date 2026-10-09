// UrbanShield AI — API Abstraction Layer
// Connects the React frontend to the FastAPI backend.
// Uses local mock data only when the backend is unavailable.

import {
  INITIAL_REPORTS,
  MOCK_HOTSPOTS,
  MOCK_MODEL_TELEMETRY,
} from "./mockService";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
).replace(/\/+$/, "");

// --------------------------------------------------
// Common API request helper
// --------------------------------------------------

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      `API request failed (${response.status}): ${message}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// --------------------------------------------------
// Local demo store
// --------------------------------------------------

let localReports = INITIAL_REPORTS.map((report) => ({ ...report }));

const isBackendConfigured = Boolean(
  import.meta.env.VITE_API_BASE_URL
);

const shouldUseDemoFallback = () =>
  import.meta.env.DEV || !isBackendConfigured;

function handleApiError(error, operation) {
  console.error(`[UrbanShield API] ${operation} failed:`, error);
}

// --------------------------------------------------
// Normalize backend response fields for the frontend
// --------------------------------------------------

function normalizeReport(report) {
  if (!report) return report;

  return {
    ...report,

    // Preserve backend names and provide aliases
    // for components that use the older frontend names.
    predictedCategory:
      report.predictedCategory ?? report.aiPrediction ?? report.category,

    confidence:
      report.confidence ?? report.aiConfidence ?? 0,

    aiConfidence:
      report.aiConfidence ?? report.confidence ?? 0,

    assignedTo:
      report.assignedTo ?? report.assignedTeam ?? null,

    assignedTeam:
      report.assignedTeam ?? report.assignedTo ?? null,

    createdAt:
      report.createdAt ?? report.reportedAt ?? null,

    isVerifiedByHuman:
      report.isVerifiedByHuman ??
      Boolean(report.verifiedBy),

    history: Array.isArray(report.history) ? report.history : [],
  };
}

// --------------------------------------------------
// Reports
// --------------------------------------------------

export async function getReports(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "All"
    ) {
      params.set(key, value);
    }
  });

  const query = params.toString();

  try {
    const reports = await apiRequest(
      `/api/reports${query ? `?${query}` : ""}`
    );

    return reports.map(normalizeReport);
  } catch (error) {
    handleApiError(error, "getReports");

    if (!shouldUseDemoFallback()) {
      throw error;
    }

    let filtered = [...localReports];

    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter(
        (report) => report.category === filters.category
      );
    }

    if (filters.severity && filters.severity !== "All") {
      filtered = filtered.filter(
        (report) => report.severity === filters.severity
      );
    }

    if (filters.status && filters.status !== "All") {
      filtered = filtered.filter(
        (report) => report.status === filters.status
      );
    }

    if (filters.zone && filters.zone !== "All") {
      filtered = filtered.filter(
        (report) => report.zone === filters.zone
      );
    }

    if (filters.search) {
      const queryText = filters.search.toLowerCase();

      filtered = filtered.filter((report) =>
        [
          report.id,
          report.title,
          report.address,
          report.description,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(queryText)
          )
      );
    }

    return filtered.map(normalizeReport);
  }
}

export async function getReportById(id) {
  try {
    const report = await apiRequest(
      `/api/reports/${encodeURIComponent(id)}`
    );

    return normalizeReport(report);
  } catch (error) {
    handleApiError(error, "getReportById");

    if (!shouldUseDemoFallback()) {
      throw error;
    }

    return normalizeReport(
      localReports.find((report) => report.id === id) ?? null
    );
  }
}

// --------------------------------------------------
// Create a civic report
// --------------------------------------------------

export async function createReport(reportData) {
  // Match backend ReportCreateRequest field names.
  const payload = {
    category: reportData.category || "Road Damage",
    title:
      reportData.title ||
      `${reportData.category || "Civic Issue"} Reported`,
    description:
      reportData.description || "Citizen reported civic issue.",
    image: reportData.image || "",
    latitude: Number(reportData.latitude ?? 28.6139),
    longitude: Number(reportData.longitude ?? 77.209),
    zone: reportData.zone || "Zone 02 — Central Business District",
    address: reportData.address || "Sector 14, City Center",
    reportedBy: reportData.reportedBy || "Citizen",
    severity: reportData.severity || "High",
  };

  try {
    const created = await apiRequest("/api/reports", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return normalizeReport(created);
  } catch (error) {
    handleApiError(error, "createReport");

    // In production, do not silently claim the report was saved.
    if (!shouldUseDemoFallback()) {
      throw error;
    }
  }

  // Local demonstration fallback.
  // These values are illustrative, not actual model predictions.
  const now = new Date().toISOString();

  const mockConfidence = Number(
    (0.89 + Math.random() * 0.08).toFixed(2)
  );

  const mockPriority = Math.floor(75 + Math.random() * 20);

  const newReport = normalizeReport({
    id: `DEMO-${Date.now()}`,
    ...payload,
    aiPrediction: payload.category,
    aiConfidence: mockConfidence,
    severity: payload.severity,
    priorityScore: mockPriority,
    status: "AI Triaged",
    assignedTeam: null,
    verifiedBy: null,
    verifiedAt: null,
    reportedAt: now,
    aiReasoning: "Illustrative demo result; not a measured model prediction.",
    recommendedNextAction:
      "Review the evidence and verify the report.",
    recurrenceCount: 1,
    history: [
      {
        status: "Submitted",
        timestamp: now,
        actor: "Citizen",
        notes: "Local demo report created.",
      },
    ],
  });

  localReports.unshift(newReport);

  return newReport;
}

// --------------------------------------------------
// Human verification
// --------------------------------------------------

export async function verifyReport(
  id,
  operatorName = "Authority Operator"
) {
  try {
    const updated = await apiRequest(
      `/api/reports/${encodeURIComponent(id)}/verify`,
      {
        method: "PATCH",
        body: JSON.stringify({
          operatorName,
          notes: "Human verification completed.",
        }),
      }
    );

    return normalizeReport(updated);
  } catch (error) {
    handleApiError(error, "verifyReport");

    if (!shouldUseDemoFallback()) {
      throw error;
    }
  }

  const index = localReports.findIndex(
    (report) => report.id === id
  );

  if (index === -1) return null;

  const now = new Date().toISOString();

  const updated = normalizeReport({
    ...localReports[index],
    status: "Verified",
    verifiedBy: operatorName,
    verifiedAt: now,
    isVerifiedByHuman: true,
    updatedAt: now,
    history: [
      ...(localReports[index].history || []),
      {
        status: "Verified",
        timestamp: now,
        actor: operatorName,
        notes: "Local demo verification.",
      },
    ],
  });

  localReports[index] = updated;

  return updated;
}

// --------------------------------------------------
// Update status and assign a field team
// --------------------------------------------------

export async function updateReportStatus(
  id,
  newStatus,
  assignedTeam = null
) {
  try {
    const updated = await apiRequest(
      `/api/reports/${encodeURIComponent(id)}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: newStatus,
          assignedTeam,
          notes: assignedTeam
            ? `Assigned to ${assignedTeam}`
            : `Status changed to ${newStatus}`,
        }),
      }
    );

    return normalizeReport(updated);
  } catch (error) {
    handleApiError(error, "updateReportStatus");

    if (!shouldUseDemoFallback()) {
      throw error;
    }
  }

  const index = localReports.findIndex(
    (report) => report.id === id
  );

  if (index === -1) return null;

  const now = new Date().toISOString();

  const updated = normalizeReport({
    ...localReports[index],
    status: newStatus,
    assignedTeam:
      assignedTeam ?? localReports[index].assignedTeam,
    updatedAt: now,
    history: [
      ...(localReports[index].history || []),
      {
        status: newStatus,
        timestamp: now,
        actor: "Authority Operator",
        notes: assignedTeam
          ? `Assigned to ${assignedTeam}`
          : `Status changed to ${newStatus}`,
      },
    ],
  });

  localReports[index] = updated;

  return updated;
}

// --------------------------------------------------
// Dashboard summary
// --------------------------------------------------

export async function getDashboardSummary() {
  try {
    return await apiRequest("/api/dashboard/summary");
  } catch (error) {
    handleApiError(error, "getDashboardSummary");

    if (!shouldUseDemoFallback()) {
      throw error;
    }
  }

  const reports = localReports;

  return {
    totalReports: reports.length,
    criticalIssues: reports.filter(
      (report) => report.severity === "Critical"
    ).length,
    pendingVerification: reports.filter(
      (report) =>
        report.status === "Pending Verification" ||
        report.status === "AI Triaged"
    ).length,
    resolvedCount: reports.filter(
      (report) => report.status === "Resolved"
    ).length,
    avgResolutionTime: null,
    demoMode: true,
  };
}

// --------------------------------------------------
// Predictive hotspots
// --------------------------------------------------

export async function getHotspotsDashboard() {
  try {
    return await apiRequest("/api/dashboard/hotspots");
  } catch (error) {
    handleApiError(error, "getHotspotsDashboard");

    if (!shouldUseDemoFallback()) {
      throw error;
    }

    return {
      zones: MOCK_HOTSPOTS,
      demoMode: true,
    };
  }
}

// --------------------------------------------------
// Model monitor
// --------------------------------------------------

export async function getModelMonitor() {
  // Your current backend does not expose a model-monitor endpoint.
  // Keep the telemetry explicitly identified as demo data.
  return {
    ...MOCK_MODEL_TELEMETRY,
    demoMode: true,
  };
}

// --------------------------------------------------
// Backend health check
// --------------------------------------------------

export async function checkBackend() {
  return apiRequest("/health");
}

export default {
  getReports,
  getReportById,
  createReport,
  verifyReport,
  updateReportStatus,
  getDashboardSummary,
  getHotspotsDashboard,
  getModelMonitor,
  checkBackend,
}; 