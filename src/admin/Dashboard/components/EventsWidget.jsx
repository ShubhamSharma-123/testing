import React from 'react';
import { Gift, Cake } from 'lucide-react';

const EventsWidget= () => {
  const events = [
    {
      id: 1,
      type: 'birthday',
      name: 'Alex Thompson',
      date: 'Today',
      department: 'Engineering',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 2,
      type: 'anniversary',
      name: 'Lisa Wang',
      date: 'Tomorrow',
      department: 'Marketing',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 3,
      type: 'birthday',
      name: 'John Davis',
      date: 'Dec 30',
      department: 'Sales',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-pink-500 rounded-xl">
          <Gift className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Upcoming Events</h3>
          <p className="text-slate-600 dark:text-slate-400">Birthdays & Anniversaries</p>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="relative">
              <img
                src={event.avatar}
                alt={event.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                event.type === 'birthday' ? 'bg-pink-500' : 'bg-amber-500'
              }`}>
                {event.type === 'birthday' ? (
                  <Cake className="w-3 h-3 text-white" />
                ) : (
                  <Gift className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-800 dark:text-white">{event.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{event.department}</p>
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {event.date}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-xl transition-all">
        View Calendar
      </button>
    </div>
  );
};

export default EventsWidget;