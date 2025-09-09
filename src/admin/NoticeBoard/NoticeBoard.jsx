// import React, { useState } from 'react';
// import { Plus, Pin, Calendar, Users, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';

// const NoticeBoard = () => {
//   const { user } = useAuth();
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterPriority, setFilterPriority] = useState('all');
//   const [filterDepartment, setFilterDepartment] = useState('all');

//   const [notices, setNotices] = useState([
//     {
//       id: 1,
//       title: 'New Year Holiday Notice',
//       content: 'Company will be closed from December 31st to January 2nd for New Year celebrations.',
//       author: 'HR Department',
//       date: '2024-12-25',
//       priority: 'high',
//       department: 'all',
//       isPinned: true,
//       views: 156,
//       type: 'announcement'
//     },
//     {
//       id: 2,
//       title: 'Updated Leave Policy',
//       content: 'New leave policy effective from January 1st, 2025. Please review the updated guidelines.',
//       author: 'Sarah HR Manager',
//       date: '2024-12-20',
//       priority: 'medium',
//       department: 'all',
//       isPinned: false,
//       views: 89,
//       type: 'policy'
//     },
//     {
//       id: 3,
//       title: 'Team Building Event',
//       content: 'Annual team building event scheduled for January 15th. Registration is now open.',
//       author: 'HR Department',
//       date: '2024-12-18',
//       priority: 'low',
//       department: 'all',
//       isPinned: false,
//       views: 234,
//       type: 'event'
//     },
//     {
//       id: 4,
//       title: 'IT Security Training',
//       content: 'Mandatory IT security training for all employees. Please complete by January 31st.',
//       author: 'IT Department',
//       date: '2024-12-15',
//       priority: 'high',
//       department: 'IT',
//       isPinned: true,
//       views: 67,
//       type: 'training'
//     }
//   ]);

//   const [newNotice, setNewNotice] = useState({
//     title: '',
//     content: '',
//     priority: 'medium',
//     department: 'all',
//     type: 'announcement'
//   });

//   const handleCreateNotice = (e) => {
//     e.preventDefault();
//     const notice = {
//       id: Date.now(),
//       ...newNotice,
//       author: user?.name || 'Unknown',
//       date: new Date().toISOString().split('T')[0],
//       isPinned: false,
//       views: 0
//     };
//     setNotices([notice, ...notices]);
//     setNewNotice({ title: '', content: '', priority: 'medium', department: 'all', type: 'announcement' });
//     setShowCreateModal(false);
//   };

//   const togglePin = (id) => {
//     setNotices(notices.map(notice => 
//       notice.id === id ? { ...notice, isPinned: !notice.isPinned } : notice
//     ));
//   };

//   const deleteNotice = (id) => {
//     setNotices(notices.filter(notice => notice.id !== id));
//   };

//   const filteredNotices = notices.filter(notice => {
//     const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          notice.content.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
//     const matchesDepartment = filterDepartment === 'all' || notice.department === filterDepartment;
    
//     return matchesSearch && matchesPriority && matchesDepartment;
//   }).sort((a, b) => {
//     if (a.isPinned && !b.isPinned) return -1;
//     if (!a.isPinned && b.isPinned) return 1;
//     return new Date(b.date).getTime() - new Date(a.date).getTime();
//   });

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
//       case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
//       case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
//       default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'announcement': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
//       case 'policy': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
//       case 'event': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400';
//       case 'training': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400';
//       default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Notice Board</h1>
//           <p className="text-slate-600 dark:text-slate-400">Company announcements and important updates</p>
//         </div>
//         {(user?.role === 'admin' || user?.role === 'hr') && (
//           <button 
//             onClick={() => setShowCreateModal(true)}
//             className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
//           >
//             <Plus className="w-4 h-4" />
//             Create Notice
//           </button>
//         )}
//       </div>

//       {/* Filters */}
//       <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search notices..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//             />
//           </div>

//           <select
//             value={filterPriority}
//             onChange={(e) => setFilterPriority(e.target.value)}
//             className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//           >
//             <option value="all">All Priorities</option>
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>

//           <select
//             value={filterDepartment}
//             onChange={(e) => setFilterDepartment(e.target.value)}
//             className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//           >
//             <option value="all">All Departments</option>
//             <option value="HR">HR</option>
//             <option value="IT">IT</option>
//             <option value="Finance">Finance</option>
//             <option value="Operations">Operations</option>
//           </select>
//         </div>
//       </div>

