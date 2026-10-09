import React, { createContext, useContext, useState } from 'react';
import { centralStore, INITIAL_ZONES, INITIAL_TEAMS } from '../data/centralStore';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [issues, setIssues] = useState(centralStore.getIssues());
  const [zones] = useState(INITIAL_ZONES);
  const [teams] = useState(INITIAL_TEAMS);

  const refreshData = () => {
    setIssues([...centralStore.getIssues()]);
  };

  const addReport = (reportData) => {
    const created = centralStore.addIssue(reportData);
    refreshData();
    return created;
  };

  const verifyReport = (id, operatorName) => {
    const updated = centralStore.verifyIssue(id, operatorName);
    refreshData();
    return updated;
  };

  const updateReportStatus = (id, status, team) => {
    const updated = centralStore.updateIssueStatus(id, status, team);
    refreshData();
    return updated;
  };

  const stats = centralStore.getSummaryStats();

  return (
    <DataContext.Provider value={{
      issues,
      zones,
      teams,
      stats,
      addReport,
      verifyReport,
      updateReportStatus,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
