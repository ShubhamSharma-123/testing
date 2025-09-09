import React from 'react';
import { CheckSquare, Clock } from 'lucide-react';

const TasksWidget = () => {
  const tasks = [
    {
      id: 1,
      title: 'Review Q4 Performance Reports',
      priority: 'high',
      dueDate: 'Today',
      completed: false
    },
    {
      id: 2,
      title: 'Approve Leave Requests',
      priority: 'medium',
      dueDate: 'Tomorrow',
      completed: false
    },
    {
      id: 3,
      title: 'Update Employee Handbook',
      priority: 'low',
      dueDate: 'Dec 30',
      completed: true
    },
    {
      id: 4,
      title: 'Schedule Team Meetings',
      priority: 'medium',
      dueDate: 'Jan 2',
      completed: false
    }
  ];

  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500 rounded-xl">
          <CheckSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">My Tasks</h3>
          <p className="text-slate-600 dark:text-slate-400">{pendingTasks.length} pending</p>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.slice(0, 4).map((task) => (
          <div key={task.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
            task.completed 
              ? 'bg-green-50 dark:bg-green-900/20' 
              : 'bg-slate-50 dark:bg-slate-700/50'
          }`}>
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
              task.completed
                ? 'bg-green-500 border-green-500'
                : 'border-slate-300 dark:border-slate-600'
            }`}>
              {task.completed && <CheckSquare className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                task.completed 
                  ? 'text-green-700 dark:text-green-300 line-through' 
                  : 'text-slate-800 dark:text-white'
              }`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  task.priority === 'high' 
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                }`}>
                  {task.priority}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3 h-3" />
                  {task.dueDate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all">
        View All Tasks
      </button>
    </div>
  );
};

export default TasksWidget;