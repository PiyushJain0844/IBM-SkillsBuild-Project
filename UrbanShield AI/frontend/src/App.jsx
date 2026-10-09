import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { Login } from './pages/auth/Login';
import { SelectRole } from './pages/auth/SelectRole';

import { CitizenLayout } from './layouts/CitizenLayout';
import { CitizenHome } from './pages/citizen/CitizenHome';
import { CitizenReportIssue } from './pages/citizen/CitizenReportIssue';
import { CitizenMyReports } from './pages/citizen/CitizenMyReports';
import { CitizenNearbyIssues } from './pages/citizen/CitizenNearbyIssues';
import { CitizenReportDetails } from './pages/citizen/CitizenReportDetails';

import { AuthorityLayout } from './layouts/AuthorityLayout';
import { AuthorityOverview } from './pages/authority/AuthorityOverview';
import { AuthorityPriorityQueue } from './pages/authority/AuthorityPriorityQueue';
import { AuthorityLiveMap } from './pages/authority/AuthorityLiveMap';
import { AuthorityReports } from './pages/authority/AuthorityReports';
import { AuthorityReportDetails } from './pages/authority/AuthorityReportDetails';
import { AuthorityAssignments } from './pages/authority/AuthorityAssignments';
import { AuthorityHotspots } from './pages/authority/AuthorityHotspots';
import { AuthorityAnalytics } from './pages/authority/AuthorityAnalytics';
import { AuthorityModelMonitor } from './pages/authority/AuthorityModelMonitor';

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Primary Entry Point: Authentication */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/select-role" element={<SelectRole />} />

            {/* Citizen Experience Routes */}
            <Route path="/citizen" element={<CitizenLayout />}>
              <Route index element={<CitizenHome />} />
              <Route path="report" element={<CitizenReportIssue />} />
              <Route path="my-reports" element={<CitizenMyReports />} />
              <Route path="nearby" element={<CitizenNearbyIssues />} />
              <Route path="report-details/:id" element={<CitizenReportDetails />} />
            </Route>

            {/* Authority Operational Experience Routes */}
            <Route path="/authority" element={<AuthorityLayout />}>
              <Route index element={<AuthorityOverview />} />
              <Route path="queue" element={<AuthorityPriorityQueue />} />
              <Route path="map" element={<AuthorityLiveMap />} />
              <Route path="reports" element={<AuthorityReports />} />
              <Route path="reports/:id" element={<AuthorityReportDetails />} />
              <Route path="assignments" element={<AuthorityAssignments />} />
              <Route path="hotspots" element={<AuthorityHotspots />} />
              <Route path="analytics" element={<AuthorityAnalytics />} />
              <Route path="monitor" element={<AuthorityModelMonitor />} />
            </Route>

            {/* Catch-all Redirect to Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
