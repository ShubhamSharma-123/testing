import React from 'react';
import { TrendingUp, Award, Target, Star } from 'lucide-react';

const Performance = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Performance Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Track and manage employee performance</p>
      </div>

      {/* Coming Soon Message */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-12 border border-white/20 dark:border-slate-700/20 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Performance Module</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          Comprehensive performance tracking, goal setting, and review management system coming soon.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <Award className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Performance Reviews</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Annual and quarterly review cycles</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <Target className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Goal Setting</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">SMART goals and OKR tracking</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <Star className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">360° Feedback</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Multi-source feedback system</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;