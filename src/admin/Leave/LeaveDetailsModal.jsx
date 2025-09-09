import React from 'react';
import { X, Check, XCircle, Calendar, Clock, User, FileText, Download } from 'lucide-react';

const LeaveDetailsModal = ({ leave, onClose, onApprove, onReject }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Leave Request Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Employee Info */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <img
              src={leave.avatar}
              alt={leave.employeeName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                {leave.employeeName}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Employee ID: {leave.employeeId}</p>
            </div>
          </div>

          {/* Leave Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Leave Type</label>
                <div className="mt-1">
                  <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-medium ${
                    leave.type === 'Casual Leave' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                    leave.type === 'Sick Leave' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                    leave.type === 'Earned Leave' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    leave.type === 'Unpaid Leave' ? 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400' :
                    leave.type === 'Maternity Leave' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                    'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                  }`}>
                    {leave.type}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Duration</label>
                <div className="mt-1 flex items-center gap-2 text-slate-800 dark:text-white">
                  <Clock className="w-4 h-4" />
                  <span>{leave.duration}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Days</label>
                <div className="mt-1 text-slate-800 dark:text-white font-medium">
                  {leave.days} day{leave.days !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Start Date</label>
                <div className="mt-1 flex items-center gap-2 text-slate-800 dark:text-white">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(leave.startDate)}</span>
                </div>
              </div>

              {leave.startDate !== leave.endDate && (
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">End Date</label>
                  <div className="mt-1 flex items-center gap-2 text-slate-800 dark:text-white">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(leave.endDate)}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Applied Date</label>
                <div className="mt-1 text-slate-800 dark:text-white">
                  {formatDate(leave.appliedDate)}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Status</label>
            <div className="mt-2">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
                leave.status === 'approved' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : leave.status === 'rejected'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
              }`}>
                {leave.status === 'approved' && <Check className="w-4 h-4" />}
                {leave.status === 'rejected' && <XCircle className="w-4 h-4" />}
                {leave.status === 'pending' && <Clock className="w-4 h-4" />}
                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
              </span>
              {leave.approvedBy && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  by {leave.approvedBy}
                </p>
              )}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Reason for Absence</label>
            <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <p className="text-slate-800 dark:text-white">{leave.reason}</p>
            </div>
          </div>

          {/* Files */}
          {leave.files && leave.files.length > 0 && (
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Attached Files</label>
              <div className="mt-2 space-y-2">
                {leave.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {typeof file === 'object' ? file.name : file}
                      </span>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1 rounded">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={onClose}
              className="px-6 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
            >
              Close
            </button>
            {leave.status === 'pending' && (
              <>
                <button
                  onClick={() => {
                    onReject(leave.id);
                    onClose();
                  }}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    onApprove(leave.id);
                    onClose();
                  }}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all"
                >
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetailsModal;