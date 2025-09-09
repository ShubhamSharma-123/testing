

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Building, Users, UserCheck, Trash2, Edit, Plus, Copy } from 'lucide-react';

const HolidayModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  onDelete, 
  selectedDate, 
  editingHoliday, 
  viewingHoliday 
}) => {
  const [formData, setFormData] = useState({
    date: '',
    occasion: '',
    department: 'All Departments',
    designation: 'All',
    employmentType: 'All',
    startTime: '09:00',
    endTime: '18:00',
    isFullDay: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkHolidays, setBulkHolidays] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      setFormData({
        date: selectedDate,
        occasion: '',
        department: 'All Departments',
        designation: 'All',
        employmentType: 'All',
        startTime: '09:00',
        endTime: '18:00',
        isFullDay: true
      });
      setIsEditing(false);
      setIsBulkMode(false);
    } else if (editingHoliday) {
      setFormData({
        date: editingHoliday.date,
        occasion: editingHoliday.occasion,
        department: editingHoliday.department,
        designation: editingHoliday.designation,
        employmentType: editingHoliday.employmentType,
        startTime: editingHoliday.startTime,
        endTime: editingHoliday.endTime,
        isFullDay: editingHoliday.isFullDay
      });
      setIsEditing(true);
      setIsBulkMode(false);
    } else if (viewingHoliday) {
      setFormData({
        date: viewingHoliday.date,
        occasion: viewingHoliday.occasion,
        department: viewingHoliday.department,
        designation: viewingHoliday.designation,
        employmentType: viewingHoliday.employmentType,
        startTime: viewingHoliday.startTime,
        endTime: viewingHoliday.endTime,
        isFullDay: viewingHoliday.isFullDay
      });
      setIsEditing(false);
      setIsBulkMode(false);
    }
  }, [selectedDate, editingHoliday, viewingHoliday]);

  const addBulkHoliday = () => {
    // setBulkHolidays([...bulkHolidays, { ...formData }]);
    if (formData.date && formData.occasion) {
    setBulkHolidays([...bulkHolidays, { ...formData }]);
    // Reset the date and occasion fields after adding
    setFormData({
      ...formData,
      date: '',
      occasion: ''
    });
  }
  };

  const removeBulkHoliday = (index) => {
    setBulkHolidays(bulkHolidays.filter((_, i) => i !== index));
  };

  const updateBulkHoliday = (index, field, value) => {
    const updated = bulkHolidays.map((holiday, i) => 
      i === index ? { ...holiday, [field]: value } : holiday
    );
    setBulkHolidays(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isBulkMode) {
      onSave(bulkHolidays);
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
    if (viewingHoliday && !isEditing) return 'Holiday Details';
    if (editingHoliday || isEditing) return 'Edit Holiday';
    if (isBulkMode) return 'Add Multiple Holidays';
    return 'Add New Holiday';
  };

  const isViewMode = viewingHoliday && !isEditing;
  const isEditMode = editingHoliday || isEditing;

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
                    ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400' 
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
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Date</p>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {formatDateForDisplay(formData.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <Building className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Department</p>
                    <p className="font-medium text-slate-800 dark:text-white">{formData.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Designation</p>
                    <p className="font-medium text-slate-800 dark:text-white">{formData.designation}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 rounded-xl">
                  <p className="text-sm text-red-600 dark:text-red-400 mb-1">Occasion</p>
                  <p className="font-semibold text-red-800 dark:text-red-200 text-xl">{formData.occasion}</p>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <UserCheck className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Employment Type</p>
                    <p className="font-medium text-slate-800 dark:text-white">{formData.employmentType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/30 rounded-xl">
                  <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Time</p>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {formData.isFullDay ? 'Full Day' : `${formData.startTime} - ${formData.endTime}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all font-medium"
              >
                <Edit className="w-4 h-4" />
                Edit Holiday
              </button>
              <button
                onClick={() => onDelete(viewingHoliday.id)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete Holiday
              </button>
            </div>
          </div>
        ) : isBulkMode ? (
          // Bulk Mode
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <p className="text-blue-500 dark:text-blue-200 font-medium mb-3">Add Holiday Template</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                />
                <input
                  type="text"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  placeholder="Holiday name"
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                />
              </div>
              <button
                type="button"
                onClick={addBulkHoliday}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                disabled={!formData.date || !formData.occasion}
              >
                <Plus className="w-4 h-4" />
                Add to List
              </button>
            </div>

            {bulkHolidays.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-slate-800 dark:text-white">Holidays to Add ({bulkHolidays.length})</h4>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {bulkHolidays.map((holiday, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <span className="font-medium dark:text-white">{holiday.occasion}</span>
                        <span className="text-slate-600 dark:text-slate-400">{holiday.date}</span>
                        <span className="text-slate-600 dark:text-slate-400">{holiday.department}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBulkHoliday(index)}
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
                disabled={bulkHolidays.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add {bulkHolidays.length} Holidays
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
          // Single Holiday Form (Add/Edit)
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
                  Occasion <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  placeholder="e.g., Diwali, Christmas, Independence Day"
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
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
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Designation
                </label>
                <select
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="All">All</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Executive">Executive</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="All">All</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
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
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Day Holiday</span>
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
                className="px-6 py-3 bg-[#3b82f6] text-white rounded-xl transition-all font-medium"
              >
                {isEditMode ? 'Update Holiday' : 'Add Holiday'}
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

export default HolidayModal;