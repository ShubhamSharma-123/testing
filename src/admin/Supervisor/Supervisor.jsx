
// import React, { useState } from 'react';
// import { Building2, Users, Plus, Search, Eye, Edit, Trash2, UserCheck, Calendar, AlertCircle } from 'lucide-react';

// const Supervisor = () => {
//   const [selectedTab, setSelectedTab] = useState('clients');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddClientModal, setShowAddClientModal] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [showRequestModal, setShowRequestModal] = useState(false);

//   const [clients, setClients] = useState([
//     {
//       id: 1,
//       name: 'TechCorp Solutions',
//       contactPerson: 'John Smith',
//       email: 'john@techcorp.com',
//       phone: '+1-555-0123',
//       address: '123 Tech Street, Silicon Valley',
//       projectType: 'Web Development',
//       startDate: '2024-01-15',
//       status: 'active',
//       assignedEmployees: 3,
//       totalProjects: 2
//     },
//     {
//       id: 2,
//       name: 'Digital Marketing Pro',
//       contactPerson: 'Sarah Johnson',
//       email: 'sarah@digitalmp.com',
//       phone: '+1-555-0124',
//       address: '456 Marketing Ave, New York',
//       projectType: 'Digital Marketing',
//       startDate: '2024-02-01',
//       status: 'active',
//       assignedEmployees: 2,
//       totalProjects: 1
//     },
//     {
//       id: 3,
//       name: 'FinanceFlow Inc',
//       contactPerson: 'Michael Chen',
//       email: 'michael@financeflow.com',
//       phone: '+1-555-0125',
//       address: '789 Finance Blvd, Chicago',
//       projectType: 'Financial Software',
//       startDate: '2024-03-10',
//       status: 'completed',
//       assignedEmployees: 1,
//       totalProjects: 1
//     }
//   ]);

//   const [assignments, setAssignments] = useState([
//     {
//       id: 1,
//       employeeName: 'Sarah Johnson',
//       employeeId: 'EMP001',
//       clientName: 'TechCorp Solutions',
//       projectName: 'E-commerce Platform',
//       role: 'Frontend Developer',
//       startDate: '2024-01-15',
//       endDate: '2024-06-15',
//       status: 'active',
//       avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
//     },
//     {
//       id: 2,
//       employeeName: 'Michael Chen',
//       employeeId: 'EMP002',
//       clientName: 'Digital Marketing Pro',
//       projectName: 'SEO Campaign',
//       role: 'SEO Specialist',
//       startDate: '2024-02-01',
//       endDate: '2024-05-01',
//       status: 'active',
//       avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
//     }
//   ]);

//   const [actionRequests, setActionRequests] = useState([
//     {
//       id: 1,
//       title: 'Additional Resources for TechCorp Project',
//       description: 'Need 2 more developers for the e-commerce platform project to meet the deadline.',
//       priority: 'high',
//       status: 'pending',
//       requestedBy: 'Current Supervisor',
//       requestDate: '2024-12-20',
//       clientName: 'TechCorp Solutions'
//     },
//     {
//       id: 2,
//       title: 'Budget Approval for Marketing Tools',
//       description: 'Requesting approval for premium marketing tools subscription for Digital Marketing Pro project.',
//       priority: 'medium',
//       status: 'approved',
//       requestedBy: 'Current Supervisor',
//       requestDate: '2024-12-18',
//       clientName: 'Digital Marketing Pro'
//     }
//   ]);

//   const [newClient, setNewClient] = useState({
//     name: '',
//     contactPerson: '',
//     email: '',
//     phone: '',
//     address: '',
//     projectType: ''
//   });

//   const [newRequest, setNewRequest] = useState({
//     title: '',
//     description: '',
//     priority: 'medium',
//     clientName: ''
//   });

//   const handleAddClient = (e) => {
//     e.preventDefault();
//     const client = {
//       id: Date.now(),
//       ...newClient,
//       startDate: new Date().toISOString().split('T')[0],
//       status: 'active',
//       assignedEmployees: 0,
//       totalProjects: 0
//     };
//     setClients([client, ...clients]);
//     setNewClient({ name: '', contactPerson: '', email: '', phone: '', address: '', projectType: '' });
//     setShowAddClientModal(false);
//   };

//   const handleCreateRequest = (e) => {
//     e.preventDefault();
//     const request = {
//       id: Date.now(),
//       ...newRequest,
//       status: 'pending',
//       requestedBy: 'Current Supervisor',
//       requestDate: new Date().toISOString().split('T')[0]
//     };
//     setActionRequests([request, ...actionRequests]);
//     setNewRequest({ title: '', description: '', priority: 'medium', clientName: '' });
//     setShowRequestModal(false);
//   };

//   const filteredClients = clients.filter(client =>
//     client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
//       case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
//       case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
//       default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Supervisor Dashboard</h1>
//           <p className="text-slate-600 dark:text-slate-400">Manage clients, employee assignments, and project coordination</p>
//         </div>
//         <div className="flex gap-2">
//           <button 
//             onClick={() => setShowAddClientModal(true)}
//             className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
//           >
//             <Plus className="w-4 h-4" />
//             Add Client
//           </button>
//           <button 
//             onClick={() => setShowRequestModal(true)}
//             className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all"
//           >
//             <AlertCircle className="w-4 h-4" />
//             New Request
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-blue-500 rounded-xl">
//               <Building2 className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-slate-800 dark:text-white">{clients.length}</p>
//               <p className="text-slate-600 dark:text-slate-400">Total Clients</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-green-500 rounded-xl">
//               <UserCheck className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-slate-800 dark:text-white">
//                 {clients.filter(c => c.status === 'active').length}
//               </p>
//               <p className="text-slate-600 dark:text-slate-400">Active Projects</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-purple-500 rounded-xl">
//               <Users className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-slate-800 dark:text-white">{assignments.length}</p>
//               <p className="text-slate-600 dark:text-slate-400">Assignments</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-yellow-500 rounded-xl">
//               <AlertCircle className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-slate-800 dark:text-white">
//                 {actionRequests.filter(r => r.status === 'pending').length}
//               </p>
//               <p className="text-slate-600 dark:text-slate-400">Pending Requests</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-1">
//         {(['clients', 'assignments', 'requests']).map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setSelectedTab(tab)}
//             className={`px-4 py-2 rounded-lg transition-all capitalize flex-1 ${
//               selectedTab === tab 
//                 ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm' 
//                 : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content based on selected tab */}
//       {selectedTab === 'clients' && (
//         <div className="space-y-6">
//           {/* Search */}
//           <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search clients..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//               />
//             </div>
//           </div>

//           {/* Clients Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {filteredClients.map((client) => (
//               <div key={client.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{client.name}</h3>
//                     <p className="text-slate-600 dark:text-slate-400">{client.projectType}</p>
//                   </div>
//                   <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
//                     client.status === 'active' 
//                       ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
//                       : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
//                   }`}>
//                     {client.status}
//                   </span>
//                 </div>

//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-500 dark:text-slate-400">Contact:</span>
//                     <span className="text-slate-700 dark:text-slate-300">{client.contactPerson}</span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-500 dark:text-slate-400">Email:</span>
//                     <span className="text-slate-700 dark:text-slate-300">{client.email}</span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-500 dark:text-slate-400">Assigned:</span>
//                     <span className="text-slate-700 dark:text-slate-300">{client.assignedEmployees} employees</span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-slate-500 dark:text-slate-400">Start Date:</span>
//                     <span className="text-slate-700 dark:text-slate-300">
//                       {new Date(client.startDate).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
//                   <button className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg text-sm transition-all flex-1 justify-center">
//                     <Eye className="w-4 h-4" />
//                     View Details
//                   </button>
//                   <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 px-3 py-1 rounded-lg text-sm transition-all flex-1 justify-center">
//                     <Edit className="w-4 h-4" />
//                     Edit
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {selectedTab === 'assignments' && (
//         <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
//           <div className="p-6 border-b border-slate-200 dark:border-slate-700">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Employee Assignments</h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-slate-50 dark:bg-slate-700/50">
//                 <tr>
//                   <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Employee</th>
//                   <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Client</th>
//                   <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Project</th>
//                   <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Role</th>
//                   <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Duration</th>
//                   <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {assignments.map((assignment) => (
//                   <tr key={assignment.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={assignment.avatar}
//                           alt={assignment.employeeName}
//                           className="w-10 h-10 rounded-lg object-cover"
//                         />
//                         <div>
//                           <p className="font-medium text-slate-800 dark:text-white">{assignment.employeeName}</p>
//                           <p className="text-sm text-slate-500 dark:text-slate-400">{assignment.employeeId}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4 text-slate-700 dark:text-slate-300">{assignment.clientName}</td>
//                     <td className="p-4 text-slate-700 dark:text-slate-300">{assignment.projectName}</td>
//                     <td className="p-4 text-slate-700 dark:text-slate-300">{assignment.role}</td>
//                     <td className="p-4 text-slate-700 dark:text-slate-300">
//                       {new Date(assignment.startDate).toLocaleDateString()} - {new Date(assignment.endDate).toLocaleDateString()}
//                     </td>
//                     <td className="p-4">
//                       <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-lg text-xs font-medium">
//                         {assignment.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {selectedTab === 'requests' && (
//         <div className="space-y-4">
//           {actionRequests.map((request) => (
//             <div key={request.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{request.title}</h3>
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(request.priority)}`}>
//                       {request.priority.toUpperCase()}
//                     </span>
//                     <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                       request.status === 'approved' 
//                         ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
//                         : request.status === 'rejected'
//                         ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
//                         : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
//                     }`}>
//                       {request.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-slate-600 dark:text-slate-400 mb-4">{request.description}</p>

//               <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
//                 <span>Client: {request.clientName}</span>
//                 <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Add Client Modal */}
//       {showAddClientModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl border border-white/20 dark:border-slate-700/20">
//             <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Add New Client</h3>
            
//             <form onSubmit={handleAddClient} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
//                   <input
//                     type="text"
//                     value={newClient.name}
//                     onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
//                     className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Person</label>
//                   <input
//                     type="text"
//                     value={newClient.contactPerson}
//                     onChange={(e) => setNewClient({ ...newClient, contactPerson: e.target.value })}
//                     className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
//                   <input
//                     type="email"
//                     value={newClient.email}
//                     onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
//                     className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
//                   <input
//                     type="tel"
//                     value={newClient.phone}
//                     onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
//                     className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
//                     required
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Type</label>
//                   <input
//                     type="text"
//                     value={newClient.projectType}
//                     onChange={(e) => setNewClient({ ...newClient, projectType: e.target.value })}
//                     className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
//                 <textarea
//                   value={newClient.address}
//                   onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
//                   rows={3}
//                   className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all resize-none"
//                   required
//                 />
//               </div>

//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all"
//                 >
//                   Add Client
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowAddClientModal(false)}
//                   className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-xl transition-all"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Create Request Modal */}
//       {showRequestModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 dark:border-slate-700/20">
//             <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Create Action Request</h3>
            
//             <form onSubmit={handleCreateRequest} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Request Title</label>
//                 <input
//                   type="text"
//                   value={newRequest.title}
//                   onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
//                   className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
//                   <select
//                     value={newRequest.priority}
//                     onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
//                     className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//                   >
//                     <option value="low">Low</option>
//                     <option value="medium">Medium</option>
//                     <option value="high">High</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client</label>
//                   <select
//                     value={newRequest.clientName}
//                     onChange={(e) => setNewRequest({ ...newRequest, clientName: e.target.value })}
//                     className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
//                     required
//                   >
//                     <option value="">Select Client</option>
//                     {clients.map(client => (
//                       <option key={client.id} value={client.name}>{client.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
//                 <textarea
//                   value={newRequest.description}
//                   onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
//                   rows={4}
//                   className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all resize-none"
//                   required
//                 />
//               </div>

//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl transition-all"
//                 >
//                   Create Request
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowRequestModal(false)}
//                   className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-xl transition-all"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Supervisor;



import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, Plus, Search, Eye, Edit, Trash2, UserCheck, Calendar, AlertCircle,
  Clock, MessageCircle, Star, FileText, UserPlus, ChevronDown, X, Activity, TrendingUp,
  CheckCircle2, Filter, Download, Grid3X3, List, Settings
} from 'lucide-react';
import Pagination from './Pagination';
import Toast from './Toast';

const Supervisor = () => {
  const [selectedTab, setSelectedTab] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState('table');
  const [toast, setToast] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Modals state
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showEmployeeDirectoryModal, setShowEmployeeDirectoryModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  // Enhanced clients data with more fields
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'TechCorp Solutions',
      contactPerson: 'John Smith',
      email: 'john@techcorp.com',
      phone: '+1-555-0123',
      address: '123 Tech Street, Silicon Valley, CA',
      projectType: 'Web Development',
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      status: 'active',
      assignedEmployees: 5,
      totalProjects: 3,
      budget: '$150,000',
      progress: 75,
      priority: 'high',
      industry: 'Technology',
      timeline: [
        { date: '2024-01-15', event: 'Project Started', type: 'milestone' },
        { date: '2024-02-01', event: 'First Phase Completed', type: 'completion' },
        { date: '2024-03-15', event: 'Client Feedback Received', type: 'feedback' }
      ],
      feedback: [
        { id: 1, rating: 5, comment: 'Excellent work on the frontend', date: '2024-03-15', author: 'John Smith' },
        { id: 2, rating: 4, comment: 'Good progress, need faster delivery', date: '2024-02-28', author: 'John Smith' }
      ],
      employees: [
        { id: 1, name: 'Sarah Johnson', role: 'Lead Developer', attendance: 95, performance: 'excellent' },
        { id: 2, name: 'Mike Chen', role: 'UI Designer', attendance: 88, performance: 'good' },
        { id: 3, name: 'David Wilson', role: 'Backend Developer', attendance: 92, performance: 'excellent' }
      ]
    },
    {
      id: 2,
      name: 'Digital Marketing Pro',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@digitalmp.com',
      phone: '+1-555-0124',
      address: '456 Marketing Ave, New York, NY',
      projectType: 'Digital Marketing',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      status: 'active',
      assignedEmployees: 3,
      totalProjects: 2,
      budget: '$75,000',
      progress: 60,
      priority: 'medium',
      industry: 'Marketing',
      timeline: [
        { date: '2024-02-01', event: 'Campaign Launch', type: 'milestone' },
        { date: '2024-03-01', event: 'First Month Results', type: 'report' }
      ],
      feedback: [
        { id: 1, rating: 4, comment: 'Great campaign ideas', date: '2024-03-01', author: 'Sarah Johnson' }
      ],
      employees: [
        { id: 4, name: 'Emma Thompson', role: 'Marketing Manager', attendance: 96, performance: 'excellent' },
        { id: 5, name: 'Alex Rodriguez', role: 'Content Creator', attendance: 90, performance: 'good' }
      ]
    },
    // Add more sample clients to test pagination
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 3,
      name: `Client Company ${i + 3}`,
      contactPerson: `Contact Person ${i + 3}`,
      email: `contact${i + 3}@company.com`,
      phone: `+1-555-0${125 + i}`,
      address: `${123 + i} Business St, City ${i + 3}`,
      projectType: ['Web Development', 'Mobile App', 'Digital Marketing', 'Consulting'][i % 4],
      startDate: `2024-0${Math.floor(i/3) + 1}-15`,
      endDate: `2024-${6 + Math.floor(i/3)}-15`,
      status: ['active', 'pending', 'completed', 'on-hold'][i % 4],
      assignedEmployees: Math.floor(Math.random() * 5) + 1,
      totalProjects: Math.floor(Math.random() * 3) + 1,
      budget: `$${(Math.floor(Math.random() * 100) + 50) * 1000}`,
      progress: Math.floor(Math.random() * 100),
      priority: ['high', 'medium', 'low'][i % 3],
      industry: ['Technology', 'Healthcare', 'Finance', 'Education'][i % 4],
      timeline: [],
      feedback: [],
      employees: []
    }))
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP001',
      clientName: 'TechCorp Solutions',
      projectName: 'E-commerce Platform',
      role: 'Frontend Developer',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      id: 2,
      employeeName: 'Michael Chen',
      employeeId: 'EMP002',
      clientName: 'Digital Marketing Pro',
      projectName: 'SEO Campaign',
      role: 'SEO Specialist',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ]);

  const [actionRequests, setActionRequests] = useState([
    {
      id: 1,
      title: 'Additional Resources for TechCorp Project',
      description: 'Need 2 more developers for the e-commerce platform project to meet the deadline.',
      priority: 'high',
      status: 'pending',
      requestedBy: 'Current Supervisor',
      requestDate: '2024-12-20',
      clientName: 'TechCorp Solutions'
    },
    {
      id: 2,
      title: 'Budget Approval for Marketing Tools',
      description: 'Requesting approval for premium marketing tools subscription for Digital Marketing Pro project.',
      priority: 'medium',
      status: 'approved',
      requestedBy: 'Current Supervisor',
      requestDate: '2024-12-18',
      clientName: 'Digital Marketing Pro'
    }
  ]);

  const [newClient, setNewClient] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    budget: '',
    priority: 'medium',
    industry: '',
    startDate: '',
    endDate: ''
  });

  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    priority: 'medium',
    clientName: ''
  });

  const [newAssignment, setNewAssignment] = useState({
    employeeName: '',
    clientName: '',
    projectName: '',
    role: '',
    startDate: '',
    endDate: ''
  });

  // Filter and pagination logic
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setActiveDropdown(null);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleAddClient = (e) => {
    e.preventDefault();
    const client = {
      id: Date.now(),
      ...newClient,
      status: 'active',
      assignedEmployees: 0,
      totalProjects: 0,
      progress: 0,
      timeline: [],
      feedback: [],
      employees: []
    };
    setClients([client, ...clients]);
    setNewClient({
      name: '', contactPerson: '', email: '', phone: '', address: '', 
      projectType: '', budget: '', priority: 'medium', industry: '', startDate: '', endDate: ''
    });
    setShowAddClientModal(false);
    showToast('Client added successfully!', 'success');
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    const request = {
      id: Date.now(),
      ...newRequest,
      status: 'pending',
      requestedBy: 'Current Supervisor',
      requestDate: new Date().toISOString().split('T')[0]
    };
    setActionRequests([request, ...actionRequests]);
    setNewRequest({ title: '', description: '', priority: 'medium', clientName: '' });
    setShowRequestModal(false);
    showToast('Request created successfully!', 'success');
  };

  const handleAssignEmployee = (e) => {
    e.preventDefault();
    const assignment = {
      id: Date.now(),
      ...newAssignment,
      status: 'active',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    };
    setAssignments([assignment, ...assignments]);
    setNewAssignment({
      employeeName: '', clientName: '', projectName: '', role: '', startDate: '', endDate: ''
    });
    setShowAssignModal(false);
    showToast('Employee assigned successfully!', 'success');
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter(client => client.id !== clientId));
    setShowDeleteConfirm(null);
    setActiveDropdown(null);
    showToast('Client deleted successfully!', 'success');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'on-hold': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Confirm Delete</h2>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-slate-700 dark:text-slate-300 mb-6">
                Are you sure you want to delete this client? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteClient(showDeleteConfirm)}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Supervisor Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Comprehensive client and project management</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddClientModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </button>
          <button 
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl transition-all"
          >
            <UserPlus className="w-4 h-4" />
            Assign Employee
          </button>
          <button 
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all"
          >
            <AlertCircle className="w-4 h-4" />
            New Request
          </button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{clients.length}</p>
              <p className="text-slate-600 dark:text-slate-400">Total Clients</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-xl">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {clients.filter(c => c.status === 'active').length}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Active Projects</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{assignments.length}</p>
              <p className="text-slate-600 dark:text-slate-400">Assignments</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500 rounded-xl">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {actionRequests.filter(r => r.status === 'pending').length}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Pending Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {Math.round(clients.reduce((acc, c) => acc + c.progress, 0) / clients.length)}%
              </p>
              <p className="text-slate-600 dark:text-slate-400">Avg Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {clients.filter(c => c.status === 'completed').length}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-1">
        {(['clients', 'assignments', 'requests', 'analytics']).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-lg transition-all capitalize flex-1 ${
              selectedTab === tab 
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on selected tab */}
      {selectedTab === 'clients' && (
        <div className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/50 dark:bg-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl transition-all"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
              <button className="flex items-center gap-2 bg-white/50 dark:bg-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl transition-all">
                <Download className="w-4 h-4" />
                Export
              </button>
              <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'table'
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Clients Display */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
            {viewMode === 'table' ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Client Name</th>
                        <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Contact Person</th>
                        <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Project Type</th>
                        <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Budget</th>
                        <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Progress</th>
                        <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Priority</th>
                        <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
                        <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentClients.map((client) => (
                        <tr key={client.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-slate-800 dark:text-white">{client.name}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{client.email}</p>
                            </div>
                          </td>
                          <td className="p-4 text-slate-700 dark:text-slate-300">{client.contactPerson}</td>
                          <td className="p-4 text-slate-700 dark:text-slate-300">{client.projectType}</td>
                          <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{client.budget}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all"
                                  style={{ width: `${client.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-slate-600 dark:text-slate-400">{client.progress}%</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${getPriorityColor(client.priority)}`}>
                              {client.priority}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(client.status)}`}>
                              {client.status.replace('-', ' ')}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="relative">
                              <button
                                onClick={() => setActiveDropdown(activeDropdown === client.id ? null : client.id)}
                                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg transition-all"
                              >
                                Actions <ChevronDown className="w-3 h-3" />
                              </button>
                              {activeDropdown === client.id && (
                                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-20 min-w-[180px]">
                                  <button
                                    onClick={() => {
                                      setSelectedClient(client);
                                      setShowTimelineModal(true);
                                      setActiveDropdown(null);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                                  >
                                    <Clock className="w-4 h-4" />
                                    View Timeline
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedClient(client);
                                      setShowFeedbackModal(true);
                                      setActiveDropdown(null);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                                  >
                                    <MessageCircle className="w-4 h-4" />
                                    View Feedback
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedClient(client);
                                      setShowAttendanceModal(true);
                                      setActiveDropdown(null);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                                  >
                                    <Activity className="w-4 h-4" />
                                    Track Attendance
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedClient(client);
                                      setShowEmployeeDirectoryModal(true);
                                      setActiveDropdown(null);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                                  >
                                    <Users className="w-4 h-4" />
                                    Employee Directory
                                  </button>
                                  <button
                                    onClick={() => {
                                      setActiveDropdown(null);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                                  >
                                    <Edit className="w-4 h-4" />
                                    Edit Client
                                  </button>
                                  <button
                                    onClick={() => {
                                      setShowDeleteConfirm(client.id);
                                      setActiveDropdown(null);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                {currentClients.map((client) => (
                  <div key={client.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{client.name}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{client.projectType}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status.replace('-', ' ')}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Contact:</span>
                        <span className="text-slate-700 dark:text-slate-300">{client.contactPerson}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Budget:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{client.budget}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Progress:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${client.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">{client.progress}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Priority:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(client.priority)}`}>
                          {client.priority}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <button 
                        onClick={() => {
                          setSelectedClient(client);
                          setShowTimelineModal(true);
                        }}
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg text-sm transition-all flex-1 justify-center"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                      <button className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 px-3 py-1 rounded-lg text-sm transition-all flex-1 justify-center">
                        <Settings className="w-4 h-4" />
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedTab === 'assignments' && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Employee Assignments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Employee</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Client</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Project</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Role</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Duration</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={assignment.avatar}
                          alt={assignment.employeeName}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">{assignment.employeeName}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{assignment.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{assignment.clientName}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{assignment.projectName}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{assignment.role}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">
                      {new Date(assignment.startDate).toLocaleDateString()} - {new Date(assignment.endDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-lg text-xs font-medium">
                        {assignment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTab === 'requests' && (
        <div className="space-y-4">
          {actionRequests.map((request) => (
            <div key={request.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{request.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      request.status === 'approved' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : request.status === 'rejected'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-4">{request.description}</p>

              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Client: {request.clientName}</span>
                <span>Requested: {new Date(request.requestDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Project Status Distribution</h3>
            <div className="space-y-3">
              {['active', 'pending', 'completed', 'on-hold'].map(status => {
                const count = clients.filter(c => c.status === status).length;
                const percentage = (count / clients.length * 100).toFixed(1);
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'active' ? 'bg-green-500' :
                        status === 'pending' ? 'bg-yellow-500' :
                        status === 'completed' ? 'bg-blue-500' : 'bg-red-500'
                      }`}></div>
                      <span className="capitalize text-slate-700 dark:text-slate-300">{status.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            status === 'active' ? 'bg-green-500' :
                            status === 'pending' ? 'bg-yellow-500' :
                            status === 'completed' ? 'bg-blue-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 w-12">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Priority Distribution</h3>
            <div className="space-y-3">
              {['high', 'medium', 'low'].map(priority => {
                const count = clients.filter(c => c.priority === priority).length;
                const percentage = (count / clients.length * 100).toFixed(1);
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        priority === 'high' ? 'bg-red-500' :
                        priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className="capitalize text-slate-700 dark:text-slate-300">{priority}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            priority === 'high' ? 'bg-red-500' :
                            priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 w-12">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl border border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Add New Client</h3>
            
            <form onSubmit={handleAddClient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={newClient.contactPerson}
                    onChange={(e) => setNewClient({ ...newClient, contactPerson: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Type</label>
                  <select
                    value={newClient.projectType}
                    onChange={(e) => setNewClient({ ...newClient, projectType: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  >
                    <option value="">Select Project Type</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Budget</label>
                  <input
                    type="text"
                    value={newClient.budget}
                    onChange={(e) => setNewClient({ ...newClient, budget: e.target.value })}
                    placeholder="$50,000"
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={newClient.priority}
                    onChange={(e) => setNewClient({ ...newClient, priority: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                  <select
                    value={newClient.industry}
                    onChange={(e) => setNewClient({ ...newClient, industry: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  >
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newClient.startDate}
                    onChange={(e) => setNewClient({ ...newClient, startDate: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newClient.endDate}
                    onChange={(e) => setNewClient({ ...newClient, endDate: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Address</label>
                <textarea
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all"
                >
                  Add Client
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Employee Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Assign Employee</h3>
            
            <form onSubmit={handleAssignEmployee} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Employee Name</label>
                <input
                  type="text"
                  value={newAssignment.employeeName}
                  onChange={(e) => setNewAssignment({ ...newAssignment, employeeName: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client</label>
                <select
                  value={newAssignment.clientName}
                  onChange={(e) => setNewAssignment({ ...newAssignment, clientName: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="">Select Client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.name}>{client.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  value={newAssignment.projectName}
                  onChange={(e) => setNewAssignment({ ...newAssignment, projectName: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                <input
                  type="text"
                  value={newAssignment.role}
                  onChange={(e) => setNewAssignment({ ...newAssignment, role: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newAssignment.startDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, startDate: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newAssignment.endDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, endDate: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-xl transition-all"
                >
                  Assign Employee
                </button>
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Create Action Request</h3>
            
            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Request Title</label>
                <input
                  type="text"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={newRequest.priority}
                    onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client</label>
                  <select
                    value={newRequest.clientName}
                    onChange={(e) => setNewRequest({ ...newRequest, clientName: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  >
                    <option value="">Select Client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.name}>{client.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl transition-all"
                >
                  Create Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Timeline Modal */}
      {showTimelineModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                Project Timeline - {selectedClient.name}
              </h2>
              <button
                onClick={() => setShowTimelineModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {selectedClient.timeline.length > 0 ? (
                  selectedClient.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${
                        event.type === 'milestone' ? 'bg-blue-100 dark:bg-blue-900/20' :
                        event.type === 'completion' ? 'bg-green-100 dark:bg-green-900/20' :
                        'bg-yellow-100 dark:bg-yellow-900/20'
                      }`}>
                        <Clock className={`w-4 h-4 ${
                          event.type === 'milestone' ? 'text-blue-600 dark:text-blue-400' :
                          event.type === 'completion' ? 'text-green-600 dark:text-green-400' :
                          'text-yellow-600 dark:text-yellow-400'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 dark:text-white">{event.event}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 text-center py-8">
                    No timeline events recorded yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                Client Feedback - {selectedClient.name}
              </h2>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {selectedClient.feedback.length > 0 ? (
                  selectedClient.feedback.map((feedback) => (
                    <div key={feedback.id} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < feedback.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-slate-300 dark:text-slate-600'
                              }`} 
                            />
                          ))}
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {feedback.rating}/5
                          </span>
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(feedback.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-2">{feedback.comment}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">- {feedback.author}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 text-center py-8">
                    No feedback received yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {showAttendanceModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                Attendance Tracking - {selectedClient.name}
              </h2>
              <button
                onClick={() => setShowAttendanceModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-700/50">
                    <tr>
                      <th className="text-left p-3 font-medium text-slate-700 dark:text-slate-300">Employee</th>
                      <th className="text-left p-3 font-medium text-slate-700 dark:text-slate-300">Role</th>
                      <th className="text-left p-3 font-medium text-slate-700 dark:text-slate-300">Attendance %</th>
                      <th className="text-left p-3 font-medium text-slate-700 dark:text-slate-300">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClient.employees.length > 0 ? (
                      selectedClient.employees.map((employee) => (
                        <tr key={employee.id} className="border-t border-slate-200 dark:border-slate-700">
                          <td className="p-3 text-slate-700 dark:text-slate-300">{employee.name}</td>
                          <td className="p-3 text-slate-700 dark:text-slate-300">{employee.role}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    employee.attendance >= 95 ? 'bg-green-500' :
                                    employee.attendance >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${employee.attendance}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {employee.attendance}%
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${
                              employee.performance === 'excellent' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                              employee.performance === 'good' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                              'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                              {employee.performance}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-600 dark:text-slate-400">
                          No employees assigned to this client yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Directory Modal */}
      {showEmployeeDirectoryModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                Employee Directory - {selectedClient.name}
              </h2>
              <button
                onClick={() => setShowEmployeeDirectoryModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              {selectedClient.employees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedClient.employees.map((employee) => (
                    <div key={employee.id} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 dark:text-white">{employee.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{employee.role}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Attendance:</span>
                          <span className="text-slate-700 dark:text-slate-300">{employee.attendance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 dark:text-slate-400">Performance:</span>
                          <span className={`capitalize ${
                            employee.performance === 'excellent' ? 'text-green-600 dark:text-green-400' :
                            employee.performance === 'good' ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {employee.performance}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">
                    No Employees Assigned
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    This client doesn't have any employees assigned yet.
                  </p>
                  <button
                    onClick={() => {
                      setShowEmployeeDirectoryModal(false);
                      setShowAssignModal(true);
                    }}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all mx-auto"
                  >
                    <UserPlus className="w-4 h-4" />
                    Assign Employee
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Supervisor;