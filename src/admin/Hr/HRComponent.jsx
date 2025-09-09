import React, { useState } from 'react';
import { FaUser, FaBell, FaFileAlt, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';

const HRComponent = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState('');
  const [employees, setEmployees] = useState([
    { id: 'EMP001', name: 'John Doe', email: 'john.doe@company.com', contact: '1234567890' },
    { id: 'EMP002', name: 'Jane Smith', email: 'jane.smith@company.com', contact: '0987654321' },
  ]);
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employee: 'John Doe', type: 'Sick Leave', from: '2025-08-01', to: '2025-08-03', status: 'Pending' },
    { id: 2, employee: 'Jane Smith', type: 'Casual Leave', from: '2025-08-05', to: '2025-08-06', status: 'Pending' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Offer Letter - John Doe', type: 'Offer Letter' },
    { id: 2, title: 'Leave Policy', type: 'Policy' },
  ]);

  const handleAddNotice = () => {
    if (newNotice.trim()) {
      setNotices([...notices, { id: notices.length + 1, text: newNotice, date: new Date().toLocaleDateString() }]);
      setNewNotice('');
    }
  };

  const handleApproveLeave = (id) => {
    setLeaveRequests(leaveRequests.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
  };

  const handleRejectLeave = (id) => {
    setLeaveRequests(leaveRequests.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ));
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="container mx-auto p-6">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold">HR Dashboard</h1>
          <p className="text-sm">Manage employees, leaves, notices, and documents</p>
        </header>

        {/* Notice Board */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaBell className="mr-2" /> Notice Board
          </h2>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Write a new notice..."
              value={newNotice}
              onChange={(e) => setNewNotice(e.target.value)}
            />
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={handleAddNotice}
            >
              Post Notice
            </button>
          </div>
          <div className="space-y-2">
            {notices.map(notice => (
              <div key={notice.id} className="p-3 bg-gray-50 border rounded-md">
                <p>{notice.text}</p>
                <p className="text-sm text-gray-500">Posted on: {notice.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leave Requests */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaCheck className="mr-2" /> Leave Requests
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 border">Employee</th>
                <th className="p-2 border">Leave Type</th>
                <th className="p-2 border">From</th>
                <th className="p-2 border">To</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(req => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{req.employee}</td>
                  <td className="p-2 border">{req.type}</td>
                  <td className="p-2 border">{req.from}</td>
                  <td className="p-2 border">{req.to}</td>
                  <td className="p-2 border">{req.status}</td>
                  <td className="p-2 border">
                    {req.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                          onClick={() => handleApproveLeave(req.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          onClick={() => handleRejectLeave(req.id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Employee Search */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2" /> Employee Search
          </h2>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-4"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="space-y-2">
            {filteredEmployees.map(emp => (
              <div key={emp.id} className="p-3 bg-gray-50 border rounded-md">
                <p><strong>Name:</strong> {emp.name}</p>
                <p><strong>Email:</strong> {emp.email}</p>
                <p><strong>Contact:</strong> {emp.contact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HR Documents */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaFileAlt className="mr-2" /> HR Documents
          </h2>
          <div className="space-y-2">
            {documents.map(doc => (
              <div key={doc.id} className="p-3 bg-gray-50 border rounded-md">
                <p><strong>Title:</strong> {doc.title}</p>
                <p><strong>Type:</strong> {doc.type}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HRComponent;