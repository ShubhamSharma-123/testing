import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    dashboard: 'Dashboard',
    employees: 'Employees',
    attendance: 'Attendance',
    leave: 'Leave Management',
    payroll: 'Payroll',
    performance: 'Performance',
    documents: 'Documents',
    policies: 'Policies',
    supervisor: 'Supervisor Panel',
    reports: 'Reports & Analytics',
    settings: 'Settings',
    profile: 'My Profile',
    notices: 'Notices',
    events: 'Events',
    holiday: 'Holiday'
  };

  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        Dashboard
      </Link>
      
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = breadcrumbNameMap[pathname] || pathname;

        return (
          <React.Fragment key={pathname}>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            {isLast ? (
              <span className="text-slate-700 dark:text-slate-200 font-medium">
                {name}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;