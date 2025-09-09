import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Edit, Check, X, Trash2 } from 'lucide-react';

const ActionDropdown = ({ leave, onView, onEdit, onApprove, onReject, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action) => {
    setIsOpen(false);
    switch (action) {
      case 'view':
        onView(leave);
        break;
      case 'edit':
        onEdit(leave);
        break;
      case 'approve':
        onApprove(leave.id);
        break;
      case 'reject':
        onReject(leave.id);
        break;
      case 'delete':
        onDelete(leave.id);
        break;
    }
  };

  const isPending = leave.status === 'pending';
  const isProcessed = leave.status === 'approved' || leave.status === 'rejected';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-50 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-2">
          <button
            onClick={() => handleAction('view')}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>

          {isPending && (
            <>
              <button
                onClick={() => handleAction('edit')}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
              >
                <Edit className="w-4 h-4" />
                Edit Request
              </button>
              <hr className="my-1 border-slate-200 dark:border-slate-700" />
              <button
                onClick={() => handleAction('approve')}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
              >
                <Check className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
            </>
          )}

          <hr className="my-1 border-slate-200 dark:border-slate-700" />
          <button
            onClick={() => handleAction('delete')}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;