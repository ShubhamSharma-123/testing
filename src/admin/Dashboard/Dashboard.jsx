// import React from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import DashboardStats from './components/DashboardStats';
// import AttendanceWidget from './components/AttendanceWidget';
// import LeaveWidget from './components/LeaveWidget';
// import PayrollWidget from './components/PayrollWidget';
// import EventsWidget from './components/EventsWidget';
// import TasksWidget from './components/TasksWidget';
// import PerformanceWidget from './components/PerformanceWidget';

// const Dashboard = () => {
//   const { user } = useAuth();

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   };

//   return (
//     <div className="space-y-6">
//       {/* Welcome Header */}
//       <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-500/20">
//         <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
//           {getGreeting()}, {user?.name}! 👋
//         </h1>
//         <p className="text-slate-600 dark:text-slate-300 mt-1">
//           Welcome to your {user?.role === 'admin' ? 'Admin' : user?.role === 'hr' ? 'HR' : user?.role === 'accountant' ? 'Finance' : 'Supervisor'} dashboard. Here's what's happening today.
//         </p>
//       </div>

//       {/* Dashboard Stats */}
//       <DashboardStats />

//       {/* Main Widgets Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         <AttendanceWidget />
//         <LeaveWidget />
//         {(user?.role === 'admin' || user?.role === 'accountant') && <PayrollWidget />}
//         <EventsWidget />
//         <TasksWidget />
//         {(user?.role === 'admin' || user?.role === 'hr') && <PerformanceWidget />}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Clock, Play, Square } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAttendance } from '../../contexts/AttendanceContext';
import DashboardStats from './components/DashboardStats';
import AttendanceWidget from './components/AttendanceWidget';
import LeaveWidget from './components/LeaveWidget';
import PayrollWidget from './components/PayrollWidget';
import EventsWidget from './components/EventsWidget';
import TasksWidget from './components/TasksWidget';
import PerformanceWidget from './components/PerformanceWidget';

const Dashboard = () => {
  const { user } = useAuth();
  const { clockIn, clockOut, isWorking, currentWorkTime, currentAttendance } = useAttendance();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-500/20">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          {getGreeting()}, {user?.name}! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">
          Welcome to your {user?.role === 'admin' ? 'Admin' : user?.role === 'hr' ? 'HR' : user?.role === 'accountant' ? 'Finance' : 'Supervisor'} dashboard. Here's what's happening today.
        </p>
      </div>

      {/* Clock In/Out Widget */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                {isWorking ? 'Currently Working' : 'Time Tracking'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Current Time: {formatCurrentTime()}
              </p>
              {isWorking && currentAttendance && (
                <div className="mt-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Clocked in at: {currentAttendance.checkIn}
                  </p>
                  <p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                    Working Time: {currentWorkTime}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isWorking ? (
              <button
                onClick={clockIn}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium"
              >
                <Play className="w-5 h-5" />
                Clock In
              </button>
            ) : (
              <button
                onClick={clockOut}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-medium"
              >
                <Square className="w-5 h-5" />
                Clock Out
              </button>
            )}
          </div>
        </div>
        
        {/* Work Status Indicator */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isWorking ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {isWorking ? 'Active Work Session' : 'Not Currently Working'}
            </span>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Main Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AttendanceWidget />
        <LeaveWidget />
         <PayrollWidget />
        <EventsWidget />
        <TasksWidget />
        <PerformanceWidget />
      </div>
    </div>
  );
};

export default Dashboard;