import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';

const AttendanceWidget = () => {
  const attendanceData = [
    { day: 'Mon', present: 234, total: 247 },
    { day: 'Tue', present: 241, total: 247 },
    { day: 'Wed', present: 238, total: 247 },
    { day: 'Thu', present: 242, total: 247 },
    { day: 'Fri', present: 245, total: 247 },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500 rounded-xl">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Weekly Attendance</h3>
            <p className="text-slate-600 dark:text-slate-400">This week's overview</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+2.5%</span>
        </div>
      </div>

      <div className="space-y-4">
        {attendanceData.map((day) => {
          const percentage = (day.present / day.total) * 100;
          return (
            <div key={day.day} className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 w-8">
                {day.day}
              </span>
              <div className="flex-1">
                <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-slate-800 dark:text-white w-12 text-right">
                {day.present}/{day.total}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-700 dark:text-green-300">Average Attendance</span>
          <span className="text-lg font-bold text-green-700 dark:text-green-300">97.2%</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceWidget;