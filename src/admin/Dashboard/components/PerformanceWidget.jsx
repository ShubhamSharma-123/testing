import React from 'react';
import { TrendingUp, Award } from 'lucide-react';

const PerformanceWidget= () => {
  const topPerformers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      score: 98,
      department: 'Engineering',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 2,
      name: 'Michael Chen',
      score: 95,
      department: 'Design',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      score: 92,
      department: 'Marketing',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Top Performers</h3>
          <p className="text-slate-600 dark:text-slate-400">This quarter</p>
        </div>
      </div>

      <div className="space-y-4">
        {topPerformers.map((performer, index) => (
          <div key={performer.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="relative">
              <img
                src={performer.avatar}
                alt={performer.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              {index === 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Award className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800 dark:text-white">{performer.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{performer.department}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {performer.score}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">Score</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all">
        View All Reviews
      </button>
    </div>
  );
};

export default PerformanceWidget;