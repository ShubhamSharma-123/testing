import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Filter, Search, ChevronDown, X, Upload, Check, Eye, User, CalendarDays, Timer, MapPin } from 'lucide-react';
import ApplyLeaveModal from './ApplyLeaveModal';
import LeaveDetailsModal from './LeaveDetailsModal';
import LeaveCalendar from './LeaveCalendar';
import Pagination from './Pagination';
import ActionDropdown from './ActionDropdown';
import DeleteConfirmModal from './DeleteConfirmModal';

const Leave = () => {
  const [selectedTab, setSelectedTab] = useState('requests');
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);
  const [showLeaveDetailsModal, setShowLeaveDetailsModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [editingLeave, setEditingLeave] = useState(null);
  const [deleteLeaveId, setDeleteLeaveId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [calendarView, setCalendarView] = useState('month');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock employees data
  const employees = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 2, name: 'Michael Chen', email: 'michael@company.com', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily@company.com', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 4, name: 'David Wilson', email: 'david@company.com', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa@company.com', avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 6, name: 'James Rodriguez', email: 'james@company.com', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 7, name: 'Maria Garcia', email: 'maria@company.com', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
    { id: 8, name: 'Kevin Brown', email: 'kevin@company.com', avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' }
  ];

  // Extended Leave requests data for pagination testing
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: 'Sarah Johnson',
      employeeId: 1,
      type: 'Sick Leave',
      startDate: '2024-12-26',
      endDate: '2024-12-27',
      duration: 'Full Day',
      days: 2,
      status: 'pending',
      reason: 'Medical appointment and recovery',
      appliedDate: '2024-12-20',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: null,
      files: []
    },
    {
      id: 2,
      employeeName: 'Michael Chen',
      employeeId: 2,
      type: 'Casual Leave',
      startDate: '2024-12-30',
      endDate: '2025-01-02',
      duration: 'Full Day',
      days: 3,
      status: 'approved',
      reason: 'Family vacation',
      appliedDate: '2024-12-15',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: 'HR Manager',
      files: []
    },
    {
      id: 3,
      employeeName: 'Emily Rodriguez',
      employeeId: 3,
      type: 'Earned Leave',
      startDate: '2024-12-28',
      endDate: '2024-12-28',
      duration: 'First Half',
      days: 0.5,
      status: 'rejected',
      reason: 'Personal matter',
      appliedDate: '2024-12-22',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: 'HR Manager',
      files: []
    },
    {
      id: 4,
      employeeName: 'David Wilson',
      employeeId: 4,
      type: 'Sick Leave',
      startDate: '2024-12-29',
      endDate: '2024-12-29',
      duration: 'Second Half',
      days: 0.5,
      status: 'approved',
      reason: 'Doctor appointment',
      appliedDate: '2024-12-24',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: 'Team Lead',
      files: []
    },
    {
      id: 5,
      employeeName: 'Lisa Anderson',
      employeeId: 5,
      type: 'Casual Leave',
      startDate: '2025-01-03',
      endDate: '2025-01-05',
      duration: 'Full Day',
      days: 3,
      status: 'pending',
      reason: 'Wedding ceremony',
      appliedDate: '2024-12-25',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: null,
      files: []
    },
    {
      id: 6,
      employeeName: 'James Rodriguez',
      employeeId: 6,
      type: 'Earned Leave',
      startDate: '2024-12-31',
      endDate: '2024-12-31',
      duration: 'Full Day',
      days: 1,
      status: 'approved',
      reason: 'New Year celebration',
      appliedDate: '2024-12-20',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: 'HR Manager',
      files: []
    },
    {
      id: 7,
      employeeName: 'Maria Garcia',
      employeeId: 7,
      type: 'Sick Leave',
      startDate: '2025-01-06',
      endDate: '2025-01-07',
      duration: 'Full Day',
      days: 2,
      status: 'pending',
      reason: 'Flu symptoms',
      appliedDate: '2025-01-05',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: null,
      files: []
    },
    {
      id: 8,
      employeeName: 'Kevin Brown',
      employeeId: 8,
      type: 'Casual Leave',
      startDate: '2025-01-08',
      endDate: '2025-01-10',
      duration: 'Full Day',
      days: 3,
      status: 'approved',
      reason: 'Family function',
      appliedDate: '2025-01-02',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: 'Team Lead',
      files: []
    },
    {
      id: 9,
      employeeName: 'Sarah Johnson',
      employeeId: 1,
      type: 'Casual Leave',
      startDate: '2025-01-15',
      endDate: '2025-01-16',
      duration: 'Full Day',
      days: 2,
      status: 'pending',
      reason: 'Personal work',
      appliedDate: '2025-01-10',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: null,
      files: []
    },
    {
      id: 10,
      employeeName: 'Michael Chen',
      employeeId: 2,
      type: 'Sick Leave',
      startDate: '2025-01-20',
      endDate: '2025-01-20',
      duration: 'First Half',
      days: 0.5,
      status: 'pending',
      reason: 'Medical checkup',
      appliedDate: '2025-01-18',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: null,
      files: []
    },
    {
      id: 11,
      employeeName: 'Emily Rodriguez',
      employeeId: 3,
      type: 'Earned Leave',
      startDate: '2025-01-25',
      endDate: '2025-01-27',
      duration: 'Full Day',
      days: 3,
      status: 'pending',
      reason: 'Family trip',
      appliedDate: '2025-01-20',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: null,
      files: []
    },
    {
      id: 12,
      employeeName: 'David Wilson',
      employeeId: 4,
      type: 'Casual Leave',
      startDate: '2025-02-01',
      endDate: '2025-02-01',
      duration: 'Second Half',
      days: 0.5,
      status: 'approved',
      reason: 'Personal appointment',
      appliedDate: '2025-01-28',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      approvedBy: 'Team Lead',
      files: []
    }
  ]);

  const leaveStats = {
    totalRequests: leaveRequests.length,
    pending: leaveRequests.filter(req => req.status === 'pending').length,
    approved: leaveRequests.filter(req => req.status === 'approved').length,
    rejected: leaveRequests.filter(req => req.status === 'rejected').length
  };

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
    if (value === 'custom') {
      setShowCustomDateRange(true);
    } else {
      setShowCustomDateRange(false);
      setCustomStartDate('');
      setCustomEndDate('');
    }
  };

  const getFilteredRequests = () => {
    let filtered = leaveRequests;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Leave type filter
    if (leaveTypeFilter !== 'all') {
      filtered = filtered.filter(req => req.type === leaveTypeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Date filter
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    const sixMonthsAgo = new Date(today.setMonth(today.getMonth() - 6));
    const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 1));

    if (dateFilter !== 'all') {
      filtered = filtered.filter(req => {
        const reqDate = new Date(req.startDate);
        const todayReset = new Date();
        
        switch (dateFilter) {
          case 'today':
            return reqDate.toDateString() === todayReset.toDateString();
          case 'thisWeek':
            return reqDate >= startOfWeek;
          case 'thisMonth':
            return reqDate >= startOfMonth;
          case 'lastMonth':
            return reqDate >= startOfLastMonth && reqDate <= endOfLastMonth;
          case 'lastSixMonths':
            return reqDate >= sixMonthsAgo;
          case 'lastOneYear':
            return reqDate >= oneYearAgo;
          case 'custom':
            if (customStartDate && customEndDate) {
              return reqDate >= new Date(customStartDate) && reqDate <= new Date(customEndDate);
            }
            return true;
          default:
            return true;
        }
      });
    }

    return filtered;
  };

  const getPaginatedRequests = () => {
    const filtered = getFilteredRequests();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(getFilteredRequests().length / itemsPerPage);

  const handleApproveLeave = (leaveId) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === leaveId 
        ? { ...req, status: 'approved', approvedBy: 'Current User' }
        : req
    ));
  };

  const handleRejectLeave = (leaveId) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === leaveId 
        ? { ...req, status: 'rejected', approvedBy: 'Current User' }
        : req
    ));
  };

  const handleViewLeave = (leave) => {
    setSelectedLeave(leave);
    setShowLeaveDetailsModal(true);
  };

  const handleEditLeave = (leave) => {
    setEditingLeave(leave);
    setShowApplyLeaveModal(true);
  };

  const handleDeleteLeave = (leaveId) => {
    setDeleteLeaveId(leaveId);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeleteLeave = () => {
    setLeaveRequests(prev => prev.filter(req => req.id !== deleteLeaveId));
    setShowDeleteConfirmModal(false);
    setDeleteLeaveId(null);
  };

  const handleAddLeaveRequest = (newLeave) => {
    if (editingLeave) {
      // Update existing leave
      setLeaveRequests(prev => prev.map(req => 
        req.id === editingLeave.id 
          ? { ...req, ...newLeave, status: 'pending', approvedBy: null }
          : req
      ));
      setEditingLeave(null);
    } else {
      // Add new leave
      const leaveRequest = {
        id: Date.now(),
        ...newLeave,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        approvedBy: null
      };
      setLeaveRequests(prev => [...prev, leaveRequest]);
    }
  };

  const handleModalClose = () => {
    setShowApplyLeaveModal(false);
    setEditingLeave(null);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter, leaveTypeFilter, statusFilter]);

  const filteredRequests = getFilteredRequests();
  const paginatedRequests = getPaginatedRequests();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Leave Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage employee leave requests and policies</p>
        </div>
        <button 
          onClick={() => setShowApplyLeaveModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Apply Leave
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{leaveStats.totalRequests}</p>
              <p className="text-slate-600 dark:text-slate-400">Total Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{leaveStats.pending}</p>
              <p className="text-slate-600 dark:text-slate-400">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-xl">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{leaveStats.approved}</p>
              <p className="text-slate-600 dark:text-slate-400">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500 rounded-xl">
              <X className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{leaveStats.rejected}</p>
              <p className="text-slate-600 dark:text-slate-400">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-1">
        {(['requests', 'calendar', 'policies']).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-lg transition-all capitalize flex-1 ${
              selectedTab === tab 
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on selected tab */}
      {selectedTab === 'requests' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Date Filter */}
              <div>
                <select
                  value={dateFilter}
                  onChange={(e) => handleDateFilterChange(e.target.value)}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="lastSixMonths">Last 6 Months</option>
                  <option value="lastOneYear">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Leave Type Filter */}
              <div>
                <select
                  value={leaveTypeFilter}
                  onChange={(e) => setLeaveTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="all">All Leave Types</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Earned Leave">Earned Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Flow Time Out Leave">Flow Time Out Leave</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Custom Date Range */}
            {showCustomDateRange && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">From Date</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">To Date</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Leave Requests Table */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Leave Requests</h2>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Showing {paginatedRequests.length} of {filteredRequests.length} requests
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Employee</th>
                    <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Leave Type</th>
                    <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Duration</th>
                    <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Days</th>
                    <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
                    <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.map((request) => (
                    <tr key={request.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={request.avatar}
                            alt={request.employeeName}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium text-slate-800 dark:text-white">{request.employeeName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          request.type === 'Casual Leave' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                          request.type === 'Sick Leave' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                          request.type === 'Earned Leave' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                          request.type === 'Unpaid Leave' ? 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400' :
                          request.type === 'Maternity Leave' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                          'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                        }`}>
                          {request.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-slate-700 dark:text-slate-300">
                          <p>{new Date(request.startDate).toLocaleDateString()}</p>
                          {request.startDate !== request.endDate && (
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              to {new Date(request.endDate).toLocaleDateString()}
                            </p>
                          )}
                          <p className="text-xs text-slate-500 dark:text-slate-500">{request.duration}</p>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700 dark:text-slate-300">{request.days} day{request.days !== 1 ? 's' : ''}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          request.status === 'approved' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : request.status === 'rejected'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <ActionDropdown
                          leave={request}
                          onView={handleViewLeave}
                          onEdit={handleEditLeave}
                          onApprove={handleApproveLeave}
                          onReject={handleRejectLeave}
                          onDelete={handleDeleteLeave}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {paginatedRequests.length === 0 && (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No leave requests found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 pb-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === 'calendar' && (
        <LeaveCalendar 
          leaveRequests={leaveRequests}
          onViewLeave={handleViewLeave}
          calendarView={calendarView}
          setCalendarView={setCalendarView}
        />
      )}

      {selectedTab === 'policies' && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Leave Policies</h2>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">Casual Leave (5 days/year)</h3>
              <p className="text-slate-600 dark:text-slate-400">For personal matters and planned activities. Can be taken with prior approval.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">Sick Leave (5 days/year)</h3>
              <p className="text-slate-600 dark:text-slate-400">For medical emergencies and health issues. Medical certificate required for 3+ consecutive days.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">Earned Leave (5 days/year)</h3>
              <p className="text-slate-600 dark:text-slate-400">Annual leave that can be carried forward. Requires advance planning and approval.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">Unpaid Leave</h3>
              <p className="text-slate-600 dark:text-slate-400">Leave without salary. Requires management approval and valid reason.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">Maternity Leave (3 months)</h3>
              <p className="text-slate-600 dark:text-slate-400">For new mothers. Requires medical certificate and advance notice.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <h3 className="font-medium text-slate-800 dark:text-white mb-2">Flow Time Out Leave (2 days/year)</h3>
              <p className="text-slate-600 dark:text-slate-400">Mental health and wellness break. For stress management and personal well-being.</p>
            </div>
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      {showApplyLeaveModal && (
        <ApplyLeaveModal
          employees={employees}
          editingLeave={editingLeave}
          onClose={handleModalClose}
          onSubmit={handleAddLeaveRequest}
        />
      )}

      {/* Leave Details Modal */}
      {showLeaveDetailsModal && selectedLeave && (
        <LeaveDetailsModal
          leave={selectedLeave}
          onClose={() => setShowLeaveDetailsModal(false)}
          onApprove={handleApproveLeave}
          onReject={handleRejectLeave}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteConfirmModal(false)}
          onConfirm={confirmDeleteLeave}
        />
      )}
    </div>
  );
};

export default Leave;