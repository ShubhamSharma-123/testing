import React from 'react';
import { Users, Clock, Calendar, DollarSign, TrendingUp, UserCheck } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const DashboardStats = () => {
  const { user } = useAuth();

  const getStatsForRole = () => {
    const baseStats = [
      {
        icon: Users,
        label: 'Total Employees',
        value: '247',
        change: '+12',
        changeType: 'increase' ,
        color: 'bg-blue-500'
      },
      {
        icon: Clock,
        label: 'Present Today',
        value: '234',
        change: '94.7%',
        changeType: 'neutral',
        color: 'bg-green-500'
      },
      {
        icon: Calendar,
        label: 'On Leave',
        value: '8',
        change: '-2',
        changeType: 'decrease' ,
        color: 'bg-orange-500'
      }
    ];

    if (user?.role === 'admin') {
      return [
        ...baseStats,
        {
          icon: DollarSign,
          label: 'Monthly Payroll',
          value: '$2.4M',
          change: '+5.2%',
          changeType: 'increase' ,
          color: 'bg-purple-500'
        }
      ];
    }

    if (user?.role === 'accountant') {
      return [
        ...baseStats,
        {
          icon: DollarSign,
          label: 'Pending Payroll',
          value: '$125K',
          change: '15 people',
          changeType: 'neutral' ,
          color: 'bg-purple-500'
        }
      ];
    }

    if (user?.role === 'supervisor') {
      return [
        {
          icon: UserCheck,
          label: 'Team Members',
          value: '24',
          change: '+2',
          changeType: 'increase',
          color: 'bg-blue-500'
        },
        {
          icon: TrendingUp,
          label: 'Projects Active',
          value: '8',
          change: '+1',
          changeType: 'increase',
          color: 'bg-green-500'
        },
        {
          icon: Clock,
          label: 'Team Present',
          value: '22',
          change: '91.7%',
          changeType: 'neutral' ,
          color: 'bg-orange-500'
        }
      ];
    }

    return baseStats;
  };

  const stats = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className={`text-sm font-medium px-2 py-1 rounded-lg ${
                stat.changeType === 'increase' 
                  ? 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400' 
                  : stat.changeType === 'decrease'
                  ? 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400'
                  : 'text-slate-600 bg-slate-100 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;