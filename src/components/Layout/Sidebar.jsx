
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Clock, Calendar, DollarSign, 
  TrendingUp, FileText, Shield, UserCheck, BarChart3, 
  Settings, ChevronLeft, ChevronRight, Building, UserRound, ChevronDown, ChevronUp,Bell,PartyPopper,CalendarRange ,Building2, 
  
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';


const Sidebar = ({ isCollapsed, onToggle }) => {
  const { user } = useAuth();
  const [isHrExpanded, setIsHrExpanded] = useState(true);
  const loction =  useLocation().pathname.split('/').at('1')


  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: `/${loction}/dashboard`, roles: ['admin', 'hr', 'accountant', 'supervisor'] },
    {
      icon: UserRound,
      label: 'HR',
      roles: ['admin', 'hr'],
      children: [
        { icon: Users, label: 'Employees', path: `/${loction}/employees`, roles: ['admin', 'hr'] },
        { icon: Clock, label: 'Attendance', path: `/${loction}/attendance`, roles: ['admin', 'hr'] },
        { icon: Calendar, label: 'Leave', path: `/${loction}/leave`, roles: ['admin', 'hr'] },
        { icon: FileText, label: 'Documents', path: `/${loction}/documents`, roles: ['admin', 'hr', ] },
        { icon: CalendarRange, label: 'Holidays', path: `/${loction}/holiday`, roles: ['admin', 'hr', ] },
      ]
    },
    {icon: Clock, label: 'Attendance', path: `/${loction}/my-attendance`, roles:['hr', 'accountant', 'supervisor']},
    {icon: Calendar, label: 'Leave', path: `/${loction}/my-leave`, roles:[ 'hr', 'accountant', 'supervisor']},
    
    { icon: DollarSign, label: 'Payroll', path: `/${loction}/payroll`, roles: ['admin', 'accountant'] },
    { icon: TrendingUp, label: 'Performance', path: `/${loction}/performance`, roles: ['admin', 'hr'] },
    // { icon: FileText, label: 'Documents', path: '/documents', roles: ['admin', 'hr'] },
    { icon: Shield, label: 'Policies', path: `/${loction}/policies`, roles: ['admin', 'hr'] },
    { icon: UserCheck, label: 'Supervisor', roles: ['supervisor'],children:[
      {icon: Building2, label: 'Company', path:`/${loction}/company`, roles:['supervisor']},
      {icon: Users, label: 'Employees', path:`/${loction}/employees`, roles:['supervisor']},
      {icon: Clock, label: 'Attendance', path:`/${loction}/attendance`, roles:['supervisor']}
    ]},
    { icon: PartyPopper, label: 'Events', path: `/${loction}/event`, roles: ['admin', 'hr'] },
    { icon: Bell, label: 'Notice Board', path: `/${loction}/notices`, roles: ['admin', 'hr', 'accountant'] },
    { icon: BarChart3, label: 'Reports', path: `/${loction}/reports`, roles: ['admin', 'hr', 'accountant'] },
    { icon: Settings, label: 'Settings', path: `/${loction}/settings`, roles: ['admin'] },
  ];

  const renderNavItem = (item) => {
    const Icon = item.icon;

    if (item.children) {
      return (
        item.roles.includes(user?.role || '') && (
          <div key={item.label}>
            <button
              onClick={() => setIsHrExpanded(!isHrExpanded)}
              className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-xl transition-all duration-200 group ${
                isCollapsed
                  ? 'justify-center text-slate-600 dark:text-slate-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {isHrExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </>
              )}
            </button>

            {isHrExpanded && (
              <div className="space-y-1 mt-1">
                {item.children.map((child) =>
                  child.roles.includes(user?.role || '') && (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) => `
                        flex items-center gap-3 ${isCollapsed ? '' : 'pl-8'} py-2.5 rounded-xl transition-all duration-200 group
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400 shadow-lg' 
                          : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-blue-600 dark:hover:text-blue-400'
                        }
                      `}
                    >
                      <child.icon className="w-4 h-4 flex-shrink-0" />
                      {!isCollapsed && <span className="text-sm">{child.label}</span>}
                    </NavLink>
                  )
                )}
              </div>
            )}
          </div>
        )
      );
    }

    return (
      item.roles.includes(user?.role || '') && (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            flex items-center gap-3 px-2 py-2.5 rounded-xl transition-all duration-200 group
            ${isActive 
              ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400 shadow-lg' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-blue-600 dark:hover:text-blue-400'
            }
          `}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">{item.label}</span>}
        </NavLink>
      )
    );
  };

 

  return (
  <div
    className={`fixed left-0 top-0 h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-white/20 dark:border-slate-700/20 transition-all duration-300 z-30 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col`}
  >
    {/* Logo */}
    <div className="p-4 border-b border-white/20 dark:border-slate-700/20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <Building className="w-5 h-5 text-white" />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">
              Dzire Group
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              HRMS Portal
            </p>
          </div>
        )}
      </div>
    </div>

    {/* Navigation - scrollable */}
    <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
      {navigationItems.map((item) => renderNavItem(item))}
    </nav>

    {/* Toggle Button */}
    <button
      onClick={onToggle}
      className="absolute -right-3 top-8 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
    >
      {isCollapsed ? (
        <ChevronRight className="w-3 h-3 text-slate-600 dark:text-slate-300" />
      ) : (
        <ChevronLeft className="w-3 h-3 text-slate-600 dark:text-slate-300" />
      )}
    </button>
  </div>
);

};

export default Sidebar;