//       {/* Notices */}
//       <div className="space-y-4">
//         {filteredNotices.map((notice) => (
//           <div key={notice.id} className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 ${
//             notice.isPinned ? 'ring-2 ring-yellow-400/20 bg-yellow-50/50 dark:bg-yellow-900/10' : ''
//           }`}>
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-3">
//                   {notice.isPinned && <Pin className="w-4 h-4 text-yellow-500" />}
//                   <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(notice.priority)}`}>
//                     {notice.priority.toUpperCase()}
//                   </span>
//                   <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(notice.type)}`}>
//                     {notice.type.toUpperCase()}
//                   </span>
//                 </div>
                
//                 <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
//                   {notice.title}
//                 </h3>
                
//                 <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
//                   {notice.content}
//                 </p>
                
//                 <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
//                   <div className="flex items-center gap-1">
//                     <Users className="w-4 h-4" />
//                     <span>{notice.author}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     <span>{new Date(notice.date).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Eye className="w-4 h-4" />
//                     <span>{notice.views} views</span>
//                   </div>
//                 </div>
//               </div>
              
//               {(user?.role === 'admin' || user?.role === 'hr') && (
//                 <div className="flex items-center gap-2 ml-4">
//                   <button
//                     onClick={() => togglePin(notice.id)}
//                     className={`p-2 rounded-lg transition-all ${
//                       notice.isPinned 
//                         ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' 
//                         : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
//                     }`}
//                   >
//                     <Pin className="w-4 h-4" />
//                   </button>
//                   <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 rounded-lg transition-all">
//                     <Edit className="w-4 h-4" />
//                   </button>
//                   <button 
//                     onClick={() => deleteNotice(notice.id)}
//                     className="p-2 text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition-all"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Create Notice Modal */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 dark:border-slate-700/20">
//             <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Create New Notice</h3>
            
//             <form onSubmit={handleCreateNotice} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
//                 <input
//                   type="text"
//                   value={newNotice.title}
//                   onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
//                   className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content</label>
//                 <textarea
//                   value={newNotice.content}
//                   onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
//                   rows={4}
//                   className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all resize-none"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
//                   <select
//                     value={newNotice.priority}
//                     onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
//                     className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//                   >
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
//                   <select
//                     value={newNotice.type}
//                     onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
//                     className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//                   >
//                     <option value="announcement">Announcement</option>
//                     <option value="policy">Policy</option>
//                     <option value="event">Event</option>
//                     <option value="training">Training</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Department</label>
//                 <select
//                   value={newNotice.department}
//                   onChange={(e) => setNewNotice({ ...newNotice, department: e.target.value })}
//                   className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//                 >
//                   <option value="all">All Departments</option>
//                   <option value="HR">HR</option>
//                   <option value="IT">IT</option>
//                   <option value="Finance">Finance</option>
//                   <option value="Operations">Operations</option>
//                 </select>
//               </div>

//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all"
//                 >
//                   Create Notice
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowCreateModal(false)}
//                   className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-xl transition-all"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoticeBoard;


import React, { useState } from 'react';
import { Plus, Pin, Calendar, Users, Search, Filter, Eye, Edit, Trash2, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const NoticeBoard = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editingNotice, setEditingNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'New Year Holiday Notice',
      content: 'Company will be closed from December 31st to January 2nd for New Year celebrations.',
      author: 'HR Department',
      date: '2024-12-25',
      priority: 'high',
      department: 'all',
      isPinned: true,
      views: 156,
      type: 'announcement'
    },
    {
      id: 2,
      title: 'Updated Leave Policy',
      content: 'New leave policy effective from January 1st, 2025. Please review the updated guidelines.',
      author: 'Sarah HR Manager',
      date: '2024-12-20',
      priority: 'medium',
      department: 'all',
      isPinned: false,
      views: 89,
      type: 'policy'
    },
    {
      id: 3,
      title: 'Team Building Event',
      content: 'Annual team building event scheduled for January 15th. Registration is now open.',
      author: 'HR Department',
      date: '2024-12-18',
      priority: 'low',
      department: 'all',
      isPinned: false,
      views: 234,
      type: 'event'
    },
    {
      id: 4,
      title: 'IT Security Training',
      content: 'Mandatory IT security training for all employees. Please complete by January 31st.',
      author: 'IT Department',
      date: '2024-12-15',
      priority: 'high',
      department: 'IT',
      isPinned: true,
      views: 67,
      type: 'training'
    }
  ]);

  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    priority: 'medium',
    department: 'all',
    type: 'announcement'
  });

  const handleCreateNotice = (e) => {
    e.preventDefault();
    const notice = {
      id: Date.now(),
      ...newNotice,
      author: user?.name || 'Unknown',
      date: new Date().toISOString().split('T')[0],
      isPinned: false,
      views: 0
    };
    setNotices([notice, ...notices]);
    setNewNotice({ title: '', content: '', priority: 'medium', department: 'all', type: 'announcement' });
    setShowCreateModal(false);
  };

  const handleEditNotice = (notice) => {
    setEditingNotice({
      title: notice.title,
      content: notice.content,
      priority: notice.priority,
      department: notice.department,
      type: notice.type
    });
    setShowEditModal(true);
  };

  const handleUpdateNotice = (e) => {
    e.preventDefault();
    setNotices(notices.map(notice => 
      notice.id === showEditModal ? { ...notice, ...editingNotice } : notice
    ));
    setShowEditModal(false);
    setEditingNotice(null);
  };

  const togglePin = (id) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { ...notice, isPinned: !notice.isPinned } : notice
    ));
  };

  const handleDelete = (id) => {
    setNotices(notices.filter(notice => notice.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
    setShowCustomDateRange(value === 'custom');
  };

  const getFilteredNotices = () => {
    let filtered = notices;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Priority filter
    if (filterPriority !== 'all') {
      filtered = filtered.filter(notice => notice.priority === filterPriority);
    }

    // Department filter
    if (filterDepartment !== 'all') {
      filtered = filtered.filter(notice => notice.department === filterDepartment);
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
      filtered = filtered.filter(notice => {
        const noticeDate = new Date(notice.date);
        const todayReset = new Date();
        
        switch (dateFilter) {
          case 'today':
            return noticeDate.toDateString() === todayReset.toDateString();
          case 'thisWeek':
            return noticeDate >= startOfWeek;
          case 'thisMonth':
            return noticeDate >= startOfMonth;
          case 'lastMonth':
            return noticeDate >= startOfLastMonth && noticeDate <= endOfLastMonth;
          case 'lastSixMonths':
            return noticeDate >= sixMonthsAgo;
          case 'lastOneYear':
            return noticeDate >= oneYearAgo;
          case 'custom':
            if (customStartDate && customEndDate) {
              return noticeDate >= new Date(customStartDate) && noticeDate <= new Date(customEndDate);
            }
            return true;
          default:
            return true;
        }
      });
    }

    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  };

  const filteredNotices = getFilteredNotices();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'policy': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'event': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400';
      case 'training': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Notice Board</h1>
          <p className="text-slate-600 dark:text-slate-400">Company announcements and important updates</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'hr') && (
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Notice
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="all">All Departments</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>

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

      {/* Notices */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div key={notice.id} className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 ${
            notice.isPinned ? 'ring-2 ring-yellow-400/20 bg-yellow-50/50 dark:bg-yellow-900/10' : ''
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {notice.isPinned && <Pin className="w-4 h-4 text-yellow-500" />}
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(notice.priority)}`}>
                    {notice.priority.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(notice.type)}`}>
                    {notice.type.toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  {notice.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                  {notice.content}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{notice.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(notice.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{notice.views} views</span>
                  </div>
                </div>
              </div>
              
              {(user?.role === 'admin' || user?.role === 'hr') && (
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => togglePin(notice.id)}
                    className={`p-2 rounded-lg transition-all ${
                      notice.isPinned 
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' 
                        : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      setShowEditModal(notice.id);
                      handleEditNotice(notice);
                    }}
                    className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 rounded-lg transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(notice.id)}
                    className="p-2 text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Notice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Create New Notice</h3>
            
            <form onSubmit={handleCreateNotice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content</label>
                <textarea
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
                  <select
                    value={newNotice.type}
                    onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="policy">Policy</option>
                    <option value="event">Event</option>
                    <option value="training">Training</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Department</label>
                <select
                  value={newNotice.department}
                  onChange={(e) => setNewNotice({ ...newNotice, department: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="all">All Departments</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all"
                >
                  Create Notice
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Notice Modal */}
      {showEditModal && editingNotice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 dark:border-slate-700/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Edit Notice</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingNotice(null);
                }}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateNotice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content</label>
                <textarea
                  value={editingNotice.content}
                  onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={editingNotice.priority}
                    onChange={(e) => setEditingNotice({ ...editingNotice, priority: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
                  <select
                    value={editingNotice.type}
                    onChange={(e) => setEditingNotice({ ...editingNotice, type: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="policy">Policy</option>
                    <option value="event">Event</option>
                    <option value="training">Training</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Department</label>
                <select
                  value={editingNotice.department}
                  onChange={(e) => setEditingNotice({ ...editingNotice, department: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="all">All Departments</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all"
                >
                  Update Notice
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingNotice(null);
                  }}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
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
                Are you sure you want to delete this notice? This action cannot be undone.
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
    </div>
  );
};

export default NoticeBoard;