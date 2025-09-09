import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

const PayrollWidget= () => {
  const payrollStats = [
    { label: 'Processed', amount: '$2.1M', count: '232 employees' },
    { label: 'Pending', amount: '$125K', count: '15 employees' },
    { label: 'This Month', amount: '$2.4M', count: '247 employees' }
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500 rounded-xl">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Payroll Summary</h3>
            <p className="text-slate-600 dark:text-slate-400">December 2024</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+5.2%</span>
        </div>
      </div>

      <div className="space-y-4">
        {payrollStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">{stat.label}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{stat.count}</p>
            </div>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {stat.amount}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all">
        Generate Payslips
      </button>
    </div>
  );
};

export default PayrollWidget;