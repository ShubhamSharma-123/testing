import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import Layout from "./components/Layout/Layout";
import Login from "./admin/Auth/Login";
import Dashboard from "./admin/Dashboard/Dashboard";
import Employees from "./admin/Employees/Employees";
import Attendance from "./admin/Attendance/Attendance";
import Leave from "./admin/Leave/Leave";
import Payroll from "./admin/Payroll/Payroll";
import Performance from "./admin/Performance/Performance";
import Documents from "./admin/Documents/Documents";
import Policies from "./admin/Policies/Policies";
import Supervisor from "./admin/Supervisor/Supervisor";
import Reports from "./admin/Reports/Reports";
import Settings from "./admin/Settings/Settings";
import Profile from "./admin/Profile/Profile";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import HRComponent from "./admin/Hr/HRComponent";

import "./index.css";
import NoticeBoard from "./admin/NoticeBoard/NoticeBoard";
import Events from "./admin/Events/Events";
import Holidays from "./admin/Holidays/Holidays";
import { AttendanceProvider } from "./contexts/AttendanceContext";
import Timecard from "./admin/Timecard/Timecard";
import ProfileLayout from "./admin/Layout/ProfileLayout";
import EmployeeProfile from "./admin/Layout/EmployeeProfile";
import Tasks from "./admin/Layout/Tasks";
import AttendanceSystem from "./admin/Layout/AttendanceSystem";
import LeaveLayout from "./admin/Layout/leave/Leave";
import LeaveQuota from "./admin/Layout/leave/LeaveQuota";
import DocumentUpload from "./admin/Layout/DocumentUpload";
import EmergencyContact from "./admin/Layout/EmergencyContact";
import Appreciation from "./admin/Layout/Appreciation";

// Wrap ProtectedRoute to work with createBrowserRouter
const protectedElement = (element) => (
  <ProtectedRoute>{element}</ProtectedRoute>
);

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/hr/login",
    element: <Login />,
  },
  {
    path: "/supervisor/login",
    element: <Login />,
  },
  {
    path: "/accountant/login",
    element: <Login />,
  },
  // {
  //   path: '/admin*',
  //   element: <Navigate to="/admin/dashboard" replace />,
  // },
    {
    path: "/",
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "/admin",
    element: protectedElement(<Layout />),
    children: [
      // { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "employees/:id",
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <EmployeeProfile />,
          },
          {path: 'tasks', element: <Tasks />},
          {path: 'attendance-system', element: <AttendanceSystem />},
          {path: 'leave', element: <LeaveLayout />},
          {path: 'leaves-quota', element: <LeaveQuota />},
          {path: 'document', element: <DocumentUpload />},
          {path: 'emergency-contact', element: <EmergencyContact />},
          {path: 'appreciation', element: <Appreciation />},
        ],
      },
      { path: "attendance", element: <Attendance /> },
      { path: "holiday", element: <Holidays /> },
      { path: "event", element: <Events /> },
      { path: "time-card", element: <Timecard /> },
      { path: "leave", element: <Leave /> },
      { path: "payroll", element: <Payroll /> },
      { path: "performance", element: <Performance /> },
      { path: "documents", element: <Documents /> },
      { path: "policies", element: <Policies /> },
      { path: "supervisor", element: <Supervisor /> },
      { path: "notices", element: <NoticeBoard /> },
      // { path: 'events', element: <Events />},
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <Settings /> },
      { path: "profile", element: <Profile /> },
      { path: "hr", element: <HRComponent /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AttendanceProvider>
          <RouterProvider router={router} />
        </AttendanceProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
