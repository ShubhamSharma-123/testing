// import React, { useState } from 'react';

// const EmployeeProfile = () => {
//   const [employeeData, setEmployeeData] = useState({
//     name: 'Prof. Bianka Collier',
//     role: 'Project Manager - Marketing',
//     userRole: 'Employee',
//     lastLogin: '--',
//     openTasks: 5,
//     projects: 4,
//     hoursLogged: 14,
//     tickets: 0,
//     about: 'I am super human',
//     employeeId: 'EMP-10',
//     designation: 'Project Manager',
//     department: 'Marketing',
//     gender: 'Male',
//     workAnniversary: '2 months from now',
//     dob: '--',
//     email: 'nulirich@example.org5',
//     mobile: '--',
//     slackId: '--',
//     hourlyRate: '$52',
//     address: '3140 Gutkowski Park O’Reillychester, NY 89631-5439',
//     skills: '--',
//     language: 'English',
//     probationEndDate: '--',
//     noticePeriodStartDate: '--',
//     noticePeriodEndDate: '--',
//     maritalStatus: 'Single',
//     businessAddress: 'Worksuite',
//     marriageAnniversaryDate: '--',
//     employmentType: '--',
//     joiningDate: '22-11-2024',
//     exitDate: '--',
//     reportingTo: '--',
//     reportingTeam: '--',
//     leavesTaken: 0,
//     lateAttendances: 0
//   });

//   return (
//     <div className="p-6">
//       {/* Header Section with Profile Image */}
//       <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
//         <div className="flex items-start gap-4">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
//               BC
//             </div>
//             <button className="absolute bottom-0 right-0 bg-white dark:bg-slate-700 rounded-full p-1 shadow-md border border-slate-200 dark:border-slate-600">
//               <i className="fas fa-camera text-slate-600 dark:text-slate-300 text-xs"></i>
//             </button>
//           </div>
          
//           <div>
//             <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.name}</h1>
//             <p className="text-slate-600 dark:text-slate-300">
//               {employeeData.role} | User Role: {employeeData.userRole}
//             </p>
//             <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//               Last login at {employeeData.lastLogin}
//             </p>
//           </div>
//         </div>
        
//         <div className="mt-4 md:mt-2">
//           <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center">
//             <i className="fas fa-edit mr-2"></i>Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Open Tasks</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.openTasks}</p>
//         </div>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Projects</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.projects}</p>
//         </div>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Hours Logged</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.hoursLogged}</p>
//         </div>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Tickets</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.tickets}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* About Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">About</h2>
//             <p className="text-slate-600 dark:text-slate-300">{employeeData.about}</p>
//           </div>

//           {/* Profile Info Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Profile Info</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Employee ID</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.employeeId}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Full Name</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.name}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Designation</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.designation}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Department</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.department}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Gender</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.gender}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Work Anniversary</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.workAnniversary}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Date of Birth</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.dob}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.email}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Mobile</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.mobile}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Slack Member ID</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.slackId}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Hourly Rate</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.hourlyRate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Address</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.address}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Skills</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.skills}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Language</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.language}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Probation End Date</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.probationEndDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Notice Period Start Date</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.noticePeriodStartDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Notice Period End Date</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.noticePeriodEndDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Marital Status</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.maritalStatus}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Business Address</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.businessAddress}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Marriage Anniversary Date</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.marriageAnniversaryDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Employment Type</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.employmentType}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Joining Date</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.joiningDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Exit Date</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.exitDate}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Appreciation Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Appreciation</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Reporting To</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.reportingTo}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Reporting Team</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.reportingTeam}</p>
//               </div>
//             </div>
//           </div>

//           {/* Late Attendance Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Late Attendance</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Leaves Taken</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.leavesTaken}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Late Attendances</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.lateAttendances}</p>
//               </div>
//             </div>
//           </div>

//           {/* Tasks Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Tasks</h2>
//             <p className="text-slate-600 dark:text-slate-300">Healing Suggestions</p>
//           </div>

//           {/* Tickets Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Tickets</h2>
//             <p className="text-slate-600 dark:text-slate-300">- Not enough data -</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeProfile;



// import React, { useState } from 'react';

