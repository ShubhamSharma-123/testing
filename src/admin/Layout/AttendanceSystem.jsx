import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, X, Upload, CheckCircle, AlertCircle, Clock as ClockIcon } from 'lucide-react';

const AttendanceSystem = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const [formData, setFormData] = useState({
    status: 'present',
    clockIn: '',
    clockOut: '',
    leaveReason: '',
    otherReason: '',
    file: null
  });

  // Sample employee data
  const employee = {
    name: 'Providened Stanton Junior',
    position: 'Software Developer',
    department: 'Engineering'
  };

  // Generate calendar days for the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const formatDay = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      day: 'numeric'
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    
    // Only allow marking attendance for today or previous days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (newDate <= today) {
      setShowAttendanceModal(true);
      
      // Pre-fill form with existing data if available
      const dateKey = newDate.toISOString().split('T')[0];
      if (attendanceData[dateKey]) {
        setFormData(attendanceData[dateKey]);
      } else {
        setFormData({
          status: 'present',
          clockIn: '',
          clockOut: '',
          leaveReason: '',
          otherReason: '',
          file: null
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateKey = selectedDate.toISOString().split('T')[0];
    setAttendanceData(prev => ({
      ...prev,
      [dateKey]: formData
    }));
    setShowAttendanceModal(false);
  };

  const getStatusForDay = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateKey = date.toISOString().split('T')[0];
    return attendanceData[dateKey]?.status || null;
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getStatusForDay(day);
      const date = new Date(year, month, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let statusClass = '';
      let statusSymbol = '-';
      
      if (status === 'present') {
        statusClass = 'text-green-600';
        statusSymbol = 'P';
      } else if (status === 'absent') {
        statusClass = 'text-red-600';
        statusSymbol = 'A';
      } else if (status === 'half-day') {
        statusClass = 'text-yellow-600';
        statusSymbol = '½';
      } else if (status === 'late') {
        statusClass = 'text-orange-600';
        statusSymbol = 'L';
      } else if (status === 'on-leave') {
        statusClass = 'text-blue-600';
        statusSymbol = 'L';
      } else if (status === 'holiday') {
        statusClass = 'text-purple-600';
        statusSymbol = 'H';
      } else if (status === 'day-off') {
        statusClass = 'text-gray-600';
        statusSymbol = 'O';
      }
      
      const isSelectable = date <= today;
      
      days.push(
        <div 
          key={day} 
          className={`h-12 flex flex-col items-center justify-center cursor-pointer border rounded-lg p-1 ${
            isSelectable ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'
          } ${
            selectedDate.getDate() === day && 
            selectedDate.getMonth() === month && 
            selectedDate.getFullYear() === year ? 'border-blue-500' : 'border-transparent'
          }`}
          onClick={() => isSelectable && handleDateClick(day)}
        >
          <span className="text-xs font-medium text-gray-400">{day}</span>
          <span className={`text-xs font-bold text-gray-400 ${statusClass}`}>{statusSymbol}</span>
        </div>
      );
    }
    
    return days;
  };

  // Generate header with day names
  const dayNames = [];
  const date = new Date(2023, 0, 1); // Start with a Sunday
  for (let i = 0; i < 7; i++) {
    date.setDate(i + 1);
    dayNames.push(
      <div key={i} className="h-12 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400">
        {date.toLocaleDateString('en-US', { weekday: 'short' })}
      </div>
    );
  }

  return (
    <div className="py-6 max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg ">
      {/* Header with navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <button 
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="w-5 h-5 dark:text-white" />
          </button>
          
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {formatDate(currentDate)}
          </h2>
          
          <button 
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronRight className="w-5 h-5 dark:text-white" />
          </button>
          
          <button 
            onClick={goToToday}
            className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800"
          >
            Today
          </button>
        </div>
        
        <button 
          onClick={() => setShowAttendanceModal(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark Attendance
        </button>
      </div>
      
      {/* Legend */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Legend:</h3>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center dark:text-gray-300"><span className="text-green-600 font-bold mr-1">P</span> Present</div>
          <div className="flex items-center dark:text-gray-300"><span className="text-red-600 font-bold mr-1">A</span> Absent</div>
          <div className="flex items-center dark:text-gray-300"><span className="text-yellow-600 font-bold mr-1">½</span> Half Day</div>
          <div className="flex items-center dark:text-gray-300"><span className="text-orange-600 font-bold mr-1">L</span> Late</div>
          <div className="flex items-center dark:text-gray-300"><span className="text-blue-600 font-bold mr-1">L</span> On Leave</div>
          <div className="flex items-center dark:text-gray-300"><span className="text-purple-600 font-bold mr-1">H</span> Holiday</div>
          <div className="flex items-center dark:text-gray-300"><span className="text-gray-600 font-bold mr-1">O</span> Day Off</div>
          <div className="flex items-center dark:text-gray-300"><span className="font-bold mr-1">－</span> Not Marked</div>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {renderCalendar()}
      </div>
      
      {/* Employee info */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Employee Information</h3>
        <div className="flex items-center">
          <User className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">{employee.name}</span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {employee.position} • {employee.department}
        </div>
      </div>
      
      {/* Attendance Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Mark Attendance - {formatDay(selectedDate)}
              </h3>
              <button 
                onClick={() => setShowAttendanceModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Attendance Status
                </label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="half-day">Half Day</option>
                  <option value="late">Late</option>
                  <option value="on-leave">On Leave</option>
                  <option value="holiday">Holiday</option>
                  <option value="day-off">Day Off</option>
                </select>
              </div>
              
              {(formData.status === 'present' || formData.status === 'half-day' || formData.status === 'late') && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      <ClockIcon className="inline w-4 h-4 mr-1" />
                      Clock In
                    </label>
                    <input
                      type="time"
                      name="clockIn"
                      value={formData.clockIn}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      <ClockIcon className="inline w-4 h-4 mr-1" />
                      Clock Out
                    </label>
                    <input
                      type="time"
                      name="clockOut"
                      value={formData.clockOut}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              )}
              
              {(formData.status === 'on-leave' || formData.status === 'absent') && (
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Reason
                  </label>
                  <select 
                    name="leaveReason"
                    value={formData.leaveReason}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select a reason</option>
                    <option value="sick">Sick Leave</option>
                    <option value="vacation">Vacation</option>
                    <option value="personal">Personal Reasons</option>
                    <option value="emergency">Family Emergency</option>
                    <option value="other">Other</option>
                  </select>
                  
                  {formData.leaveReason === 'other' && (
                    <input
                      type="text"
                      name="otherReason"
                      value={formData.otherReason}
                      onChange={handleInputChange}
                      placeholder="Please specify reason"
                      className="w-full p-2 border rounded-lg mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  )}
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      <Upload className="inline w-4 h-4 mr-1" />
                      Upload Document (if any)
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAttendanceModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceSystem;