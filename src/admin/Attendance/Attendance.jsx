// import React, { useState } from 'react';
// import { Calendar, Clock, Users, Download } from 'lucide-react';

// const Attendance = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedView, setSelectedView] = useState('daily');

//   // Mock attendance data
//   const attendanceData = [
//     {
//       id: 1,
//       name: 'Sarah Johnson',
//       checkIn: '09:15 AM',
//       checkOut: '06:30 PM',
//       status: 'present',
//       workHours: '9h 15m',
//       avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
//     },
//     {
//       id: 2,
//       name: 'Michael Chen',
//       checkIn: '08:45 AM',
//       checkOut: '05:45 PM',
//       status: 'present',
//       workHours: '9h 00m',
//       avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
//     },
//     {
//       id: 3,
//       name: 'Emily Rodriguez',
//       checkIn: '-',
//       checkOut: '-',
//       status: 'absent',
//       workHours: '0h 00m',
//       avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
//     },
//     {
//       id: 4,
//       name: 'David Kim',
//       checkIn: '09:30 AM',
//       checkOut: '-',
//       status: 'working',
//       workHours: '6h 45m',
//       avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
//     },
//     {
//       id: 5,
//       name: 'Lisa Wang',
//       checkIn: 'Remote',
//       checkOut: 'Remote',
//       status: 'remote',
//       workHours: '8h 30m',
//       avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
//     }
//   ];

//   const attendanceStats = {
//     total: 247,
//     present: 193,
//     absent: 12,
//     remote: 29,
//     late: 13
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Attendance Management</h1>
//           <p className="text-slate-600 dark:text-slate-400">Track and manage employee attendance</p>
//         </div>
//         <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all">
//           <Download className="w-4 h-4" />
//           Export Report
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//         <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-blue-500 rounded-xl">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-slate-800 dark:text-white">{attendanceStats.total}</p>
//               <p className="text-slate-600 dark:text-slate-400">Total</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-green-500 rounded-xl">
//               <Clock className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-slate-800 dark:text-white">{attendanceStats.present}</p>
//               <p className="text-slate-600 dark:text-slate-400">Present</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-red-500 rounded-xl">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-slate-800 dark:text-white">{attendanceStats.absent}</p>
//               <p className="text-slate-600 dark:text-slate-400">Absent</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-purple-500 rounded-xl">
//               <Calendar className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-slate-800 dark:text-white">{attendanceStats.remote}</p>
//               <p className="text-slate-600 dark:text-slate-400">Remote</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-orange-500 rounded-xl">
//               <Clock className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-slate-800 dark:text-white">{attendanceStats.late}</p>
//               <p className="text-slate-600 dark:text-slate-400">Late</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
//         <div className="flex items-center gap-3">
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//           />
//           <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl">
//             {(['daily', 'weekly', 'monthly'] ).map((view) => (
//               <button
//                 key={view}
//                 onClick={() => setSelectedView(view)}
//                 className={`px-4 py-2 rounded-lg transition-all capitalize ${
//                   selectedView === view 
//                     ? 'bg-blue-500 text-white' 
//                     : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
//                 }`}
//               >
//                 {view}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Attendance Table */}
//       <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
//         <div className="p-6 border-b border-slate-200 dark:border-slate-700">
//           <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
//             Daily Attendance - {new Date(selectedDate).toLocaleDateString()}
//           </h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50 dark:bg-slate-700/50">
//               <tr>
//                 <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Employee</th>
//                 <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Check In</th>
//                 <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Check Out</th>
//                 <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Work Hours</th>
//                 <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceData.map((record) => (
//                 <tr key={record.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
//                   <td className="p-4">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={record.avatar}
//                         alt={record.name}
//                         className="w-10 h-10 rounded-lg object-cover"
//                       />
//                       <span className="font-medium text-slate-800 dark:text-white">{record.name}</span>
//                     </div>
//                   </td>
//                   <td className="p-4 text-slate-700 dark:text-slate-300">{record.checkIn}</td>
//                   <td className="p-4 text-slate-700 dark:text-slate-300">{record.checkOut}</td>
//                   <td className="p-4 text-slate-700 dark:text-slate-300">{record.workHours}</td>
//                   <td className="p-4">
//                     <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
//                       record.status === 'present' 
//                         ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
//                         : record.status === 'absent'
//                         ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
//                         : record.status === 'working'
//                         ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
//                         : 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
//                     }`}>
//                       {record.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Attendance;



import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Users, Download, Filter, Search } from 'lucide-react';
import { useAttendance } from '../../contexts/AttendanceContext';

