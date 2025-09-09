// import React, { useState, useRef, useEffect } from 'react';
// import { Link, Outlet, useLocation } from 'react-router-dom';

// function ProfileLayout() {
//   const location = useLocation();
//   const currentPath = location.pathname.split('/')[2] || 'profile';
//   const tabsRef = useRef(null);
//   const [showLeftScroll, setShowLeftScroll] = useState(false);
//   const [showRightScroll, setShowRightScroll] = useState(true);

//   const tabs = [
//     { id: 'profile', name: 'profile', description: 'Manage your profile information and settings' },
//     { id: 'projects', name: 'projects', description: 'View and manage your projects' },
//     { id: 'tasks', name: 'tasks', description: 'Track and organize your tasks' },
//     { id: 'attendance', name: 'attendance', description: 'View and manage your attendance records' },
//     { id: 'leaves', name: 'leaves', description: 'Request and track your leave applications' },
//     { id: 'leaves-quota', name: 'leaves quota', description: 'Check your available leave balance' },
//     { id: 'timesheet', name: 'timesheet', description: 'Manage your timesheet entries' },
//     { id: 'document', name: 'document', description: 'Access your important documents' },
//     { id: 'ticket', name: 'ticket', description: 'Raise and track support tickets' },
//     { id: 'increment-promotion', name: 'increment & promotion', description: 'View your career growth opportunities' },
//     { id: 'appreciation', name: 'appreciation', description: 'See your achievements and recognitions' }
//   ];

//   // Get current tab description
//   const getCurrentDescription = () => {
//     const currentTab = tabs.find(tab => tab.id === currentPath);
//     return currentTab ? currentTab.description : 'Manage your requests, calendar, and policies';
//   };

//   // Check if scrolling is available
//   useEffect(() => {
//     const checkScroll = () => {
//       if (tabsRef.current) {
//         const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
//         setShowLeftScroll(scrollLeft > 0);
//         setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
//       }
//     };

//     checkScroll();
//     window.addEventListener('resize', checkScroll);
//     if (tabsRef.current) {
//       tabsRef.current.addEventListener('scroll', checkScroll);
//     }

//     return () => {
//       window.removeEventListener('resize', checkScroll);
//       if (tabsRef.current) {
//         tabsRef.current.removeEventListener('scroll', checkScroll);
//       }
//     };
//   }, []);

//   const scrollTabs = (direction) => {
//     if (tabsRef.current) {
//       const scrollAmount = 200;
//       tabsRef.current.scrollBy({
//         left: direction === 'right' ? scrollAmount : -scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen ">
//       <div className="container mx-auto py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
//             Dashboard
//           </h1>
//           <p className="text-slate-600 dark:text-slate-300">
//             {getCurrentDescription()}
//           </p>
//         </div>

//         {/* Tab Navigation with Scroll Controls */}
//         <div className="relative mb-8">
//           {showLeftScroll && (
//             <button
//               onClick={() => scrollTabs('left')}
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-800 rounded-full p-2 shadow-md"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//           )}

//           {showRightScroll && (
//             <button
//               onClick={() => scrollTabs('right')}
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-800 rounded-full p-2 shadow-md"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           )}

//           <div
//             ref={tabsRef}
//             className="flex overflow-x-auto scrollbar-hide items-center gap-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-1"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {tabs.map((tab) => (
//               <Link
//                 key={tab.id}
//                 to={tab.id === 'profile' ? '' : tab.id}
//                 className={`whitespace-nowrap px-4 py-2 rounded-lg transition-all capitalize ${
//                   currentPath === tab.id
//                     ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
//                     : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
//                 }`}
//               >
//                 {tab.name}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 min-h-[500px]">
//           <Outlet />
//         </div>
//       </div>

//       <style>
//         {`
//           .scrollbar-hide {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//           }
//           .scrollbar-hide::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default ProfileLayout;
import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function ProfileLayout() {
  const location = useLocation();
  // Extract the path after the base route
  const pathParts = location.pathname.split("/");
  const currentPath = pathParts[pathParts.length - 1] || "profile";

  const tabsRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const tabs = [
    {
      id: "profile",
      name: "profile",
      description: "Manage your profile information and settings",
    },

    {
      id: "tasks",
      name: "tasks",
      description: "Track and organize your tasks",
    },
    {
      id: "attendance-system",
      name: "attendance",
      description: "View and manage your attendance records",
    },
    {
      id: "leave",
      name: "leaves",
      description: "Request and track your leave applications",
    },
    {
      id: "leaves-quota",
      name: "leaves quota",
      description: "Check your available leave balance",
    },
    {
      id: "timesheet",
      name: "timesheet",
      description: "Manage your timesheet entries",
    },
    {
      id: "document",
      name: "document",
      description: "Access your important documents",
    },
    {
      id: "emergency-contact",
      name: "emergency contact",
      description: "Manage your emergency contacts",
    },
    {
      id: "ticket",
      name: "ticket",
      description: "Raise and track support tickets",
    },
    {
      id: "increment-promotion",
      name: "increment & promotion",
      description: "View your career growth opportunities",
    },
    {
      id: "appreciation",
      name: "appreciation",
      description: "See your achievements and recognitions",
    },
  ];

  // Get current tab description
  const getCurrentDescription = () => {
    const currentTab = tabs.find((tab) => tab.id === currentPath);
    return currentTab
      ? currentTab.description
      : "Manage your requests, calendar, and policies";
  };

  // Check if scrolling is available
  useEffect(() => {
    const checkScroll = () => {
      if (tabsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    if (tabsRef.current) {
      tabsRef.current.addEventListener("scroll", checkScroll);
    }

    return () => {
      window.removeEventListener("resize", checkScroll);
      if (tabsRef.current) {
        tabsRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-8">
        {/* Header */}
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            {getCurrentDescription()}
          </p>
        </div> */}

        {/* Tab Navigation with Scroll Controls */}
        <div className="relative mb-8">
          {showLeftScroll && (
            <button
              onClick={() => scrollTabs("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-800 rounded-full p-2 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-slate-600 dark:text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {showRightScroll && (
            <button
              onClick={() => scrollTabs("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-slate-800 rounded-full p-2 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-slate-600 dark:text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          <div
            ref={tabsRef}
            className="flex overflow-x-auto scrollbar-hide items-center gap-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.id === "profile" ? "." : tab.id}
                className={`whitespace-nowrap px-4 py-2 rounded-lg transition-all capitalize ${
                  currentPath === tab.id
                    ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 min-h-[500px]">
          <Outlet />
        </div>
      </div>

      <style>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}

export default ProfileLayout;
