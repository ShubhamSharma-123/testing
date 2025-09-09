import React from 'react';
import { Calendar, Users } from 'lucide-react';

const LeaveWidget= () => {
  const leaveRequests = [
    {
      id: 1,
      name: 'Sarah Johnson',
      type: 'Sick Leave',
      date: 'Dec 28-29',
      status: 'pending',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 2,
      name: 'Michael Chen',
      type: 'Vacation',
      date: 'Jan 2-5',
      status: 'approved',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      type: 'Personal',
      date: 'Dec 30',
      status: 'pending',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-500 rounded-xl">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Leave Requests</h3>
          <p className="text-slate-600 dark:text-slate-400">Recent submissions</p>
        </div>
      </div>

      <div className="space-y-4">
        {leaveRequests.map((request) => (
          <div key={request.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <img
              src={request.avatar}
              alt={request.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-slate-800 dark:text-white">{request.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{request.type} • {request.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
              request.status === 'approved' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
            }`}>
              {request.status}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">
        View All Requests
      </button>
    </div>
  );
};

export default LeaveWidget;