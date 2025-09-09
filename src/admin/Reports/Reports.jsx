import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Reports & Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400">Generate comprehensive HR reports and insights</p>
      </div>

      {/* Coming Soon Message */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-12 border border-white/20 dark:border-slate-700/20 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Analytics Dashboard</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Advanced reporting and analytics tools for data-driven HR decision making.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <BarChart3 className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Attendance Reports</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Detailed attendance analytics</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <PieChart className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Payroll Analytics</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Salary distribution and trends</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Performance Metrics</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Employee performance insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;