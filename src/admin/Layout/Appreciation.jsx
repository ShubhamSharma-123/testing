import React, { useState } from 'react';
import { Plus, Calendar, Award, Image, X, Save, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';

const Appreciation = () => {
  const [appreciations, setAppreciations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppreciation, setNewAppreciation] = useState({
    award: '',
    date: '',
    summary: '',
    photo: null
  });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({
    award: '',
    date: '',
    summary: '',
    photo: null
  });
  
  let currentEmployee = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  };

  // Sample awards data
  const awards = [
    'Employee of the Month',
    'Star Performer',
    'Team Player',
    'Innovation Award',
    'Customer Excellence',
    'Leadership Award',
    'Quality Champion',
    'Safety First Award',
    'Best Team Player',
    'Going the Extra Mile'
  ];

  const handleInputChange = (e, field) => {
    setNewAppreciation({
      ...newAppreciation,
      [field]: e.target.value
    });
  };

  const handleEditInputChange = (e, field) => {
    setEditForm({
      ...editForm,
      [field]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAppreciation({
        ...newAppreciation,
        photo: file
      });
    }
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm({
        ...editForm,
        photo: file,
        photoUrl: URL.createObjectURL(file)
      });
    }
  };

  const handleAddAward = () => {
    const awardName = prompt('Enter new award name:');
    if (awardName && awardName.trim()) {
      awards.push(awardName.trim());
      setNewAppreciation({
        ...newAppreciation,
        award: awardName.trim()
      });
    }
  };

  const handleEditAddAward = () => {
    const awardName = prompt('Enter new award name:');
    if (awardName && awardName.trim()) {
      awards.push(awardName.trim());
      setEditForm({
        ...editForm,
        award: awardName.trim()
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newAppreciation.award || !newAppreciation.date) {
      alert('Please fill all required fields');
      return;
    }

    const appreciation = {
      id: Date.now(),
      ...newAppreciation,
      givenTo: currentEmployee.name,
      givenToId: currentEmployee.id,
      photoUrl: newAppreciation.photo ? URL.createObjectURL(newAppreciation.photo) : null
    };

    setAppreciations([appreciation, ...appreciations]);
    setShowAddForm(false);
    setNewAppreciation({
      award: '',
      date: '',
      summary: '',
      photo: null
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    if (!editForm.award || !editForm.date) {
      alert('Please fill all required fields');
      return;
    }

    const updatedAppreciations = appreciations.map(a => {
      if (a.id === editModal.id) {
        return {
          ...a,
          award: editForm.award,
          date: editForm.date,
          summary: editForm.summary,
          photoUrl: editForm.photoUrl || a.photoUrl
        };
      }
      return a;
    });

    setAppreciations(updatedAppreciations);
    setEditModal(null);
    setEditForm({
      award: '',
      date: '',
      summary: '',
      photo: null
    });
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setNewAppreciation({
      award: '',
      date: '',
      summary: '',
      photo: null
    });
  };

  const handleEditCancel = () => {
    setEditModal(null);
    setEditForm({
      award: '',
      date: '',
      summary: '',
      photo: null
    });
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleView = (appreciation) => {
    setActiveDropdown(null);
    setViewModal(appreciation);
  };

  const handleEdit = (appreciation) => {
    setActiveDropdown(null);
    setEditModal(appreciation);
    setEditForm({
      award: appreciation.award,
      date: appreciation.date,
      summary: appreciation.summary,
      photo: null,
      photoUrl: appreciation.photoUrl
    });
  };

  const handleDeleteClick = (appreciation) => {
    setActiveDropdown(null);
    setDeleteConfirm(appreciation);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setAppreciations(appreciations.filter(a => a.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const closeViewModal = () => {
    setViewModal(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Appreciation</h1>
          <p className="text-slate-600 dark:text-slate-400">Recognize and celebrate achievements</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Appreciation
        </button>
      </div>

      {/* Appreciations List */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">My Appreciation Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Award</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Date</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Summary</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Photo</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appreciations.map((appreciation) => (
                <tr key={appreciation.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-slate-800 dark:text-white">{appreciation.award}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">
                    {formatDate(appreciation.date)}
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">
                    {appreciation.summary || '-'}
                  </td>
                  <td className="p-4">
                    {appreciation.photoUrl ? (
                      <img 
                        src={appreciation.photoUrl} 
                        alt="Appreciation" 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-slate-500">No photo</span>
                    )}
                  </td>
                  <td className="p-4 relative">
                    <button 
                      onClick={() => toggleDropdown(appreciation.id)}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-all"
                    >
                      <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                    
                    {activeDropdown === appreciation.id && (
                      <div className="absolute right-4 top-12 z-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-2 min-w-[120px]">
                        <button
                          onClick={() => handleView(appreciation)}
                          className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(appreciation)}
                          className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(appreciation)}
                          className="w-full text-left px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {appreciations.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No appreciation records found</p>
              <p className="text-sm">Click "Add Appreciation" to recognize achievements</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Appreciation Modal/Popup */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Add Appreciation</h2>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Given To Field (Display only) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Given To *
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <img
                    src={currentEmployee.avatar}
                    alt={currentEmployee.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <span className="font-medium text-slate-800 dark:text-white">{currentEmployee.name}</span>
                </div>
              </div>

              {/* Award Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Award *
                </label>
                <div className="flex gap-2">
                  <select
                    value={newAppreciation.award}
                    onChange={(e) => handleInputChange(e, 'award')}
                    className="flex-1 px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select Award</option>
                    {awards.map((award, index) => (
                      <option key={index} value={award}>{award}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddAward}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={newAppreciation.date}
                    onChange={(e) => handleInputChange(e, 'date')}
                    className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Summary Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Summary
                </label>
                <textarea
                  value={newAppreciation.summary}
                  onChange={(e) => handleInputChange(e, 'summary')}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  placeholder="Enter appreciation summary..."
                />
              </div>

              {/* Photo Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Photo
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Image className="w-8 h-8 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-400">
                      Click to upload photo or drag and drop
                    </span>
                    <span className="text-xs text-slate-500">
                      JPG, PNG, GIF (Max 5MB)
                    </span>
                  </label>
                  {newAppreciation.photo && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {newAppreciation.photo.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Appreciation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">View Appreciation</h2>
              <button
                onClick={closeViewModal}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Given To Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Given To
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <img
                    src={currentEmployee.avatar}
                    alt={currentEmployee.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <span className="font-medium text-slate-800 dark:text-white">{currentEmployee.name}</span>
                </div>
              </div>

              {/* Award Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Award
                </label>
                <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-slate-800 dark:text-white">{viewModal.award}</span>
                </div>
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date
                </label>
                <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-800 dark:text-white">{formatDate(viewModal.date)}</span>
                </div>
              </div>

              {/* Summary Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Summary
                </label>
                <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl min-h-[100px]">
                  <p className="text-slate-800 dark:text-white">{viewModal.summary || 'No summary provided'}</p>
                </div>
              </div>

              {/* Photo Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Photo
                </label>
                <div className="flex justify-center">
                  {viewModal.photoUrl ? (
                    <img 
                      src={viewModal.photoUrl} 
                      alt="Appreciation" 
                      className="max-w-full max-h-64 rounded-lg object-contain"
                    />
                  ) : (
                    <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl text-center">
                      <Image className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                      <span className="text-slate-500 dark:text-slate-400">No photo available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Edit Appreciation</h2>
              <button
                onClick={handleEditCancel}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              {/* Given To Field (Display only) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Given To *
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                  <img
                    src={currentEmployee.avatar}
                    alt={currentEmployee.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <span className="font-medium text-slate-800 dark:text-white">{currentEmployee.name}</span>
                </div>
              </div>

              {/* Award Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Award *
                </label>
                <div className="flex gap-2">
                  <select
                    value={editForm.award}
                    onChange={(e) => handleEditInputChange(e, 'award')}
                    className="flex-1 px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select Award</option>
                    {awards.map((award, index) => (
                      <option key={index} value={award}>{award}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleEditAddAward}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Date Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => handleEditInputChange(e, 'date')}
                    className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Summary Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Summary
                </label>
                <textarea
                  value={editForm.summary}
                  onChange={(e) => handleEditInputChange(e, 'summary')}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  placeholder="Enter appreciation summary..."
                />
              </div>

              {/* Photo Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Photo
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    onChange={handleEditFileChange}
                    className="hidden"
                    id="edit-photo-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="edit-photo-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Image className="w-8 h-8 text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-400">
                      Click to upload photo or drag and drop
                    </span>
                    <span className="text-xs text-slate-500">
                      JPG, PNG, GIF (Max 5MB)
                    </span>
                  </label>
                  {editModal.photoUrl && !editForm.photo && (
                    <div className="mt-4">
                      <p className="text-sm text-slate-600 mb-2">Current photo:</p>
                      <img 
                        src={editModal.photoUrl} 
                        alt="Current" 
                        className="mx-auto max-h-32 rounded-lg object-contain"
                      />
                    </div>
                  )}
                  {editForm.photo && (
                    <p className="text-sm text-green-600 mt-2">
                      New photo selected: {editForm.photo.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  className="px-6 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Update Appreciation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Confirm Delete</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to delete the appreciation "{deleteConfirm.award}" from {formatDate(deleteConfirm.date)}?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appreciation;