// const EmployeeProfile = () => {
//   const [employeeData, setEmployeeData] = useState({
//     name: 'Prof. Bianka Collier',
//     image:'data:image/jpeg;base64,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',
//     role: 'Project Manager - Marketing',
//     userRole: 'Employee',
//     lastLogin: '--',
//     openTasks: 5,
//     projects: 4,
//     hoursLogged: 14,
//     tickets: 0,
//     about: 'I am super human',
//     employeeId: 'EMP-10',
//     designation: 'Project Manager',
//     department: 'Marketing',
//     gender: 'Male',
//     workAnniversary: '2 months from now',
//     dob: '--',
//     email: 'nulirich@example.org5',
//     mobile: '--',
//     slackId: '--',
//     hourlyRate: '$52',
//     address: '3140 Gutkowski Park O\'Reillychester, NY 89631-5439',
//     skills: '--',
//     language: 'English',
//     probationEndDate: '--',
//     noticePeriodStartDate: '--',
//     noticePeriodEndDate: '--',
//     maritalStatus: 'Single',
//     businessAddress: 'Worksuite',
//     marriageAnniversaryDate: '--',
//     employmentType: '--',
//     joiningDate: '22-11-2024',
//     exitDate: '--',
//     reportingTo: '--',
//     reportingTeam: '--',
//     leavesTaken: 0,
//     lateAttendances: 0
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState({...employeeData});

//   const handleEditToggle = () => {
//     if (isEditing) {
//       // Save changes
//       setEmployeeData({...editedData});
//     } else {
//       // Reset edited data to current data
//       setEditedData({...employeeData});
//     }
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (field, value) => {
//     setEditedData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleCancelEdit = () => {
//     setEditedData({...employeeData});
//     setIsEditing(false);
//   };

//   const renderEditableField = (field, value, label, type = 'text') => {
//     if (isEditing) {
//       return (
//         <div>
//           <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
//           <input
//             type={type}
//             value={value}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
//           />
//         </div>
//       );
//     }
    
//     return (
//       <div>
//         <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
//         <p className="text-slate-700 dark:text-slate-300">{value}</p>
//       </div>
//     );
//   };

//   return (
//     <div className="p-6">
//       {/* Header Section with Profile Image */}
//       <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
//         <div className="flex items-start gap-4">
//           <div className="relative">
//             {/* <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
//               BC
//             </div> */}
//             <img src={employeeData.image} alt="profile image" className='w-24 h-24 rounded-full' />
//             <button className="absolute bottom-0 right-0 bg-white dark:bg-slate-700 rounded-full p-1 shadow-md border border-slate-200 dark:border-slate-600">
//               <i className="fas fa-camera text-slate-600 dark:text-slate-300 text-xs"></i>
//             </button>
//           </div>
          
//           <div>
//             {isEditing ? (
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   value={editedData.name}
//                   onChange={(e) => handleInputChange('name', e.target.value)}
//                   className="text-2xl font-bold text-slate-800 dark:text-white bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none focus:border-blue-500"
//                 />
//                 <div className="mt-2">
//                   <input
//                     type="text"
//                     value={editedData.role}
//                     onChange={(e) => handleInputChange('role', e.target.value)}
//                     className="text-slate-600 dark:text-slate-300 bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none focus:border-blue-500 w-full"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.name}</h1>
//                 <p className="text-slate-600 dark:text-slate-300">
//                   {employeeData.role} | User Role: {employeeData.userRole}
//                 </p>
//               </>
//             )}
//             <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//               Last login at {employeeData.lastLogin}
//             </p>
//           </div>
//         </div>
        
//         <div className="mt-4 md:mt-2 flex gap-2">
//           {isEditing && (
//             <button 
//               onClick={handleCancelEdit}
//               className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg transition-colors flex items-center"
//             >
//               <i className="fas fa-times mr-2"></i>Cancel
//             </button>
//           )}
//           <button 
//             onClick={handleEditToggle}
//             className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
//               isEditing 
//                 ? 'bg-green-500 hover:bg-green-600 text-white' 
//                 : 'bg-blue-500 hover:bg-blue-600 text-white'
//             }`}
//           >
//             <i className={`fas ${isEditing ? 'fa-save' : 'fa-edit'} mr-2`}></i>
//             {isEditing ? 'Save Changes' : 'Edit Profile'}
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Open Tasks</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.openTasks}</p>
//         </div>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Projects</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.projects}</p>
//         </div>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Hours Logged</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.hoursLogged}</p>
//         </div>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Tickets</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.tickets}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* About Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">About</h2>
//             {isEditing ? (
//               <textarea
//                 value={editedData.about}
//                 onChange={(e) => handleInputChange('about', e.target.value)}
//                 className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
//                 rows="3"
//               />
//             ) : (
//               <p className="text-slate-600 dark:text-slate-300">{employeeData.about}</p>
//             )}
//           </div>

//           {/* Profile Info Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Profile Info</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {renderEditableField('employeeId', editedData.employeeId, 'Employee ID')}
//               {renderEditableField('name', editedData.name, 'Full Name')}
//               {renderEditableField('designation', editedData.designation, 'Designation')}
//               {renderEditableField('department', editedData.department, 'Department')}
//               {renderEditableField('gender', editedData.gender, 'Gender')}
//               {renderEditableField('workAnniversary', editedData.workAnniversary, 'Work Anniversary')}
//               {renderEditableField('dob', editedData.dob, 'Date of Birth')}
//               {renderEditableField('email', editedData.email, 'Email', 'email')}
//               {renderEditableField('mobile', editedData.mobile, 'Mobile', 'tel')}
//               {renderEditableField('slackId', editedData.slackId, 'Slack Member ID')}
//               {renderEditableField('hourlyRate', editedData.hourlyRate, 'Hourly Rate')}
//               {renderEditableField('address', editedData.address, 'Address')}
//               {renderEditableField('skills', editedData.skills, 'Skills')}
//               {renderEditableField('language', editedData.language, 'Language')}
//               {renderEditableField('probationEndDate', editedData.probationEndDate, 'Probation End Date')}
//               {renderEditableField('noticePeriodStartDate', editedData.noticePeriodStartDate, 'Notice Period Start Date')}
//               {renderEditableField('noticePeriodEndDate', editedData.noticePeriodEndDate, 'Notice Period End Date')}
//               {renderEditableField('maritalStatus', editedData.maritalStatus, 'Marital Status')}
//               {renderEditableField('businessAddress', editedData.businessAddress, 'Business Address')}
//               {renderEditableField('marriageAnniversaryDate', editedData.marriageAnniversaryDate, 'Marriage Anniversary Date')}
//               {renderEditableField('employmentType', editedData.employmentType, 'Employment Type')}
//               {renderEditableField('joiningDate', editedData.joiningDate, 'Joining Date')}
//               {renderEditableField('exitDate', editedData.exitDate, 'Exit Date')}
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Appreciation Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Appreciation</h2>
//             <div className="grid grid-cols-2 gap-4">
//               {renderEditableField('reportingTo', editedData.reportingTo, 'Reporting To')}
//               {renderEditableField('reportingTeam', editedData.reportingTeam, 'Reporting Team')}
//             </div>
//           </div>

//           {/* Late Attendance Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Late Attendance</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Leaves Taken</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.leavesTaken}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Late Attendances</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.lateAttendances}</p>
//               </div>
//             </div>
//           </div>

//           {/* Tasks Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Tasks</h2>
//             <p className="text-slate-600 dark:text-slate-300">Healing Suggestions</p>
//           </div>

//           {/* Tickets Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Tickets</h2>
//             <p className="text-slate-600 dark:text-slate-300">- Not enough data -</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeProfile;


// import React, { useState, useRef } from 'react';

// const EmployeeProfile = () => {
//   const [employeeData, setEmployeeData] = useState({
//     name: 'Prof. Bianka Collier',
//     image: '',
//     role: 'Project Manager - Marketing',
//     userRole: 'Employee',
//     lastLogin: '--',
//     openTasks: 5,
//     projects: 4,
//     hoursLogged: 14,
//     tickets: 0,
//     about: 'I am super human',
//     employeeId: 'EMP-10',
//     designation: 'Project Manager',
//     department: 'Marketing',
//     gender: 'Male',
//     workAnniversary: '2 months from now',
//     dob: '--',
//     email: 'nulirich@example.org5',
//     mobile: '--',
//     slackId: '--',
//     hourlyRate: '$52',
//     address: '3140 Gutkowski Park O\'Reillychester, NY 89631-5439',
//     skills: '--',
//     language: 'English',
//     probationEndDate: '--',
//     noticePeriodStartDate: '--',
//     noticePeriodEndDate: '--',
//     maritalStatus: 'Single',
//     businessAddress: 'Worksuite',
//     marriageAnniversaryDate: '--',
//     employmentType: '--',
//     joiningDate: '22-11-2024',
//     exitDate: '--',
//     reportingTo: '--',
//     reportingTeam: '--',
//     leavesTaken: 0,
//     lateAttendances: 0
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState({...employeeData});
//   const fileInputRef = useRef(null);

