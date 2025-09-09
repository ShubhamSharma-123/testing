import React, { useState } from 'react';
import EventCalendar from './EventCalendar';
import EventList from './EventList';
import EventModal from './EventModal';
import { Calendar, List, Plus, Clock, Check, X, Users } from 'lucide-react';

const EventManager = () => {
  const [selectedTab, setSelectedTab] = useState('calendar');
  const [calendarView, setCalendarView] = useState('month');
  const [events, setEvents] = useState([
    {
      id: 1,
      date: '2025-01-30',
      title: 'Team Building Workshop',
      description: 'Annual team building activities and workshops',
      location: 'Conference Hall A',
      department: 'All Departments',
      organizer: 'HR Team',
      startTime: '10:00',
      endTime: '16:00',
      isFullDay: false,
      attendees: 50,
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2025-02-14',
      title: 'Product Launch Event',
      description: 'Launch event for our new product line',
      location: 'Main Auditorium',
      department: 'Marketing',
      organizer: 'Marketing Team',
      startTime: '14:00',
      endTime: '18:00',
      isFullDay: false,
      attendees: 100,
      status: 'confirmed'
    },
    {
      id: 3,
      date: '2025-03-15',
      title: 'Annual Company Picnic',
      description: 'Family day and company picnic at the park',
      location: 'City Park',
      department: 'All Departments',
      organizer: 'Events Committee',
      startTime: '09:00',
      endTime: '18:00',
      isFullDay: true,
      attendees: 200,
      status: 'planning'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);

  // Calculate stats
  const eventStats = {
    totalEvents: events.length,
    upcoming: events.filter(e => new Date(e.date) > new Date()).length,
    thisMonth: events.filter(e => {
      const eventDate = new Date(e.date);
      const now = new Date();
      return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
    }).length,
    confirmed: events.filter(e => e.status === 'confirmed').length
  };

  const handleDateClick = (date, time = null) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}`);
    setEditingEvent(null);
    setViewingEvent(null);
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    setViewingEvent(event);
    setEditingEvent(null);
    setSelectedDate(null);
    setShowModal(true);
  };

  const handleAddEvent = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setEditingEvent(null);
    setViewingEvent(null);
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setViewingEvent(null);
    setSelectedDate(null);
    setShowModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
    setShowModal(false);
    setViewingEvent(null);
  };

  const handleSaveEvent = (eventData) => {
    if (Array.isArray(eventData)) {
      // Bulk events
      const newEvents = eventData.map(event => ({
        ...event,
        id: Date.now() + Math.random()
      }));
      setEvents([...events, ...newEvents]);
    } else if (editingEvent) {
      // Update existing event
      setEvents(events.map(e => 
        e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e
      ));
    } else {
      // Add new event
      const newEvent = {
        ...eventData,
        id: Date.now()
      };
      setEvents([...events, newEvent]);
    }
    setShowModal(false);
    setEditingEvent(null);
    setViewingEvent(null);
    setSelectedDate(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setViewingEvent(null);
    setSelectedDate(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Event Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Organize and manage company events</p>
        </div>
        <button 
          onClick={handleAddEvent}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-all shadow-lg "
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{eventStats.totalEvents}</p>
              <p className="text-slate-600 dark:text-slate-400">Total Events</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{eventStats.upcoming}</p>
              <p className="text-slate-600 dark:text-slate-400">Upcoming</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{eventStats.thisMonth}</p>
              <p className="text-slate-600 dark:text-slate-400">This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{eventStats.confirmed}</p>
              <p className="text-slate-600 dark:text-slate-400">Confirmed</p>
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

   

      {/* Content based on selected tab */}
      {selectedTab === 'calendar' ? (
        <EventCalendar 
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          view={calendarView}
        />
      ) : (
        <EventList 
          events={events}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onViewEvent={handleEventClick}
        />
      )}

      {/* Event Modal */}
      {showModal && (
        <EventModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
          viewingEvent={viewingEvent}
        />
      )}
    </div>
  );
};

export default EventManager;