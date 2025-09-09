import React, { useState, useMemo } from 'react';
import { Clock, Calendar, Download, Search, User } from 'lucide-react';
import { useAttendance } from '../../contexts/AttendanceContext';

const Timecard = () => {
  const { attendanceHistory, currentAttendance } = useAttendance();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedView, setSelectedView] = useState('daily');
  const [customDateRange, setCustomDateRange] = useState({
    start: '',
    end: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Get current user data
  const getUserData = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : { name: 'User', role: 'employee' };
  };

  const currentUser = getUserData();

  // Filter data to show only current user's attendance
  const userAttendanceData = useMemo(() => {
    let userRecords = attendanceHistory.filter(record => 
      record.name.toLowerCase() === currentUser.name.toLowerCase()
    );
    
    if (currentAttendance && currentAttendance.name.toLowerCase() === currentUser.name.toLowerCase()) {
      userRecords = [...userRecords, currentAttendance];
    }
    
    return userRecords;
  }, [attendanceHistory, currentAttendance, currentUser.name]);

  // Filter data based on selected view and date range
  const filteredData = useMemo(() => {
    let filtered = userAttendanceData;

    // Filter by search term (for consistency, though it's user's own data)
    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.date.includes(searchTerm) ||
        record.status.toLowerCase().includes(searchTerm.toLowerCase())
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

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [userAttendanceData, selectedDate, selectedView, customDateRange, searchTerm]);

  // Calculate user statistics
  const userStats = useMemo(() => {
    const totalDays = filteredData.length;
    const presentDays = filteredData.filter(r => r.status === 'present' || r.status === 'working').length;
    const remoteDays = filteredData.filter(r => r.status === 'remote').length;
    const lateDays = filteredData.filter(r => {
      if (r.checkIn === '-' || r.checkIn === 'Remote') return false;
      const checkInTime = new Date(`2000-01-01 ${r.checkIn}`);
      const lateTime = new Date(`2000-01-01 9:30 AM`);
      return checkInTime > lateTime;
    }).length;

    // Calculate total work hours
    const totalMinutes = filteredData.reduce((total, record) => {
      if (record.workHours && record.workHours !== '0h 0m') {
        const match = record.workHours.match(/(\d+)h\s*(\d+)m/);
        if (match) {
          const hours = parseInt(match[1]);
          const minutes = parseInt(match[2]);
          return total + (hours * 60) + minutes;
        }
      }
      return total;
    }, 0);

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return {
      totalDays,
      presentDays,
      remoteDays,
      lateDays,
      totalWorkTime: `${totalHours}h ${remainingMinutes}m`
    };
  }, [filteredData]);

  const exportTimecard = () => {
    const csvContent = [
      ['Date', 'In Time', 'Out Time', 'Work Hours', 'Status'],
      ...filteredData.map(record => [
        record.date,
        record.checkIn || '-',
        record.checkOut || '-',
        record.workHours,
        record.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timecard-${currentUser.name.replace(' ', '-')}-${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">My Timecard</h1>
          <p className="text-slate-600 dark:text-slate-400">View your personal attendance history</p>
        </div>
        <button 
          onClick={exportTimecard}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Download className="w-4 h-4" />
          Export Timecard
        </button>
      </div>

      {/* User Info Card */}
      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{currentUser.name}</h2>
            <p className="text-slate-600 dark:text-slate-300 capitalize">{currentUser.role}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{userStats.totalDays}</p>
              <p className="text-slate-600 dark:text-slate-400">Total Days</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{userStats.presentDays}</p>
              <p className="text-slate-600 dark:text-slate-400">Present</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{userStats.remoteDays}</p>
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
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{userStats.lateDays}</p>
              <p className="text-slate-600 dark:text-slate-400">Late Days</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800 dark:text-white">{userStats.totalWorkTime}</p>
              <p className="text-slate-600 dark:text-slate-400">Total Hours</p>
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
              placeholder="Search by date or status..."
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

      {/* Timecard Table */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            {selectedView === 'daily' && `Daily Timecard - ${new Date(selectedDate).toLocaleDateString()}`}
            {selectedView === 'weekly' && `Weekly Timecard - Week of ${new Date(selectedDate).toLocaleDateString()}`}
            {selectedView === 'monthly' && `Monthly Timecard - ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
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
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Date</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">In Time</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Out Time</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Work Hours</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400">
                    No timecard records found for the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredData.map((record) => (
                  <tr key={record.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                    <td className="p-4 font-medium text-slate-800 dark:text-white">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{record.checkIn || '-'}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{record.checkOut || '-'}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{record.workHours}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        record.status === 'present' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          : record.status === 'absent'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                          : record.status === 'working'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                      }`}>
                        {record.status}
                      </span>
                    </td>
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

export default Timecard;