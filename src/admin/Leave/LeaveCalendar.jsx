import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Eye } from 'lucide-react';

const LeaveCalendar = ({ leaveRequests, onViewLeave, calendarView, setCalendarView }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (calendarView === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else if (calendarView === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else {
      newDate.setDate(newDate.getDate() + direction);
    }
    setCurrentDate(newDate);
  };

  const getLeaveRequestsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return leaveRequests.filter(leave => {
      const leaveStart = new Date(leave.startDate).toISOString().split('T')[0];
      const leaveEnd = new Date(leave.endDate).toISOString().split('T')[0];
      return dateStr >= leaveStart && dateStr <= leaveEnd;
    });
  };

  const getDateTitle = () => {
    if (calendarView === 'month') {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (calendarView === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return `${startOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]} - ${endOfWeek.getDate()} ${monthNames[endOfWeek.getMonth()]} ${endOfWeek.getFullYear()}`;
    } else {
      return `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case 'Casual Leave':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Sick Leave':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'Earned Leave':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Unpaid Leave':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
      case 'Maternity Leave':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Flow Time Out Leave':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300';
    }
  };

  const renderMonthView = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="p-3 text-center font-medium text-slate-600 dark:text-slate-400 text-sm">
            {day}
          </div>
        ))}
        {days.map((date, index) => {
          const leavesForDate = getLeaveRequestsForDate(date);
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 border border-slate-200 dark:border-slate-700 ${
                isCurrentMonth 
                  ? 'bg-white dark:bg-slate-800' 
                  : 'bg-slate-50 dark:bg-slate-900/50'
              } ${isToday ? 'ring-2 ring-blue-500' : ''} hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all`}
            >
              <div className={`text-sm font-medium mb-2 ${
                isCurrentMonth 
                  ? 'text-slate-800 dark:text-white' 
                  : 'text-slate-400 dark:text-slate-600'
              } ${isToday ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {leavesForDate.slice(0, 3).map(leave => (
                  <div
                    key={leave.id}
                    onClick={() => onViewLeave(leave)}
                    className={`p-1 rounded text-xs cursor-pointer hover:opacity-80 transition-all ${getLeaveTypeColor(leave.type)}`}
                  >
                    <div className="truncate font-medium">{leave.employeeName}</div>
                    <div className="truncate opacity-75">{leave.type}</div>
                  </div>
                ))}
                {leavesForDate.length > 3 && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 p-1">
                    +{leavesForDate.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }

    const hours = Array.from({length: 24}, (_, i) => i);

    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-8 border-b border-slate-200 dark:border-slate-700">
          <div className="p-3"></div>
          {days.map(date => (
            <div key={date.toISOString()} className="p-3 text-center border-l border-slate-200 dark:border-slate-700">
              <div className="font-medium text-slate-800 dark:text-white">
                {weekDays[date.getDay()]}
              </div>
              <div className={`text-2xl font-bold ${
                date.toDateString() === new Date().toDateString() 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}>
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-auto max-h-[600px]">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b border-slate-200 dark:border-slate-700 min-h-[60px]">
              <div className="p-3 text-sm text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700">
                {hour.toString().padStart(2, '0')}:00
              </div>
              {days.map(date => {
                const leavesForDate = getLeaveRequestsForDate(date);
                return (
                  <div key={`${date.toISOString()}-${hour}`} className="border-l border-slate-200 dark:border-slate-700 p-1">
                    {hour === 9 && leavesForDate.map(leave => (
                      <div
                        key={leave.id}
                        onClick={() => onViewLeave(leave)}
                        className={`p-2 rounded mb-1 text-xs cursor-pointer hover:opacity-80 transition-all ${getLeaveTypeColor(leave.type)}`}
                      >
                        <div className="font-medium">{leave.employeeName}</div>
                        <div className="opacity-75">{leave.type}</div>
                        <div className="opacity-75">{leave.duration}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({length: 24}, (_, i) => i);
    const leavesForDay = getLeaveRequestsForDate(currentDate);

    return (
      <div className="flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 text-center">
          <div className="text-2xl font-bold text-slate-800 dark:text-white">
            {currentDate.getDate()}
          </div>
          <div className="text-slate-600 dark:text-slate-400">
            {weekDays[currentDate.getDay()]}, {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
        </div>
        <div className="flex-1 overflow-auto max-h-[600px]">
          {hours.map(hour => (
            <div key={hour} className="flex border-b border-slate-200 dark:border-slate-700 min-h-[80px]">
              <div className="w-20 p-3 text-sm text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-1 p-3">
                {hour === 9 && leavesForDay.map(leave => (
                  <div
                    key={leave.id}
                    onClick={() => onViewLeave(leave)}
                    className={`p-3 rounded-lg mb-2 cursor-pointer hover:opacity-80 transition-all ${getLeaveTypeColor(leave.type)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{leave.employeeName}</div>
                        <div className="text-sm opacity-75">{leave.type} - {leave.duration}</div>
                        <div className="text-xs opacity-60">{leave.reason}</div>
                      </div>
                      <Eye className="w-4 h-4 opacity-50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
      {/* Calendar Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Leave Calendar</h2>
          <div className="flex items-center gap-2">
            <select
              value={calendarView}
              onChange={(e) => setCalendarView(e.target.value)}
              className="px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-sm"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateDate(-1)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            {getDateTitle()}
          </h3>
          
          <button
            onClick={() => navigateDate(1)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
          >
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="p-6">
        {calendarView === 'month' && renderMonthView()}
        {calendarView === 'week' && renderWeekView()}
        {calendarView === 'day' && renderDayView()}
      </div>

      {/* Legend */}
      <div className="px-6 pb-6">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900/30 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">Casual Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-100 dark:bg-red-900/30 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">Sick Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 dark:bg-green-900/30 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">Earned Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-100 dark:bg-gray-900/30 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">Unpaid Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-100 dark:bg-purple-900/30 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">Maternity Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-100 dark:bg-orange-900/30 rounded"></div>
            <span className="text-slate-600 dark:text-slate-400">Flow Time Out Leave</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;