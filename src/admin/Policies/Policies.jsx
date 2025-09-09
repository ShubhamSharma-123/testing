import React, { useState } from 'react';
import { Shield, Plus, Search, Eye, Edit, Trash2, Calendar, User, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Policies = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [policies, setPolicies] = useState([
    {
      id: 1,
      title: 'Leave Policy',
      category: 'HR',
      description: 'Guidelines for leave application, approval process, and leave types available to employees.',
      content: 'Employees are entitled to 21 days of annual leave, 12 days of sick leave, and 5 days of casual leave per year. All leave requests must be submitted at least 7 days in advance except for emergency situations.',
      createdBy: 'HR Manager',
      createdDate: '2024-01-15',
      lastUpdated: '2024-11-20',
      status: 'active',
      applicableTo: 'All Employees',
      version: '2.1'
    },
    {
      id: 2,
      title: 'Code of Conduct',
      category: 'General',
      description: 'Professional behavior expectations and ethical guidelines for all employees.',
      content: 'All employees must maintain professional conduct, respect colleagues, follow company values, and adhere to confidentiality agreements. Harassment of any kind will not be tolerated.',
      createdBy: 'Admin',
      createdDate: '2024-01-01',
      lastUpdated: '2024-06-15',
      status: 'active',
      applicableTo: 'All Employees',
      version: '1.3'
    },
    {
      id: 3,
      title: 'Remote Work Policy',
      category: 'IT',
      description: 'Guidelines for remote work arrangements, equipment usage, and productivity expectations.',
      content: 'Employees may work remotely up to 3 days per week with manager approval. All remote workers must maintain secure internet connections and follow IT security protocols.',
      createdBy: 'IT Manager',
      createdDate: '2024-03-01',
      lastUpdated: '2024-09-10',
      status: 'active',
      applicableTo: 'IT Department',
      version: '1.2'
    },
    {
      id: 4,
      title: 'Expense Reimbursement Policy',
      category: 'Finance',
      description: 'Process for submitting and approving employee expense reimbursements.',
      content: 'All business expenses must be pre-approved and submitted with valid receipts within 30 days. Reimbursements will be processed within 15 business days of approval.',
      createdBy: 'Finance Manager',
      createdDate: '2024-02-01',
      lastUpdated: '2024-08-05',
      status: 'active',
      applicableTo: 'All Employees',
      version: '1.1'
    },
    {
      id: 5,
      title: 'Performance Review Policy',
      category: 'HR',
      description: 'Annual performance evaluation process and criteria for employee assessments.',
      content: 'Performance reviews are conducted annually with quarterly check-ins. Evaluations are based on goal achievement, competencies, and 360-degree feedback.',
      createdBy: 'HR Manager',
      createdDate: '2024-01-10',
      lastUpdated: '2024-10-15',
      status: 'active',
      applicableTo: 'All Employees',
      version: '2.0'
    }
  ]);

  const [newPolicy, setNewPolicy] = useState({
    title: '',
    category: 'General',
    description: '',
    content: '',
    applicableTo: 'All Employees'
  });

  const handleCreatePolicy = (e) => {
    e.preventDefault();
    const policy = {
      id: Date.now(),
      ...newPolicy,
      createdBy: user?.name || 'Current User',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'active',
      version: '1.0'
    };
    setPolicies([policy, ...policies]);
    setNewPolicy({ title: '', category: 'General', description: '', content: '', applicableTo: 'All Employees' });
    setShowCreateModal(false);
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || policy.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'HR': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'IT': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Finance': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'General': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Company Policies</h1>
          <p className="text-slate-600 dark:text-slate-400">Company policies and guidelines for employees</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'hr') && (
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Policy
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{policies.length}</p>
              <p className="text-slate-600 dark:text-slate-400">Total Policies</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {policies.filter(p => p.status === 'active').length}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {policies.filter(p => p.category === 'HR').length}
              </p>
              <p className="text-slate-600 dark:text-slate-400">HR Policies</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {new Date().getFullYear()}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Current Year</p>
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
              placeholder="Search policies..."
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
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="General">General</option>
          </select>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPolicies.map((policy) => (
          <div key={policy.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{policy.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(policy.category)}`}>
                    {policy.category}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs rounded-lg">
                    v{policy.version}
                  </span>
                </div>
              </div>
              {(user?.role === 'admin' || user?.role === 'hr') && (
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 rounded-lg transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
              {policy.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Applicable to:</span>
                <span className="text-slate-700 dark:text-slate-300">{policy.applicableTo}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Created by:</span>
                <span className="text-slate-700 dark:text-slate-300">{policy.createdBy}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Last updated:</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {new Date(policy.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg text-sm transition-all flex-1 justify-center">
                <Eye className="w-4 h-4" />
                View Full Policy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Policy Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl border border-white/20 dark:border-slate-700/20 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Create New Policy</h3>
            
            <form onSubmit={handleCreatePolicy} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Policy Title</label>
                <input
                  type="text"
                  value={newPolicy.title}
                  onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newPolicy.category}
                    onChange={(e) => setNewPolicy({ ...newPolicy, category: e.target.value })}
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="General">General</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Applicable To</label>
                  <input
                    type="text"
                    value={newPolicy.applicableTo}
                    onChange={(e) => setNewPolicy({ ...newPolicy, applicableTo: e.target.value })}
                    placeholder="e.g., All Employees, IT Department"
                    className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  value={newPolicy.description}
                  onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Policy Content</label>
                <textarea
                  value={newPolicy.content}
                  onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition-all"
                >
                  Create Policy
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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

export default Policies;