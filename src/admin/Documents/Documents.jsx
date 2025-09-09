// import React from 'react';
// import { FileText, Download, Eye } from 'lucide-react';

// const Documents= () => {
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Document Management</h1>
//         <p className="text-slate-600 dark:text-slate-400">Access and manage HR documents</p>
//       </div>

//       {/* Coming Soon Message */}
//       <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-12 border border-white/20 dark:border-slate-700/20 text-center">
//         <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//           <FileText className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Document Management</h2>
//         <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
//           Centralized document storage and management system for all HR-related documents.
//         </p>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
//           <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
//             <FileText className="w-8 h-8 text-blue-500 mx-auto mb-3" />
//             <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Employee Documents</h3>
//             <p className="text-sm text-slate-600 dark:text-slate-400">Contracts, certificates, and personal docs</p>
//           </div>
//           <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
//             <Download className="w-8 h-8 text-green-500 mx-auto mb-3" />
//             <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Document Templates</h3>
//             <p className="text-sm text-slate-600 dark:text-slate-400">Offer letters, appraisal forms</p>
//           </div>
//           <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
//             <Eye className="w-8 h-8 text-purple-500 mx-auto mb-3" />
//             <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Document Viewer</h3>
//             <p className="text-sm text-slate-600 dark:text-slate-400">Preview and manage access</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Documents;


import React, { useState } from 'react';
import { FileText, Download, Eye, Upload, Plus, Search, Filter, Calendar, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Documents = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Offer Letter',
      category: 'Employment',
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP001',
      uploadedBy: 'HR Manager',
      uploadDate: '2024-01-15',
      fileSize: '245 KB',
      fileType: 'PDF',
      isConfidential: true,
      downloadCount: 3
    },
    {
      id: 2,
      title: 'Appointment Letter',
      category: 'Employment',
      employeeName: 'Michael Chen',
      employeeId: 'EMP002',
      uploadedBy: 'HR Manager',
      uploadDate: '2024-03-20',
      fileSize: '189 KB',
      fileType: 'PDF',
      isConfidential: true,
      downloadCount: 1
    },
    {
      id: 3,
      title: 'Performance Appraisal 2024',
      category: 'Appraisal',
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP003',
      uploadedBy: 'HR Manager',
      uploadDate: '2024-12-15',
      fileSize: '156 KB',
      fileType: 'PDF',
      isConfidential: true,
      downloadCount: 2
    },
    {
      id: 4,
      title: 'Company Policy Handbook',
      category: 'Policy',
      employeeName: 'All Employees',
      employeeId: 'ALL',
      uploadedBy: 'Admin',
      uploadDate: '2024-01-01',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      isConfidential: false,
      downloadCount: 156
    },
    {
      id: 5,
      title: 'Training Certificate - React',
      category: 'Training',
      employeeName: 'David Wilson',
      employeeId: 'EMP004',
      uploadedBy: 'HR Manager',
      uploadDate: '2024-11-30',
      fileSize: '98 KB',
      fileType: 'PDF',
      isConfidential: false,
      downloadCount: 1
    }
  ]);

  const [newDocument, setNewDocument] = useState({
    title: '',
    category: 'Employment',
    employeeName: '',
    isConfidential: false
  });

  const handleUploadDocument = (e) => {
    e.preventDefault();
    const document = {
      id: Date.now(),
      ...newDocument,
      employeeId: `EMP${String(Date.now()).slice(-3)}`,
      uploadedBy: user?.name || 'Current User',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '0 KB',
      fileType: 'PDF',
      downloadCount: 0
    };
    setDocuments([document, ...documents]);
    setNewDocument({ title: '', category: 'Employment', employeeName: '', isConfidential: false });
    setShowUploadModal(false);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    
    // If user is employee, only show their documents or public documents
    if (user?.role === 'employee') {
      return (matchesSearch && matchesCategory) && 
             (doc.employeeName === user.name || doc.employeeName === 'All Employees' || !doc.isConfidential);
    }
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Employment': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Appraisal': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'Policy': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Training': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">HR Documents</h1>
          <p className="text-slate-600 dark:text-slate-400">Secure document storage and management</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'hr') && (
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{documents.length}</p>
              <p className="text-slate-600 dark:text-slate-400">Total Documents</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {documents.filter(d => d.category === 'Employment').length}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Employment</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {documents.filter(d => d.category === 'Appraisal').length}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Appraisals</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500 rounded-xl">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {documents.reduce((sum, d) => sum + d.downloadCount, 0)}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Downloads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="all">All Categories</option>
            <option value="Employment">Employment</option>
            <option value="Appraisal">Appraisal</option>
            <option value="Policy">Policy</option>
            <option value="Training">Training</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">{document.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{document.fileType} • {document.fileSize}</p>
                </div>
              </div>
              {document.isConfidential && (
                <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-xs rounded-lg">
                  Confidential
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Category:</span>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(document.category)}`}>
                  {document.category}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Employee:</span>
                <span className="text-sm text-slate-800 dark:text-white">{document.employeeName}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Uploaded:</span>
                <span className="text-sm text-slate-800 dark:text-white">
                  {new Date(document.uploadDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Downloads:</span>
                <span className="text-sm text-slate-800 dark:text-white">{document.downloadCount}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg text-sm transition-all flex-1 justify-center">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex items-center gap-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 px-3 py-1 rounded-lg text-sm transition-all flex-1 justify-center">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-white/20 dark:border-slate-700/20">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Upload Document</h3>
            
            <form onSubmit={handleUploadDocument} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Document Title</label>
                <input
                  type="text"
                  value={newDocument.title}
                  onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={newDocument.category}
                  onChange={(e) => setNewDocument({ ...newDocument, category: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="Employment">Employment</option>
                  <option value="Appraisal">Appraisal</option>
                  <option value="Policy">Policy</option>
                  <option value="Training">Training</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Employee Name</label>
                <input
                  type="text"
                  value={newDocument.employeeName}
                  onChange={(e) => setNewDocument({ ...newDocument, employeeName: e.target.value })}
                  placeholder="Enter employee name or 'All Employees'"
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="confidential"
                  checked={newDocument.isConfidential}
                  onChange={(e) => setNewDocument({ ...newDocument, isConfidential: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="confidential" className="text-sm text-slate-700 dark:text-slate-300">
                  Mark as confidential
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">File</label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">Upload document (PDF, DOC, DOCX)</p>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                  <button type="button" className="text-blue-600 hover:text-blue-700 text-sm">Browse Files</button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all"
                >
                  Upload Document
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-2 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;