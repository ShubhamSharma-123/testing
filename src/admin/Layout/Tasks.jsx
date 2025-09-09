


import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Download, Filter, ChevronDown, Eye, Edit, Trash2, X, Clock, Calendar, User, AlertCircle, CheckCircle, Clock4, UserCheck } from 'lucide-react';
import Toast from './Toast';
import Pagination from './Pagination';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [toast, setToast] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const dropdownRef = useRef(null);

  // Sample employees for assignment dropdown
  const employees = [
    { id: 1, name: 'Sarah Johnson', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 2, name: 'Michael Chen', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 3, name: 'Jennifer Lopez', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 4, name: 'David Wilson', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 5, name: 'Emma Thompson', avatar: 'https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 6, name: 'James Rodriguez', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
  ];

  // Task categories
  const [categories, setCategories] = useState([
    'Development',
    'Design',
    'Marketing',
    'Support',
    'Documentation'
  ]);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI/UX',
      priority: 'high',
      category: 'Design',
      completedOn: '',
      startDate: '2023-10-15',
      dueDate: '2023-11-20',
      estimatedTime: 40,
      assignedTo: [1, 3],
      status: 'in-progress',
      createdAt: '2023-10-10'
    },
   
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    startDate: '',
    dueDate: '',
    estimatedTime: '',
    assignedTo: [],
    status: 'not-started'
  });

  const [errors, setErrors] = useState({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setActiveDropdown(null);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter, categoryFilter]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Task title is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.estimatedTime || formData.estimatedTime <= 0) newErrors.estimatedTime = 'Valid estimated time is required';
    if (new Date(formData.startDate) > new Date(formData.dueDate)) newErrors.dueDate = 'Due date must be after start date';
    if (!formData.category) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (showEditModal) {
        const updatedTasks = tasks.map(task =>
          task.id === selectedTask.id ? { 
            ...task, 
            ...formData
          } : task
        );
        setTasks(updatedTasks);
        setShowEditModal(false);
        showToast('Task updated successfully!', 'success');
      } else {
        const newTask = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setTasks([...tasks, newTask]);
        setShowAddModal(false);
        showToast('Task added successfully!', 'success');
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: '',
      startDate: '',
      dueDate: '',
      estimatedTime: '',
      assignedTo: [],
      status: 'not-started'
    });
    setErrors({});
    setEmployeeSearch('');
    setShowCategoryInput(false);
    setNewCategory('');
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowViewModal(true);
    setActiveDropdown(null);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setFormData({ 
      ...task,
      category: task.category || ''
    });
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setActiveDropdown(null);
    setShowDeleteConfirm(null);
    showToast('Task deleted successfully!', 'success');
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { 
          ...task, 
          status: newStatus,
          completedOn: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : ''
        };
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    setActiveDropdown(null);
    showToast(`Task status updated to ${newStatus}`, 'success');
  };

  const handleAssignmentChange = (employeeId) => {
    const isAssigned = formData.assignedTo.includes(employeeId);
    const updatedAssignments = isAssigned
      ? formData.assignedTo.filter(id => id !== employeeId)
      : [...formData.assignedTo, employeeId];
    
    setFormData({ ...formData, assignedTo: updatedAssignments });
  };

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      critical: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyles[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'not-started': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    
    const statusIcons = {
      completed: <CheckCircle className="w-3 h-3 mr-1" />,
      'in-progress': <Clock4 className="w-3 h-3 mr-1" />,
      'not-started': <AlertCircle className="w-3 h-3 mr-1" />
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${statusStyles[status]}`}>
        {statusIcons[status]}
        {status.replace('-', ' ')}
      </span>
    );
  };

  const getAssignedEmployees = (assignedIds) => {
    return employees.filter(emp => assignedIds.includes(emp.id));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isOverdue = (dueDate, status) => {
    if (status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setFormData({...formData, category: newCategory});
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  return (
    <div className="space-y-6 py-6  max-w-6xl mx-auto">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Confirm Delete</h2>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-slate-700 dark:text-slate-300 mb-6">
                Are you sure you want to delete this task? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Tasks</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage and track your team's tasks</p>
        </div>
        <button 
          onClick={() => {setShowAddModal(true); resetForm();}}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/50 dark:bg-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl transition-all"
            >
              <option value="all">All Status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-white/50 dark:bg-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl transition-all"
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white/50 dark:bg-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl transition-all"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 bg-white/50 dark:bg-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl pb-8 border border-white/20 dark:border-slate-700/20 ">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Task</th>
              <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Category</th>
              <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Priority</th>
              <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Completed On</th>
              <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Start Date</th>
              <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Due Date</th>
              <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Estimated Time</th>
              <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Collebrate</th>
              <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
              <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">{task.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">{task.description}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded-full text-xs font-medium">
                    {task.category}
                  </span>
                </td>
                <td className="p-4">
                  {getPriorityBadge(task.priority)}
                </td>
                {/* <td className="p-4 text-slate-700 dark:text-slate-300">
                  {task.completedOn ? formatDate(task.completedOn) : '-'}
                </td> */}
                <td className="p-4 text-slate-700 dark:text-slate-300">
                  {formatDate(task.startDate)}
                </td>
                <td className="p-4">
                  <div className={`flex items-center ${isOverdue(task.dueDate, task.status) ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {isOverdue(task.dueDate, task.status) && <AlertCircle className="w-4 h-4 mr-1" />}
                    {formatDate(task.dueDate)}
                  </div>
                </td>
                <td className="p-4 text-slate-700 dark:text-slate-300">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-slate-400" />
                    {task.estimatedTime}h
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex -space-x-2">
                    {getAssignedEmployees(task.assignedTo).map(emp => (
                      <img
                        key={emp.id}
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800"
                        title={emp.name}
                      />
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === `status-${task.id}` ? null : `status-${task.id}`)}
                      className="flex items-center gap-1"
                    >
                      {getStatusBadge(task.status)}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {activeDropdown === `status-${task.id}` && (
                      <div className="absolute z-10 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg min-w-[140px]">
                        <button
                          onClick={() => handleStatusChange(task.id, 'not-started')}
                          className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                          <AlertCircle className="w-4 h-4" />
                          Not Started
                        </button>
                        <button
                          onClick={() => handleStatusChange(task.id, 'in-progress')}
                          className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                          <Clock4 className="w-4 h-4" />
                          In Progress
                        </button>
                        <button
                          onClick={() => handleStatusChange(task.id, 'completed')}
                          className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === task.id ? null : task.id)}
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg transition-all"
                    >
                      Actions <ChevronDown className="w-3 h-3" />
                    </button>
                    {activeDropdown === task.id && (
                      <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 min-w-[140px]">
                        <button
                          onClick={() => handleViewTask(task)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleEditTask(task)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(task.id)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 mt-4">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Add New Task</h2>
              <button
                onClick={() => {setShowAddModal(false); resetForm();}}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.title ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                          errors.category ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setShowCategoryInput(!showCategoryInput)}
                        className="absolute right-2 top-2 text-blue-500 hover:text-blue-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    
                    {showCategoryInput && (
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="New category name"
                          className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddCategory}
                          className="px-3 py-2 bg-blue-500 text-white rounded-lg"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="not-started">Not Started</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Estimated Time (hours) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.estimatedTime}
                      onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                        errors.estimatedTime ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                    />
                    {errors.estimatedTime && <p className="text-red-500 text-sm mt-1">{errors.estimatedTime}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                        errors.startDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                    />
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                        errors.dueDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                    />
                    {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Collebrate
                  </label>
                  <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700">
                    <div className="mb-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search employees..."
                          value={employeeSearch}
                          onChange={(e) => setEmployeeSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {filteredEmployees.map(employee => (
                        <label key={employee.id} className="flex items-center space-x-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg">
                          <input
                            type="checkbox"
                            checked={formData.assignedTo.includes(employee.id)}
                            onChange={() => handleAssignmentChange(employee.id)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex items-center space-x-2">
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-slate-700 dark:text-slate-300">{employee.name}</span>
                          </div>
                        </label>
                      ))}
                      {filteredEmployees.length === 0 && (
                        <p className="text-slate-500 dark:text-slate-400 p-2">No employees found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {setShowAddModal(false); resetForm();}}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditModal && selectedTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Edit Task</h2>
              <button
                onClick={() => {setShowEditModal(false); resetForm();}}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.title ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                          errors.category ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setShowCategoryInput(!showCategoryInput)}
                        className="absolute right-2 top-2 text-blue-500 hover:text-blue-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    
                    {showCategoryInput && (
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="New category name"
                          className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddCategory}
                          className="px-3 py-2 bg-blue-500 text-white rounded-lg"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="not-started">Not Started</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Estimated Time (hours) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.estimatedTime}
                      onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                        errors.estimatedTime ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                    />
                    {errors.estimatedTime && <p className="text-red-500 text-sm mt-1">{errors.estimatedTime}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                        errors.startDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                    />
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                        errors.dueDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                      } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                    />
                    {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Collebrate
                  </label>
                  <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-3 bg-white dark:bg-slate-700">
                    <div className="mb-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search employees..."
                          value={employeeSearch}
                          onChange={(e) => setEmployeeSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {filteredEmployees.map(employee => (
                        <label key={employee.id} className="flex items-center space-x-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg">
                          <input
                            type="checkbox"
                            checked={formData.assignedTo.includes(employee.id)}
                            onChange={() => handleAssignmentChange(employee.id)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex items-center space-x-2">
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-slate-700 dark:text-slate-300">{employee.name}</span>
                          </div>
                        </label>
                      ))}
                      {filteredEmployees.length === 0 && (
                        <p className="text-slate-500 dark:text-slate-400 p-2">No employees found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {setShowEditModal(false); resetForm();}}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Task Modal */}
      {showViewModal && selectedTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Task Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{selectedTask.title}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded-full text-xs font-medium">
                    {selectedTask.category}
                  </span>
                  {getPriorityBadge(selectedTask.priority)}
                  {getStatusBadge(selectedTask.status)}
                </div>
                <p className="text-slate-600 dark:text-slate-400">{selectedTask.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Timeline</h4>
                    <div className="space-y-2">
                      <p className="text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-slate-800 dark:text-white">Start Date:</span> {formatDate(selectedTask.startDate)}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-slate-800 dark:text-white">Due Date:</span> {formatDate(selectedTask.dueDate)}
                      </p>
                      {selectedTask.completedOn && (
                        <p className="text-slate-600 dark:text-slate-400">
                          <span className="font-medium text-slate-800 dark:text-white">Completed On:</span> {formatDate(selectedTask.completedOn)}
                        </p>
                      )}
                      <p className="text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-slate-800 dark:text-white">Created On:</span> {formatDate(selectedTask.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Time Tracking</h4>
                    <div className="space-y-2">
                      <p className="text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-slate-800 dark:text-white">Estimated Time:</span> {selectedTask.estimatedTime} hours
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Collebrate</h4>
                    <div className="space-y-2">
                      {getAssignedEmployees(selectedTask.assignedTo).map(emp => (
                        <div key={emp.id} className="flex items-center gap-2">
                          <img
                            src={emp.avatar}
                            alt={emp.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-slate-700 dark:text-slate-300">{emp.name}</span>
                        </div>
                      ))}
                      {selectedTask.assignedTo.length === 0 && (
                        <p className="text-slate-500 dark:text-slate-400">No one assigned</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Task Status</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedTask.id, 'not-started')}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                          selectedTask.status === 'not-started' 
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' 
                            : 'bg-gray-50 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Not Started
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedTask.id, 'in-progress')}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                          selectedTask.status === 'in-progress' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' 
                            : 'bg-blue-50 text-blue-600 dark:bg-blue-800/50 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-700/50'
                        }`}
                      >
                        <Clock4 className="w-3 h-3 mr-1" />
                        In Progress
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedTask.id, 'completed')}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                          selectedTask.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-green-50 text-green-600 dark:bg-green-800/50 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-700/50'
                        }`}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;