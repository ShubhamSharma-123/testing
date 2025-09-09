import React, { useState, useEffect } from 'react';
import { Plus, Edit, Save, X, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const LeaveQuota = ({ currentEmployee }) => {
  const [leaveQuotas, setLeaveQuotas] = useState([]);
  const [editingQuota, setEditingQuota] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newQuota, setNewQuota] = useState({
    type: '',
    totalDays: 0,
    usedDays: 0,
    remainingDays: 0,
    startDate: '',
    endDate: ''
  });

  // Initialize leave quotas
  useEffect(() => {
    // Mock data - in real app, this would come from an API
    const initialQuotas = [
      {
        id: 1,
        type: 'Casual Leave',
        totalDays: 12,
        usedDays: 3,
        remainingDays: 9,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        validity: '2024-01-01 to 2024-12-31'
      },
      {
        id: 2,
        type: 'Sick Leave',
        totalDays: 10,
        usedDays: 2,
        remainingDays: 8,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        validity: '2024-01-01 to 2024-12-31'
      },
      {
        id: 3,
        type: 'Earned Leave',
        totalDays: 15,
        usedDays: 5,
        remainingDays: 10,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        validity: '2024-01-01 to 2024-12-31'
      },
      {
        id: 4,
        type: 'Maternity Leave',
        totalDays: 90,
        usedDays: 0,
        remainingDays: 90,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        validity: '2024-01-01 to 2024-12-31'
      }
    ];
    setLeaveQuotas(initialQuotas);
  }, []);

  const formatValidity = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    return `${startDate} to ${endDate}`;
  };

  const handleEdit = (quota) => {
    setEditingQuota({ ...quota });
  };

  const handleSave = () => {
    if (editingQuota) {
      const updatedQuota = {
        ...editingQuota,
        validity: formatValidity(editingQuota.startDate, editingQuota.endDate),
        remainingDays: editingQuota.totalDays - editingQuota.usedDays
      };
      
      setLeaveQuotas(prev => 
        prev.map(q => q.id === updatedQuota.id ? updatedQuota : q)
      );
      setEditingQuota(null);
    }
  };

  const handleCancel = () => {
    setEditingQuota(null);
    setIsAdding(false);
    setNewQuota({
      type: '',
      totalDays: 0,
      usedDays: 0,
      remainingDays: 0,
      startDate: '',
      endDate: ''
    });
  };

  const handleAdd = () => {
    if (!newQuota.type || !newQuota.startDate || !newQuota.endDate) {
      alert('Please fill all required fields');
      return;
    }

    const quota = {
      id: Date.now(),
      ...newQuota,
      validity: formatValidity(newQuota.startDate, newQuota.endDate),
      remainingDays: newQuota.totalDays - newQuota.usedDays
    };
    
    setLeaveQuotas(prev => [...prev, quota]);
    setIsAdding(false);
    setNewQuota({
      type: '',
      totalDays: 0,
      usedDays: 0,
      remainingDays: 0,
      startDate: '',
      endDate: ''
    });
  };

  const handleDelete = (id) => {
    setLeaveQuotas(prev => prev.filter(q => q.id !== id));
  };

  const handleInputChange = (e, field) => {
    if (editingQuota) {
      setEditingQuota({
        ...editingQuota,
        [field]: e.target.value
      });
    }
  };

  const handleNewInputChange = (e, field) => {
    const value = e.target.value;
    setNewQuota({
      ...newQuota,
      [field]: field === 'type' ? value : parseInt(value) || 0
    });
  };

  const handleDateChange = (e, field) => {
    if (editingQuota) {
      setEditingQuota({
        ...editingQuota,
        [field]: e.target.value
      });
    }
  };

  const handleNewDateChange = (e, field) => {
    setNewQuota({
      ...newQuota,
      [field]: e.target.value
    });
  };

  const getStatus = (remainingDays, totalDays) => {
    const percentage = (remainingDays / totalDays) * 100;
    if (percentage >= 50) return 'good';
    if (percentage >= 25) return 'warning';
    return 'critical';
  };

  return (
    <div className="space-y-6 py-6  max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Leave Quota</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your leave balances and quotas</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Leave Type
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {leaveQuotas.reduce((sum, q) => sum + q.totalDays, 0)}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Total Leave Days</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {leaveQuotas.reduce((sum, q) => sum + q.remainingDays, 0)}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Remaining Days</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {leaveQuotas.reduce((sum, q) => sum + q.usedDays, 0)}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Used Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Quota Form */}
      {isAdding && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Add New Leave Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Leave Type *
              </label>
              <input
                type="text"
                value={newQuota.type}
                onChange={(e) => handleNewInputChange(e, 'type')}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Enter leave type"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={newQuota.startDate}
                onChange={(e) => handleNewDateChange(e, 'startDate')}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                End Date *
              </label>
              <input
                type="date"
                value={newQuota.endDate}
                onChange={(e) => handleNewDateChange(e, 'endDate')}
                min={newQuota.startDate}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Total Days *
              </label>
              <input
                type="number"
                value={newQuota.totalDays}
                onChange={(e) => handleNewInputChange(e, 'totalDays')}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Used Days
              </label>
              <input
                type="number"
                value={newQuota.usedDays}
                onChange={(e) => handleNewInputChange(e, 'usedDays')}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                min="0"
                max={newQuota.totalDays}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Leave Type
            </button>
          </div>
        </div>
      )}

      {/* Leave Quotas Table */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">My Leave Balances</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Leave Type</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Total Days</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Used Days</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Remaining Days</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Start Date</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">End Date</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveQuotas.map((quota) => (
                <tr key={quota.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all dark:text-slate-300">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    {editingQuota?.id === quota.id ? (
                      <input
                        type="text"
                        value={editingQuota.type}
                        onChange={(e) => handleInputChange(e, 'type')}
                        className="w-full px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                      />
                    ) : (
                      quota.type
                    )}
                  </td>
                  <td className="p-4">
                    {editingQuota?.id === quota.id ? (
                      <input
                        type="number"
                        value={editingQuota.totalDays}
                        onChange={(e) => handleInputChange(e, 'totalDays')}
                        className="w-20 px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                        min="0"
                      />
                    ) : (
                      quota.totalDays
                    )}
                  </td>
                  <td className="p-4 ">
                    {editingQuota?.id === quota.id ? (
                      <input
                        type="number"
                        value={editingQuota.usedDays}
                        onChange={(e) => handleInputChange(e, 'usedDays')}
                        className="w-20 px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                        min="0"
                        max={editingQuota.totalDays}
                      />
                    ) : (
                      quota.usedDays
                    )}
                  </td>
                  <td className="p-4 font-medium">
                    {editingQuota?.id === quota.id ? (
                      <span>{editingQuota.totalDays - editingQuota.usedDays}</span>
                    ) : (
                      quota.remainingDays
                    )}
                  </td>
                  <td className="p-4">
                    {editingQuota?.id === quota.id ? (
                      <input
                        type="date"
                        value={editingQuota.startDate}
                        onChange={(e) => handleDateChange(e, 'startDate')}
                        className="w-full px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                      />
                    ) : (
                      quota.startDate
                    )}
                  </td>
                  <td className="p-4">
                    {editingQuota?.id === quota.id ? (
                      <input
                        type="date"
                        value={editingQuota.endDate}
                        onChange={(e) => handleDateChange(e, 'endDate')}
                        min={editingQuota.startDate}
                        className="w-full px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                      />
                    ) : (
                      quota.endDate
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${
                      getStatus(quota.remainingDays, quota.totalDays) === 'good' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                      getStatus(quota.remainingDays, quota.totalDays) === 'warning' 
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {getStatus(quota.remainingDays, quota.totalDays) === 'good' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {getStatus(quota.remainingDays, quota.totalDays) === 'good' 
                        ? 'Good' : 
                      getStatus(quota.remainingDays, quota.totalDays) === 'warning' 
                        ? 'Warning' : 'Critical'
                      }
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {editingQuota?.id === quota.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-all"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(quota)}
                            className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(quota.id)}
                            className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            title="Delete"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leaveQuotas.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No leave quotas found</p>
              <p className="text-sm">Click "Add Leave Type" to create your first quota</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveQuota;