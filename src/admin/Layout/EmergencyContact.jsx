import React, { useState } from 'react';
import { Phone, Mail, MapPin, Edit, Save, X, Plus, User, Trash2 } from 'lucide-react';

const EmergencyContact = ({ currentEmployee }) => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Johnson',
      relationship: 'Father',
      phone: '+91 9876543210',
      email: 'john.johnson@example.com',
      address: '123 Main St, Mumbai, Maharashtra',
      priority: 'Primary'
    },
    {
      id: 2,
      name: 'Maria Johnson',
      relationship: 'Mother',
      phone: '+91 9876543211',
      email: 'maria.johnson@example.com',
      address: '123 Main St, Mumbai, Maharashtra',
      priority: 'Secondary'
    }
  ]);

  const [editingContact, setEditingContact] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    priority: 'Secondary'
  });

  const relationships = [
    'Father',
    'Mother',
    'Spouse',
    'Sibling',
    'Child',
    'Friend',
    'Relative',
    'Other'
  ];

  const handleEdit = (contact) => {
    setEditingContact({ ...contact });
  };

  const handleSave = () => {
    if (editingContact) {
      setContacts(prev => 
        prev.map(contact => contact.id === editingContact.id ? editingContact : contact)
      );
      setEditingContact(null);
    }
  };

  const handleCancel = () => {
    setEditingContact(null);
    setIsAdding(false);
    setNewContact({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      priority: 'Secondary'
    });
  };

  const handleAdd = () => {
    if (!newContact.name || !newContact.relationship || !newContact.phone) {
      alert('Please fill all required fields');
      return;
    }

    const contact = {
      id: Date.now(),
      ...newContact
    };

    // If setting as primary, demote existing primary
    if (newContact.priority === 'Primary') {
      setContacts(prev => 
        prev.map(c => ({ ...c, priority: 'Secondary' }))
      );
    }

    setContacts([contact, ...contacts]);
    setIsAdding(false);
    setNewContact({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      priority: 'Secondary'
    });
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleInputChange = (e, field) => {
    if (editingContact) {
      setEditingContact({
        ...editingContact,
        [field]: e.target.value
      });
    }
  };

  const handleNewInputChange = (e, field) => {
    setNewContact({
      ...newContact,
      [field]: e.target.value
    });
  };

  const setAsPrimary = (id) => {
    setContacts(prev => 
      prev.map(contact => ({
        ...contact,
        priority: contact.id === id ? 'Primary' : 'Secondary'
      }))
    );
  };

  return (
    <div className="space-y-6 py-6  max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Emergency Contacts</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your emergency contact information</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Contact
        </button>
      </div>

      {/* Add New Contact Form */}
      {isAdding && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Add Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => handleNewInputChange(e, 'name')}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Relationship *
              </label>
              <select
                value={newContact.relationship}
                onChange={(e) => handleNewInputChange(e, 'relationship')}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              >
                <option value="">Select Relationship</option>
                {relationships.map(rel => (
                  <option key={rel} value={rel}>{rel}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={newContact.phone}
                onChange={(e) => handleNewInputChange(e, 'phone')}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={newContact.email}
                onChange={(e) => handleNewInputChange(e, 'email')}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Enter email address"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Address
              </label>
              <textarea
                value={newContact.address}
                onChange={(e) => handleNewInputChange(e, 'address')}
                rows={3}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="Enter complete address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Priority
              </label>
              <select
                value={newContact.priority}
                onChange={(e) => handleNewInputChange(e, 'priority')}
                className="w-full px-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Contact
            </button>
          </div>
        </div>
      )}

      {/* Emergency Contacts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">{contact.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${
                    contact.priority === 'Primary' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  }`}>
                    {contact.priority}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {editingContact?.id === contact.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-all"
                      title="Save"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(contact)}
                      className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="font-medium">Relationship:</span>
                {editingContact?.id === contact.id ? (
                  <select
                    value={editingContact.relationship}
                    onChange={(e) => handleInputChange(e, 'relationship')}
                    className="px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                  >
                    {relationships.map(rel => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                ) : (
                  <span>{contact.relationship}</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4" />
                {editingContact?.id === contact.id ? (
                  <input
                    type="tel"
                    value={editingContact.phone}
                    onChange={(e) => handleInputChange(e, 'phone')}
                    className="flex-1 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                  />
                ) : (
                  <span>{contact.phone}</span>
                )}
              </div>

              {contact.email && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Mail className="w-4 h-4" />
                  {editingContact?.id === contact.id ? (
                    <input
                      type="email"
                      value={editingContact.email}
                      onChange={(e) => handleInputChange(e, 'email')}
                      className="flex-1 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                    />
                  ) : (
                    <span>{contact.email}</span>
                  )}
                </div>
              )}

              {contact.address && (
                <div className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4 mt-1" />
                  {editingContact?.id === contact.id ? (
                    <textarea
                      value={editingContact.address}
                      onChange={(e) => handleInputChange(e, 'address')}
                      rows={2}
                      className="flex-1 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
                    />
                  ) : (
                    <span className="flex-1">{contact.address}</span>
                  )}
                </div>
              )}
            </div>

            {contact.priority !== 'Primary' && (
              <button
                onClick={() => setAsPrimary(contact.id)}
                className="w-full mt-4 px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl transition-all"
              >
                Set as Primary Contact
              </button>
            )}
          </div>
        ))}
      </div>

      {contacts.length === 0 && !isAdding && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No emergency contacts found</p>
          <p className="text-sm">Click "Add Contact" to add your first emergency contact</p>
        </div>
      )}
    </div>
  );
};

export default EmergencyContact;