const Attendance = () => {
  const { attendanceHistory, currentAttendance } = useAttendance();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedView, setSelectedView] = useState('daily');
  const [customDateRange, setCustomDateRange] = useState({
    start: '',
    end: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demo purposes - in real app, this would come from API
  const mockAttendanceData = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Developer',
      date: '2025-01-24',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      status: 'present',
      workHours: '9h 15m',
      isActive: false
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Designer',
      date: '2025-01-24',
      checkIn: '08:45 AM',
      checkOut: '05:45 PM',
      status: 'present',
      workHours: '9h 00m',
      isActive: false
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Manager',
      date: '2025-01-24',
      checkIn: '-',
      checkOut: '-',
      status: 'absent',
      workHours: '0h 00m',
      isActive: false
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'Developer',
      date: '2025-01-24',
      checkIn: '09:30 AM',
      checkOut: '-',
      status: 'working',
      workHours: '6h 45m',
      isActive: true
    },
    {
      id: '5',
      name: 'Lisa Wang',
      role: 'HR',
      date: '2025-01-24',
      checkIn: 'Remote',
      checkOut: 'Remote',
      status: 'remote' ,
      workHours: '8h 30m',
      isActive: false
    }
  ];

  // Combine real attendance data with mock data
  const allAttendanceData = useMemo(() => {
    const combined = [...mockAttendanceData, ...attendanceHistory];
    if (currentAttendance) {
      combined.push(currentAttendance);
    }
    return combined;
  }, [attendanceHistory, currentAttendance]);

  // Filter data based on selected view and date range
  const filteredData = useMemo(() => {
    let filtered = allAttendanceData;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range based on view
    if (selectedView === 'daily') {
      filtered = filtered.filter(record => record.date === selectedDate);
    } else if (selectedView === 'weekly') {
      const startOfWeek = new Date(selectedDate);
      const dayOfWeek = startOfWeek.getDay();
      startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= startOfWeek && recordDate <= endOfWeek;
      });
    } else if (selectedView === 'monthly') {
      const selectedMonth = new Date(selectedDate).getMonth();
      const selectedYear = new Date(selectedDate).getFullYear();
      
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.getMonth() === selectedMonth && recordDate.getFullYear() === selectedYear;
      });
    } else if (selectedView === 'custom' && customDateRange.start && customDateRange.end) {
      const startDate = new Date(customDateRange.start);
      const endDate = new Date(customDateRange.end);
      
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= startDate && recordDate <= endDate;
      });
    }

    return filtered;
  }, [allAttendanceData, selectedDate, selectedView, customDateRange, searchTerm]);

  // Calculate statistics
  const attendanceStats = useMemo(() => {
    const total = filteredData.length;
    const present = filteredData.filter(r => r.status === 'present').length;
    const absent = filteredData.filter(r => r.status === 'absent').length;
    const remote = filteredData.filter(r => r.status === 'remote').length;
    const working = filteredData.filter(r => r.status === 'working').length;
    const late = filteredData.filter(r => {
      if (r.checkIn === '-' || r.checkIn === 'Remote') return false;
      const checkInTime = new Date(`2000-01-01 ${r.checkIn}`);
      const lateTime = new Date(`2000-01-01 9:30 AM`);
      return checkInTime > lateTime;
    }).length;

    return {
      total,
      present: present + working, // Include working as present
      absent,
      remote,
      late
    };
  }, [filteredData]);

  const exportReport = () => {
    const csvContent = [
      ['Name', 'Role', 'In Date', 'Out Date', 'In Time', 'Out Time', 'Work Hours'],
      ...filteredData.map(record => [
        record.name,
        record.role,
        record.date,
        record.checkOut ? record.date : '-',
        record.checkIn || '-',
        record.checkOut || '-',
        record.workHours
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-report-${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Attendance Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Track and manage employee attendance</p>
        </div>
        <button 
          onClick={exportReport}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{attendanceStats.total}</p>
              <p className="text-slate-600 dark:text-slate-400">Total</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{attendanceStats.present}</p>
              <p className="text-slate-600 dark:text-slate-400">Present</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{attendanceStats.absent}</p>
              <p className="text-slate-600 dark:text-slate-400">Absent</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{attendanceStats.remote}</p>
              <p className="text-slate-600 dark:text-slate-400">Remote</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{attendanceStats.late}</p>
              <p className="text-slate-600 dark:text-slate-400">Late</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          
          <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl">
            {(['daily', 'weekly', 'monthly', 'custom']).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-4 py-2 rounded-lg transition-all capitalize ${
                  selectedView === view 
                    ? 'bg-blue-500 text-white' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Date Range */}
        {selectedView === 'custom' && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customDateRange.start}
              onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
              placeholder="Start Date"
              className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <span className="text-slate-500">to</span>
            <input
              type="date"
              value={customDateRange.end}
              onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
              placeholder="End Date"
              className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        )}
      </div>

      {/* Attendance Table */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            {selectedView === 'daily' && `Daily Attendance - ${new Date(selectedDate).toLocaleDateString()}`}
            {selectedView === 'weekly' && `Weekly Attendance - Week of ${new Date(selectedDate).toLocaleDateString()}`}
            {selectedView === 'monthly' && `Monthly Attendance - ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
            {selectedView === 'custom' && customDateRange.start && customDateRange.end && 
              `Custom Range - ${new Date(customDateRange.start).toLocaleDateString()} to ${new Date(customDateRange.end).toLocaleDateString()}`}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Showing {filteredData.length} records
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Employee</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Role</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">In Date</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Out Date</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">In Time</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Out Time</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Work Hours</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 dark:text-slate-400">
                    No attendance records found for the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredData.map((record) => (
                  <tr key={record.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {record.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-slate-800 dark:text-white">{record.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{record.role}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{record.checkOut ? new Date(record.date).toLocaleDateString() : '-'}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{record.checkIn || '-'}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{record.checkOut || '-'}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{record.workHours}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;