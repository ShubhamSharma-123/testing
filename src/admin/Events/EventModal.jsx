import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Building, Users, MapPin, Trash2, Edit, Plus, Copy } from 'lucide-react';

const EventModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  onDelete, 
  selectedDate, 
  editingEvent, 
  viewingEvent 
}) => {
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    description: '',
    location: '',
    department: 'All Departments',
    organizer: '',
    startTime: '10:00',
    endTime: '16:00',
    isFullDay: false,
    attendees: 0,
    status: 'planning'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkEvents, setBulkEvents] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      setFormData({
        date: selectedDate,
        title: '',
        description: '',
        location: '',
        department: 'All Departments',
        organizer: '',
        startTime: '10:00',
        endTime: '16:00',
        isFullDay: false,
        attendees: 0,
        status: 'planning'
      });
      setIsEditing(false);
      setIsBulkMode(false);
    } else if (editingEvent) {
      setFormData({
        date: editingEvent.date,
        title: editingEvent.title,
        description: editingEvent.description,
        location: editingEvent.location,
        department: editingEvent.department,
        organizer: editingEvent.organizer,
        startTime: editingEvent.startTime,
        endTime: editingEvent.endTime,
        isFullDay: editingEvent.isFullDay,
        attendees: editingEvent.attendees,
        status: editingEvent.status
      });
      setIsEditing(true);
      setIsBulkMode(false);
    } else if (viewingEvent) {
      setFormData({
        date: viewingEvent.date,
        title: viewingEvent.title,
        description: viewingEvent.description,
        location: viewingEvent.location,
        department: viewingEvent.department,
        organizer: viewingEvent.organizer,
        startTime: viewingEvent.startTime,
        endTime: viewingEvent.endTime,
        isFullDay: viewingEvent.isFullDay,
        attendees: viewingEvent.attendees,
        status: viewingEvent.status
      });
      setIsEditing(false);
      setIsBulkMode(false);
    }
  }, [selectedDate, editingEvent, viewingEvent]);

  const addBulkEvent = () => {
    if(formData.date && formData.title){
      setBulkEvents([...bulkEvents, { ...formData }]);
      setFormData({
        ...formData,
        date:'',
        title:''
      })
    }
    
  };

  const removeBulkEvent = (index) => {
    setBulkEvents(bulkEvents.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isBulkMode) {
      onSave(bulkEvents);
    } else {
      onSave(formData);
    }
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getModalTitle = () => {
    if (viewingEvent && !isEditing) return 'Event Details';
    if (editingEvent || isEditing) return 'Edit Event';
    if (isBulkMode) return 'Add Multiple Events';
    return 'Add New Event';
  };

  const isViewMode = viewingEvent && !isEditing;
  const isEditMode = editingEvent || isEditing;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-4xl border border-white/20 dark:border-slate-700/20 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            {getModalTitle()}
          </h3>
          <div className="flex items-center gap-2">
            {!isViewMode && !isEditMode && (
              <button
                onClick={() => setIsBulkMode(!isBulkMode)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  isBulkMode 
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Copy className="w-4 h-4" />
                Bulk Mode
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {isViewMode ? (
          // View Mode
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <Calendar className="w-5 h-5  text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Date</p>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {formatDateForDisplay(formData.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Location</p>
                    <p className="font-medium text-slate-800 dark:text-white">{formData.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Department</p>
                    <p className="font-medium text-slate-800 dark:text-white">{formData.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Expected Attendees</p>
                    <p className="font-medium text-slate-800 dark:text-white">{formData.attendees}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 rounded-xl">
                  <p className="text-sm text-red-600 dark:text-red-400 mb-1">Event Title</p>
                  <p className="font-semibold  text-red-800 dark:text-red-200 text-xl">{formData.title}</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Description</p>
                  <p className="text-slate-800 dark:text-white">{formData.description}</p>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Organizer</p>
                    <p className="font-medium text-slate-800 dark:text-white">{formData.organizer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <Clock className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Time</p>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {formData.isFullDay ? 'All Day Event' : `${formData.startTime} - ${formData.endTime}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3  bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all font-medium"
              >
                <Edit className="w-4 h-4" />
                Edit Event
              </button>
              <button
                onClick={() => onDelete(viewingEvent.id)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete Event
              </button>
            </div>
          </div>
        ) : isBulkMode ? (
          // Bulk Mode
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <p className="text-blue-500 dark:text-blue-200 font-medium mb-3">Add Event Template</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                />
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Event title"
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue -500/20 focus:border-blue-500 dark:text-white transition-all"
                />
              </div>
              <button
                type="button"
                onClick={addBulkEvent}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue                                                                          -600 text-white rounded-lg transition-all"
                disabled={!formData.date || !formData.title}
              >
                <Plus className="w-4 h-4" />
                Add to List
              </button>
            </div>

            {bulkEvents.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-slate-800 dark:text-white">Events to Add ({bulkEvents.length})</h4>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {bulkEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <span className="font-medium">{event.title}</span>
                        <span className="text-slate-600 dark:text-slate-400">{event.date}</span>
                        <span className="text-slate-600 dark:text-slate-400">{event.location || 'No location'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBulkEvent(index)}
                        className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={bulkEvents.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add {bulkEvents.length} Events
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // Single Event Form (Add/Edit)
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Team Building Workshop"
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the event..."
                rows="3"
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Conference Hall A"
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Organizer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  placeholder="e.g., HR Team"
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue -500 dark:text-white transition-all"
                  required
                />
              </div> 
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="All Departments">All Departments</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Expected Attendees
                </label>
                <input
                  type="number"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="planning">Planning</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFullDay}
                    onChange={(e) => setFormData({ ...formData, isFullDay: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500/20"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">All Day Event</span>
                </label>
              </div>

              {!formData.isFullDay && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all font-medium"
              >
                {isEditMode ? 'Update Event' : 'Add Event'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventModal;