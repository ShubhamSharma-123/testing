// import React, { useState } from 'react';
// import { Eye, Edit, Trash2, ChevronDown, Clock, Calendar } from 'lucide-react';

// const HolidayList = ({ holidays, onEditHoliday, onDeleteHoliday, onViewHoliday }) => {
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getDepartmentColor = (department) => {
//     if (department === 'All Departments') return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
//     if (department === 'HR') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
//     if (department === 'IT') return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
//     if (department === 'Finance') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
//     return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
//   };

//   const handleDeleteClick = (holidayId) => {
//     onDeleteHoliday(holidayId);
//     setShowDeleteConfirm(null);
//     setActiveDropdown(null);
//   };

//   return (
//     <div className="relative">
//       <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden shadow-lg">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-700/30">
//               <tr>
//                 <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Date</th>
//                 <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Occasion</th>
//                 <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Department</th>
//                 <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Designation</th>
//                 <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Employment</th>
//                 <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Time</th>
//                 <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {holidays.map((holiday) => (
//                 <tr key={holiday.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 overflow-hidden transition-all">
//                   <td className="p-4">
//                     <div className="flex items-center gap-3">
//                       <div className="bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/40 p-2 rounded-lg">
//                         <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-slate-800 dark:text-white">
//                           {new Date(holiday.date).toLocaleDateString('en-US', { 
//                             month: 'short', 
//                             day: 'numeric',
//                             year: 'numeric'
//                           })}
//                         </p>
//                         <p className="text-sm text-slate-600 dark:text-slate-400">
//                           {new Date(holiday.date).toLocaleDateString('en-US', { weekday: 'long' })}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <p className="font-medium text-slate-800 dark:text-white">{holiday.occasion}</p>
//                   </td>
//                   <td className="p-4">
//                     <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getDepartmentColor(holiday.department)}`}>
//                       {holiday.department}
//                     </span>
//                   </td>
//                   <td className="p-4 text-slate-700 dark:text-slate-300">{holiday.designation}</td>
//                   <td className="p-4 text-slate-700 dark:text-slate-300">{holiday.employmentType}</td>
//                   <td className="p-4">
//                     {holiday.isFullDay ? (
//                       <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/40 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-medium">
//                         Full Day
//                       </span>
//                     ) : (
//                       <div className="flex items-center gap-1 text-sm text-slate-700 dark:text-slate-300">
//                         <Clock className="w-3 h-3" />
//                         <span>{holiday.startTime} - {holiday.endTime}</span>
//                       </div>
//                     )}
//                   </td>
//                   <td className="p-4">
//                     <div className="relative">
//                       <button
//                         onClick={() => setActiveDropdown(activeDropdown === holiday.id ? null : holiday.id)}
//                         className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-lg transition-all font-medium"
//                       >
//                         Actions <ChevronDown className="w-3 h-3" />
//                       </button>
//                       {activeDropdown === holiday.id && (
//                         <div 
//                           className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50 min-w-[140px]"
//                           style={{ position: 'absolute', zIndex: 1000 }}
//                         >
//                           <button
//                             onClick={() => {
//                               onViewHoliday(holiday);
//                               setActiveDropdown(null);
//                             }}
//                             className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
//                           >
//                             <Eye className="w-4 h-4" />
//                             View
//                           </button>
//                           <button
//                             onClick={() => {
//                               onEditHoliday(holiday);
//                               setActiveDropdown(null);
//                             }}
//                             className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
//                           >
//                             <Edit className="w-4 h-4" />
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => setShowDeleteConfirm(holiday.id)}
//                             className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
//           <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 dark:border-slate-700/20 shadow-2xl">
//             <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Delete Holiday</h3>
//             <p className="text-slate-600 dark:text-slate-400 mb-6">
//               Are you sure you want to delete this holiday? This action cannot be undone.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => handleDeleteClick(showDeleteConfirm)}
//                 className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl transition-all font-medium"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => {
//                   setShowDeleteConfirm(null);
//                   setActiveDropdown(null);
//                 }}
//                 className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-3 rounded-xl transition-all font-medium"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HolidayList;

import React, { useState, useMemo } from 'react';
import { Eye, Edit, Trash2, ChevronDown, Clock, Calendar } from 'lucide-react';
import Pagination from './Pagination';

const HolidayList = ({ holidays, onEditHoliday, onDeleteHoliday, onViewHoliday }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(holidays.length / itemsPerPage);
  const currentHolidays = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return holidays.slice(startIndex, startIndex + itemsPerPage);
  }, [holidays, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setActiveDropdown(null);
  };

  const getDropdownPosition = () => {
    return 'top-full mt-1';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDepartmentColor = (department) => {
    if (department === 'All Departments') return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
    if (department === 'HR') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
    if (department === 'IT') return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    if (department === 'Finance') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const handleDeleteClick = (holidayId) => {
    onDeleteHoliday(holidayId);
    setShowDeleteConfirm(null);
    setActiveDropdown(null);
  };

  return (
    <div className="relative">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 pb-8 dark:border-slate-700/20 shadow-lg">
        <div className="">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-700/30">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Date</th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Occasion</th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Department</th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Designation</th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Employment</th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Time</th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentHolidays.map((holiday) => (
                <tr key={holiday.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 overflow-hidden transition-all">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/40 p-2 rounded-lg">
                        <Calendar className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">
                          {new Date(holiday.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(holiday.date).toLocaleDateString('en-US', { weekday: 'long' })}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-800 dark:text-white">{holiday.occasion}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getDepartmentColor(holiday.department)}`}>
                      {holiday.department}
                    </span>
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{holiday.designation}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{holiday.employmentType}</td>
                  <td className="p-4">
                    {holiday.isFullDay ? (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/40 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-medium">
                        Full Day
                      </span>
                    ) : (
                      <div className="flex items-center gap-1 text-sm text-slate-700 dark:text-slate-300">
                        <Clock className="w-3 h-3" />
                        <span>{holiday.startTime} - {holiday.endTime}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === holiday.id ? null : holiday.id)}
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg transition-all"
                      >
                        Actions <ChevronDown className="w-3 h-3" />
                      </button>
                      {activeDropdown === holiday.id && (
                        <div className={`absolute right-0 ${getDropdownPosition()} bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 min-w-[140px]`}>
                          <button
                            onClick={() => {
                              onViewHoliday(holiday);
                              setActiveDropdown(null);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => {
                              onEditHoliday(holiday);
                              setActiveDropdown(null);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(holiday.id)}
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
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 dark:border-slate-700/20 shadow-2xl">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Delete Holiday</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to delete this holiday? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteClick(showDeleteConfirm)}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl transition-all font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(null);
                  setActiveDropdown(null);
                }}
                className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-3 rounded-xl transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayList;