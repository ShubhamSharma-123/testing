import React, { useState } from 'react';
import { DollarSign, Download, Users, Calculator } from 'lucide-react';

const Payroll = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-12');

  // Mock payroll data
  const payrollData = [
    {
      id: 1,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP001',
      basicSalary: 85000,
      allowances: 15000,
      deductions: 12000,
      netSalary: 88000,
      status: 'processed',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 2,
      employeeName: 'Michael Chen',
      employeeId: 'EMP002',
      basicSalary: 75000,
      allowances: 12000,
      deductions: 10500,
      netSalary: 76500,
      status: 'processed',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 3,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP003',
      basicSalary: 65000,
      allowances: 10000,
      deductions: 9000,
      netSalary: 66000,
      status: 'pending',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  const payrollStats = {
    totalEmployees: 247,
    totalPayroll: 2400000,
    processed: 232,
    pending: 15
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Payroll Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Process and manage employee payroll</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all">
            <Calculator className="w-4 h-4" />
            Process Payroll
          </button>
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{payrollStats.totalEmployees}</p>
              <p className="text-slate-600 dark:text-slate-400">Total Employees</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{formatCurrency(payrollStats.totalPayroll)}</p>
              <p className="text-slate-600 dark:text-slate-400">Total Payroll</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-xl">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{payrollStats.processed}</p>
              <p className="text-slate-600 dark:text-slate-400">Processed</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{payrollStats.pending}</p>
              <p className="text-slate-600 dark:text-slate-400">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Pay Period:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="2024-12">December 2024</option>
            <option value="2024-11">November 2024</option>
            <option value="2024-10">October 2024</option>
          </select>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Payroll Summary - {selectedPeriod}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Employee</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Basic Salary</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Allowances</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Deductions</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Net Salary</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((record) => (
                <tr key={record.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={record.avatar}
                        alt={record.employeeName}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{record.employeeName}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{record.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{formatCurrency(record.basicSalary)}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{formatCurrency(record.allowances)}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{formatCurrency(record.deductions)}</td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-white">{formatCurrency(record.netSalary)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      record.status === 'processed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {record.status === 'processed' ? (
                      <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                        Download Payslip
                      </button>
                    ) : (
                      <button className="text-green-600 dark:text-green-400 hover:underline text-sm">
                        Process
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;