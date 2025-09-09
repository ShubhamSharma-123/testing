
import React, { useState } from 'react';
import HolidayCalendar from './HolidayCalendar';
import HolidayList from './HolidayList';
import HolidayModal from './HolidayModal';
import { Calendar, List, Plus, Clock, Check, X, CalendarDays } from 'lucide-react';

const HolidayManager = () => {
  const [selectedTab, setSelectedTab] = useState('calendar');
  const [calendarView, setCalendarView] = useState('month');
  const [holidays, setHolidays] = useState([
    {
      id: 1,
      date: '2025-01-26',
      occasion: 'Republic Day',
      department: 'All Departments',
      designation: 'All',
      employmentType: 'All',
      startTime: '09:00',
      endTime: '18:00',
      isFullDay: true
    },
    {
      id: 2,
      date: '2025-03-08',
      occasion: 'Holi',
      department: 'All Departments',
      designation: 'All',
      employmentType: 'All',
      startTime: '09:00',
      endTime: '18:00',
      isFullDay: true
    },
    {
      id: 3,
      date: '2025-08-15',
      occasion: 'Independence Day',
      department: 'All Departments',
      designation: 'All',
      employmentType: 'All',
      startTime: '09:00',
      endTime: '18:00',
      isFullDay: true
    },
    {
      id: 4,
      date: '2025-01-28',
      occasion: 'Team Meeting Holiday',
      department: 'IT',
      designation: 'Developer',
      employmentType: 'Full Time',
      startTime: '14:00',
      endTime: '16:00',
      isFullDay: false
    },
    
    
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [viewingHoliday, setViewingHoliday] = useState(null);

  // Calculate stats
  const holidayStats = {
    totalHolidays: holidays.length,
    upcoming: holidays.filter(h => new Date(h.date) > new Date()).length,
    thisMonth: holidays.filter(h => {
      const holidayDate = new Date(h.date);
      const now = new Date();
      return holidayDate.getMonth() === now.getMonth() && holidayDate.getFullYear() === now.getFullYear();
    }).length,
    fullDay: holidays.filter(h => h.isFullDay).length
  };

  const handleDateClick = (date, time = null) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
    setEditingHoliday(null);
    setViewingHoliday(null);
    setShowModal(true);
  };

  const handleHolidayClick = (holiday) => {
    setViewingHoliday(holiday);
    setEditingHoliday(null);
    setSelectedDate(null);
    setShowModal(true);
  };

  const handleAddHoliday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setEditingHoliday(null);
    setViewingHoliday(null);
    setShowModal(true);
  };

  const handleEditHoliday = (holiday) => {
    setEditingHoliday(holiday);
    setViewingHoliday(null);
    setSelectedDate(null);
    setShowModal(true);
  };

  const handleDeleteHoliday = (holidayId) => {
    setHolidays(holidays.filter(h => h.id !== holidayId));
    setShowModal(false);
    setViewingHoliday(null);
  };

  const handleSaveHoliday = (holidayData) => {
    if (Array.isArray(holidayData)) {
      // Bulk holidays
      const newHolidays = holidayData.map(holiday => ({
        ...holiday,
        id: Date.now() + Math.random()
      }));
      setHolidays([...holidays, ...newHolidays]);
    } else if (editingHoliday) {
      // Update existing holiday
      setHolidays(holidays.map(h => 
        h.id === editingHoliday.id ? { ...holidayData, id: editingHoliday.id } : h
      ));
    } else {
      // Add new holiday
      const newHoliday = {
        ...holidayData,
        id: Date.now()
      };
      setHolidays([...holidays, newHoliday]);
    }
    setShowModal(false);
    setEditingHoliday(null);
    setViewingHoliday(null);
    setSelectedDate(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingHoliday(null);
    setViewingHoliday(null);
    setSelectedDate(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Holiday Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage company holidays and celebrations</p>
        </div>
        <button 
          onClick={handleAddHoliday}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-all shadow-lg "
        >
          <Plus className="w-5 h-5" />
          Add Holiday
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{holidayStats.totalHolidays}</p>
              <p className="text-slate-600 dark:text-slate-400">Total Holidays</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{holidayStats.upcoming}</p>
              <p className="text-slate-600 dark:text-slate-400">Upcoming</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{holidayStats.thisMonth}</p>
              <p className="text-slate-600 dark:text-slate-400">This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
              <CalendarDays className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{holidayStats.fullDay}</p>
              <p className="text-slate-600 dark:text-slate-400">Full Day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-1">
        {(['calendar', 'list']).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-6 py-3 rounded-lg transition-all capitalize flex-1 font-medium ${
              selectedTab === tab 
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
          >
            {tab === 'calendar' ? (
              <div className="flex items-center gap-2 justify-center">
                <Calendar className="w-4 h-4" />
                Calendar
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center">
                <List className="w-4 h-4" />
                List
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Calendar View Options */}
      {/* {selectedTab === 'calendar' && (
        <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-1">
          {(['month', 'week', 'day']).map((view) => (
            <button
              key={view}
              onClick={() => setCalendarView(view)}
              className={`px-4 py-2 rounded-lg transition-all capitalize flex-1 ${
                calendarView === view 
                  ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      )} */}

      {/* Content based on selected tab */}
      {selectedTab === 'calendar' ? (
        <HolidayCalendar 
          holidays={holidays}
          onDateClick={handleDateClick}
          onHolidayClick={handleHolidayClick}
          view={calendarView}
        />
      ) : (
        <HolidayList 
          holidays={holidays}
          onEditHoliday={handleEditHoliday}
          onDeleteHoliday={handleDeleteHoliday}
          onViewHoliday={handleHolidayClick}
        />
      )}

      {/* Holiday Modal */}
      {showModal && (
        <HolidayModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSave={handleSaveHoliday}
          onDelete={handleDeleteHoliday}
          selectedDate={selectedDate}
          editingHoliday={editingHoliday}
          viewingHoliday={viewingHoliday}
        />
      )}
    </div>
  );
};

export default HolidayManager;