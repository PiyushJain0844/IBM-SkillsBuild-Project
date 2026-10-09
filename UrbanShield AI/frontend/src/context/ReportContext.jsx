import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [latestSubmittedReport, setLatestSubmittedReport] = useState(null);

  const fetchReports = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await api.getReports(filters);
      setReports(data);
      const sum = await api.getDashboardSummary();
      setSummary(sum);
      setError(null);
    } catch (err) {
      setError("Failed to load civic issue data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const addReport = async (reportData) => {
    try {
      const created = await api.createReport(reportData);
      setLatestSubmittedReport(created);
      await fetchReports();
      return created;
    } catch (err) {
      console.error("Error creating report:", err);
      throw err;
    }
  };

  const handleVerify = async (id, operatorName) => {
    const updated = await api.verifyReport(id, operatorName);
    await fetchReports();
    return updated;
  };

  const handleUpdateStatus = async (id, status, assignee) => {
    const updated = await api.updateReportStatus(id, status, assignee);
    await fetchReports();
    return updated;
  };

  return (
    <ReportContext.Provider value={{
      reports,
      loading,
      error,
      summary,
      latestSubmittedReport,
      setLatestSubmittedReport,
      fetchReports,
      addReport,
      handleVerify,
      handleUpdateStatus
    }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => useContext(ReportContext);
