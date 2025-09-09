import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Download, Eye, Trash2 } from 'lucide-react';

const DocumentUpload = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Resume.pdf',
      type: 'Resume',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'Sarah Johnson'
    },
    {
      id: 2,
      name: 'ID_Proof.jpg',
      type: 'ID Proof',
      size: '1.2 MB',
      uploadDate: '2024-01-10',
      uploadedBy: 'Sarah Johnson'
    },
    {
      id: 3,
      name: 'Education_Certificate.pdf',
      type: 'Education',
      size: '3.1 MB',
      uploadDate: '2024-01-05',
      uploadedBy: 'HR Department'
    }
  ]);

  const [newDocument, setNewDocument] = useState({
    type: '',
    file: null
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef(null);

  const documentTypes = [
    'Resume',
    'ID Proof',
    'Education Certificate',
    'Experience Letter',
    'Salary Slip',
    'PAN Card',
    'Aadhaar Card',
    'Passport',
    'Visa',
    'Other'
  ];


  let currentEmployee = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDocument({
        ...newDocument,
        file: file,
        name: file.name,
        size: formatFileSize(file.size)
      });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = () => {
    if (!newDocument.type || !newDocument.file) {
      alert('Please select document type and file');
      return;
    }

    const document = {
      id: Date.now(),
      name: newDocument.file.name,
      type: newDocument.type,
      size: newDocument.size,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: currentEmployee.name
    };

    setDocuments([document, ...documents]);
    setShowUploadModal(false);
    setNewDocument({
      type: '',
      file: null
    });
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleDownload = (document) => {
    // In a real application, this would download the actual file
    console.log('Downloading document:', document.name);
    alert(`Downloading ${document.name}`);
  };

  const handleView = (document) => {
    // In a real application, this would open the document
    console.log('Viewing document:', document.name);
    alert(`Viewing ${document.name}`);
  };

  return (
    <div className="space-y-6 py-6  max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Document Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Upload and manage your documents</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      {/* Documents List */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">My Documents</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Document Name</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Type</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Size</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Upload Date</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Uploaded By</th>
                <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-slate-800 dark:text-white">{document.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg text-xs font-medium">
                      {document.type}
                    </span>
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{document.size}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{document.uploadDate}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{document.uploadedBy}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(document)}
                        className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(document)}
                        className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-all"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(document.id)}
                        className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {documents.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No documents found</p>
              <p className="text-sm">Click "Upload Document" to add your first document</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Upload Document</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Document Type *
                </label>
                <select
                  value={newDocument.type}
                  onChange={(e) => setNewDocument({...newDocument, type: e.target.value})}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                >
                  <option value="">Select Document Type</option>
                  {documentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Select File *
                </label>
                <div 
                  className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-all"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Click to select file or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                  </p>
                  {newDocument.file && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {newDocument.file.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all"
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;