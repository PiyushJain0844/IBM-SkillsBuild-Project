import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import * as api from "../services/api";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState(null);
  const [zones, setZones] = useState([]);
  const [connectionStatus, setConnectionStatus] =
    useState("checking");

  // Load data from the backend.
  const refreshData = async () => {
    try {
      const [reports, summary, hotspots] =
        await Promise.all([
          api.getReports(),
          api.getDashboardSummary(),
          api.getHotspotsDashboard()
        ]);

      setIssues(reports);
      setStats(summary);
      setZones(hotspots.zones || []);

      setConnectionStatus("connected");

      return reports;
    } catch (error) {
      console.error("Backend connection failed:", error);

      setConnectionStatus("disconnected");

      throw error;
    }
  };

  useEffect(() => {
    refreshData().catch(() => {});
  }, []);

  // Create a report on the backend.
  const addReport = async (reportData) => {
    const createdReport = await api.createReport(reportData);

    await refreshData();

    return createdReport;
  };

  // Verify a report.
  const verifyReport = async (id, operatorName) => {
    const updatedReport = await api.verifyReport(
      id,
      operatorName
    );

    await refreshData();

    return updatedReport;
  };

  // Update report status.
  const updateReportStatus = async (
    id,
    status,
    assignedTeam
  ) => {
    const updatedReport = await api.updateReportStatus(
      id,
      status,
      assignedTeam
    );

    await refreshData();

    return updatedReport;
  };

  return (
    <DataContext.Provider
      value={{
        issues,
        stats,
        zones,
        connectionStatus,
        refreshData,
        addReport,
        verifyReport,
        updateReportStatus
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);