//   const handleEditToggle = () => {
//     if (isEditing) {
//       // Save changes
//       setEmployeeData({...editedData});
//     } else {
//       // Reset edited data to current data
//       setEditedData({...employeeData});
//     }
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (field, value) => {
//     setEditedData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleCancelEdit = () => {
//     setEditedData({...employeeData});
//     setIsEditing(false);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setEditedData(prev => ({
//           ...prev,
//           image: e.target.result
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   const renderEditableField = (field, value, label, type = 'text') => {
//     if (isEditing) {
//       return (
//         <div>
//           <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
//           <input
//             type={type}
//             value={value}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
//           />
//         </div>
//       );
//     }
    
//     return (
//       <div>
//         <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
//         <p className="text-slate-700 dark:text-slate-300">{value}</p>
//       </div>
//     );
//   };

//   return (
//     <div className="p-6">
//       {/* Header Section with Profile Image */}
//       <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
//         <div className="flex items-start gap-4">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-full overflow-hidden  flex items-center justify-center">
//               <img 
//                 src={isEditing ? editedData.image : employeeData.image} 
//                 alt="Profile" 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             {isEditing && (
//               <>
//                 <button 
//                   onClick={triggerFileInput}
//                   className="absolute bottom-0 right-0 bg-white dark:bg-slate-700 rounded-full p-1 shadow-md border border-slate-200 dark:border-slate-600"
//                 >
//                   <i className="fas fa-camera text-slate-600 dark:text-slate-300 text-xs"></i>
//                 </button>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageUpload}
//                   accept="image/*"
//                   className="hidden"
//                 />
//               </>
//             )}
//             {!isEditing && (
//               <button className="absolute bottom-0 right-0 bg-white dark:bg-slate-700 rounded-full p-1 shadow-md border border-slate-200 dark:border-slate-600">
//                 <i className="fas fa-camera text-slate-600 dark:text-slate-300 text-xs"></i>
//               </button>
//             )}
//           </div>
          
//           <div>
//             {isEditing ? (
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   value={editedData.name}
//                   onChange={(e) => handleInputChange('name', e.target.value)}
//                   className="text-2xl font-bold text-slate-800 dark:text-white bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none focus:border-blue-500"
//                 />
//                 <div className="mt-2">
//                   <input
//                     type="text"
//                     value={editedData.role}
//                     onChange={(e) => handleInputChange('role', e.target.value)}
//                     className="text-slate-600 dark:text-slate-300 bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none focus:border-blue-500 w-full"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.name}</h1>
//                 <p className="text-slate-600 dark:text-slate-300">
//                   {employeeData.role} | User Role: {employeeData.userRole}
//                 </p>
//               </>
//             )}
//             <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//               Last login at {employeeData.lastLogin}
//             </p>
//           </div>
//         </div>
        
//         <div className="mt-4 md:mt-2 flex gap-2">
//           {isEditing && (
//             <button 
//               onClick={handleCancelEdit}
//               className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg transition-colors flex items-center"
//             >
//               <i className="fas fa-times mr-2"></i>Cancel
//             </button>
//           )}
//           <button 
//             onClick={handleEditToggle}
//             className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
//               isEditing 
//                 ? 'bg-green-500 hover:bg-green-600 text-white' 
//                 : 'bg-blue-500 hover:bg-blue-600 text-white'
//             }`}
//           >
//             <i className={`fas ${isEditing ? 'fa-save' : 'fa-edit'} mr-2`}></i>
//             {isEditing ? 'Save Changes' : 'Edit Profile'}
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Open Tasks</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.openTasks}</p>
//         </div>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Projects</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.projects}</p>
//         </div>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Hours Logged</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.hoursLogged}</p>
//         </div>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
//           <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Tickets</h3>
//           <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.tickets}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* About Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">About</h2>
//             {isEditing ? (
//               <textarea
//                 value={editedData.about}
//                 onChange={(e) => handleInputChange('about', e.target.value)}
//                 className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
//                 rows="3"
//               />
//             ) : (
//               <p className="text-slate-600 dark:text-slate-300">{employeeData.about}</p>
//             )}
//           </div>

//           {/* Profile Info Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Profile Info</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {renderEditableField('employeeId', editedData.employeeId, 'Employee ID')}
//               {renderEditableField('name', editedData.name, 'Full Name')}
//               {renderEditableField('designation', editedData.designation, 'Designation')}
//               {renderEditableField('department', editedData.department, 'Department')}
//               {renderEditableField('gender', editedData.gender, 'Gender')}
//               {renderEditableField('workAnniversary', editedData.workAnniversary, 'Work Anniversary')}
//               {renderEditableField('dob', editedData.dob, 'Date of Birth')}
//               {renderEditableField('email', editedData.email, 'Email', 'email')}
//               {renderEditableField('mobile', editedData.mobile, 'Mobile', 'tel')}
//               {renderEditableField('slackId', editedData.slackId, 'Slack Member ID')}
//               {renderEditableField('hourlyRate', editedData.hourlyRate, 'Hourly Rate')}
//               {renderEditableField('address', editedData.address, 'Address')}
//               {renderEditableField('skills', editedData.skills, 'Skills')}
//               {renderEditableField('language', editedData.language, 'Language')}
//               {renderEditableField('probationEndDate', editedData.probationEndDate, 'Probation End Date')}
//               {renderEditableField('noticePeriodStartDate', editedData.noticePeriodStartDate, 'Notice Period Start Date')}
//               {renderEditableField('noticePeriodEndDate', editedData.noticePeriodEndDate, 'Notice Period End Date')}
//               {renderEditableField('maritalStatus', editedData.maritalStatus, 'Marital Status')}
//               {renderEditableField('businessAddress', editedData.businessAddress, 'Business Address')}
//               {renderEditableField('marriageAnniversaryDate', editedData.marriageAnniversaryDate, 'Marriage Anniversary Date')}
//               {renderEditableField('employmentType', editedData.employmentType, 'Employment Type')}
//               {renderEditableField('joiningDate', editedData.joiningDate, 'Joining Date')}
//               {renderEditableField('exitDate', editedData.exitDate, 'Exit Date')}
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Appreciation Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Appreciation</h2>
//             <div className="grid grid-cols-2 gap-4">
//               {renderEditableField('reportingTo', editedData.reportingTo, 'Reporting To')}
//               {renderEditableField('reportingTeam', editedData.reportingTeam, 'Reporting Team')}
//             </div>
//           </div>

//           {/* Late Attendance Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Late Attendance</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Leaves Taken</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.leavesTaken}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">Late Attendances</p>
//                 <p className="text-slate-700 dark:text-slate-300">{employeeData.lateAttendances}</p>
//               </div>
//             </div>
//           </div>

//           {/* Tasks Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Tasks</h2>
//             <p className="text-slate-600 dark:text-slate-300">Healing Suggestions</p>
//           </div>

//           {/* Tickets Section */}
//           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Tickets</h2>
//             <p className="text-slate-600 dark:text-slate-300">- Not enough data -</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeProfile;


import React, { useState, useRef } from 'react';

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState({
    name: 'Prof. Bianka Collier',
    image: '',
    role: 'Project Manager - Marketing',
    userRole: 'Employee',
    lastLogin: '--',
    openTasks: 5,
    projects: 4,
    hoursLogged: 14,
    tickets: 0,
    about: 'I am super human',
    employeeId: 'EMP-10',
    designation: 'Project Manager',
    department: 'Marketing',
    gender: 'Male',
    workAnniversary: '2 months from now',
    dob: '--',
    email: 'nulirich@example.org5',
    mobile: '--',
    slackId: '--',
    hourlyRate: '$52',
    address: '3140 Gutkowski Park O\'Reillychester, NY 89631-5439',
    skills: '--',
    language: 'English',
    probationEndDate: '--',
    noticePeriodStartDate: '--',
    noticePeriodEndDate: '--',
    maritalStatus: 'Single',
    businessAddress: 'Worksuite',
    marriageAnniversaryDate: '--',
    employmentType: '--',
    joiningDate: '22-11-2024',
    exitDate: '--',
    reportingTo: '--',
    reportingTeam: '--',
    leavesTaken: 0,
    lateAttendances: 0
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({...employeeData});
  const fileInputRef = useRef(null);

  // Default profile image
  const defaultProfileImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e1'%3E%3Cpath fill-rule='evenodd' d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' clip-rule='evenodd' /%3E%3C/svg%3E";

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setEmployeeData({...editedData});
    } else {
      // Reset edited data to current data
      setEditedData({...employeeData});
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditedData({...employeeData});
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const renderEditableField = (field, value, label, type = 'text') => {
    if (isEditing) {
      return (
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
          <input
            type={type}
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
          />
        </div>
      );
    }
    
    return (
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-slate-700 dark:text-slate-300">{value}</p>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header Section with Profile Image */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden  flex items-center justify-center">
              <img 
                src={(isEditing ? editedData.image : employeeData.image) || defaultProfileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <>
                <button 
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-white dark:bg-slate-700 rounded-full p-2 shadow-md border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                  title="Upload image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600 dark:text-slate-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </>
            )}
          </div>
          
          <div>
            {isEditing ? (
              <div className="mb-4">
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl font-bold text-slate-800 dark:text-white bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none focus:border-blue-500"
                />
                <div className="mt-2">
                  <input
                    type="text"
                    value={editedData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="text-slate-600 dark:text-slate-300 bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.name}</h1>
                <p className="text-slate-600 dark:text-slate-300">
                  {employeeData.role} | User Role: {employeeData.userRole}
                </p>
              </>
            )}
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Last login at {employeeData.lastLogin}
            </p>
          </div>
        </div>
        
        <div className="mt-4 md:mt-2 flex gap-2">
          {isEditing && (
            <button 
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-lg transition-colors flex items-center"
            >
              <i className="fas fa-times mr-2"></i>Cancel
            </button>
          )}
          <button 
            onClick={handleEditToggle}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
              isEditing 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <i className={`fas ${isEditing ? 'fa-save' : 'fa-edit'} mr-2`}></i>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Open Tasks</h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.openTasks}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Projects</h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.projects}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Hours Logged</h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.hoursLogged}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">Tickets</h3>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{employeeData.tickets}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* About Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">About</h2>
            {isEditing ? (
              <textarea
                value={editedData.about}
                onChange={(e) => handleInputChange('about', e.target.value)}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                rows="3"
              />
            ) : (
              <p className="text-slate-600 dark:text-slate-300">{employeeData.about}</p>
            )}
          </div>

          {/* Profile Info Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Profile Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderEditableField('employeeId', editedData.employeeId, 'Employee ID')}
              {renderEditableField('name', editedData.name, 'Full Name')}
              {renderEditableField('designation', editedData.designation, 'Designation')}
              {renderEditableField('department', editedData.department, 'Department')}
              {renderEditableField('gender', editedData.gender, 'Gender')}
              {renderEditableField('workAnniversary', editedData.workAnniversary, 'Work Anniversary')}
              {renderEditableField('dob', editedData.dob, 'Date of Birth')}
              {renderEditableField('email', editedData.email, 'Email', 'email')}
              {renderEditableField('mobile', editedData.mobile, 'Mobile', 'tel')}
              {renderEditableField('slackId', editedData.slackId, 'Slack Member ID')}
              {renderEditableField('hourlyRate', editedData.hourlyRate, 'Hourly Rate')}
              {renderEditableField('address', editedData.address, 'Address')}
              {renderEditableField('skills', editedData.skills, 'Skills')}
              {renderEditableField('language', editedData.language, 'Language')}
              {renderEditableField('probationEndDate', editedData.probationEndDate, 'Probation End Date')}
              {renderEditableField('noticePeriodStartDate', editedData.noticePeriodStartDate, 'Notice Period Start Date')}
              {renderEditableField('noticePeriodEndDate', editedData.noticePeriodEndDate, 'Notice Period End Date')}
              {renderEditableField('maritalStatus', editedData.maritalStatus, 'Marital Status')}
              {renderEditableField('businessAddress', editedData.businessAddress, 'Business Address')}
              {renderEditableField('marriageAnniversaryDate', editedData.marriageAnniversaryDate, 'Marriage Anniversary Date')}
              {renderEditableField('employmentType', editedData.employmentType, 'Employment Type')}
              {renderEditableField('joiningDate', editedData.joiningDate, 'Joining Date')}
              {renderEditableField('exitDate', editedData.exitDate, 'Exit Date')}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Appreciation Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Appreciation</h2>
            <div className="grid grid-cols-2 gap-4">
              {renderEditableField('reportingTo', editedData.reportingTo, 'Reporting To')}
              {renderEditableField('reportingTeam', editedData.reportingTeam, 'Reporting Team')}
            </div>
          </div>

          {/* Late Attendance Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Late Attendance</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Leaves Taken</p>
                <p className="text-slate-700 dark:text-slate-300">{employeeData.leavesTaken}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Late Attendances</p>
                <p className="text-slate-700 dark:text-slate-300">{employeeData.lateAttendances}</p>
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Tasks</h2>
            <p className="text-slate-600 dark:text-slate-300">Healing Suggestions</p>
          </div>

          {/* Tickets Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Tickets</h2>
            <p className="text-slate-600 dark:text-slate-300">- Not enough data -</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;