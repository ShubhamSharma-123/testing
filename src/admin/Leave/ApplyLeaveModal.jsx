



// import React, { useState, useEffect } from 'react';
// import { X, Upload, Calendar, User, FileText, Clock } from 'lucide-react';

// const ApplyLeaveModal = ({ employees, editingLeave, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     employeeId: '',
//     employeeName: '',
//     employeeAvatar: '',
//     type: '',
//     status: 'pending',
//     duration: 'Full Day',
//     startDate: '',
//     endDate: '',
//     reason: '',
//     files: []
//   });
//   const [errors, setErrors] = useState({});

//   const leaveTypes = [
//     { name: 'Casual Leave', remaining: 5 },
//     { name: 'Sick Leave', remaining: 5 },
//     { name: 'Earned Leave', remaining: 5 },
//     { name: 'Unpaid Leave', remaining: 0 },
//     { name: 'Maternity Leave', remaining: 3 },
//     { name: 'Flow Time Out Leave', remaining: 2 },
//   ];

//   // Initialize form data when editing
//   useEffect(() => {
//     if (editingLeave) {
//       setFormData({
//         employeeId: editingLeave.employeeId,
//         employeeName: editingLeave.employeeName,
//         employeeAvatar: editingLeave.avatar,
//         type: editingLeave.type,
//         status: editingLeave.status,
//         duration: editingLeave.duration,
//         startDate: editingLeave.startDate,
//         endDate: editingLeave.endDate,
//         reason: editingLeave.reason,
//         files: editingLeave.files || []
//       });
//     }
//   }, [editingLeave]);

//   const handleEmployeeChange = (employeeId) => {
//     const employee = employees.find(emp => emp.id === parseInt(employeeId));
//     if (employee) {
//       setFormData({
//         ...formData,
//         employeeId: parseInt(employeeId),
//         employeeName: employee.name,
//         employeeAvatar: employee.avatar
//       });
//     }
//   };

//   const handleDurationChange = (duration) => {
//     setFormData({
//       ...formData,
//       duration,
//       endDate: duration === 'Multiple' ? formData.endDate : formData.startDate
//     });
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({
//       ...formData,
//       files: [...formData.files, ...files]
//     });
//   };

//   const removeFile = (index) => {
//     setFormData({
//       ...formData,
//       files: formData.files.filter((_, i) => i !== index)
//     });
//   };

//   const calculateDays = () => {
//     if (!formData.startDate || !formData.endDate) return 0;
    
//     const start = new Date(formData.startDate);
//     const end = new Date(formData.endDate);
//     const diffTime = Math.abs(end - start);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
//     if (formData.duration === 'First Half' || formData.duration === 'Second Half') {
//       return 0.5;
//     }
    
//     return diffDays;
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.employeeId) newErrors.employeeId = 'Please select an employee';
//     if (!formData.type) newErrors.type = 'Please select leave type';
//     if (!formData.startDate) newErrors.startDate = 'Please select start date';
//     if (formData.duration === 'Multiple' && !formData.endDate) {
//       newErrors.endDate = 'Please select end date';
//     }
//     if (!formData.reason.trim()) newErrors.reason = 'Please provide reason for absence';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const leaveData = {
//         ...formData,
//         days: calculateDays(),
//         endDate: formData.duration === 'Multiple' ? formData.endDate : formData.startDate,
//         avatar: formData.employeeAvatar
//       };
//       onSubmit(leaveData);
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
//         <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
//           <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
//             {editingLeave ? 'Edit Leave Request' : 'Apply Leave'}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
//           >
//             <X className="w-5 h-5 text-slate-500" />
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Choose Member */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//               Choose Member *
//             </label>
//             <select
//               value={formData.employeeId}
//               onChange={(e) => handleEmployeeChange(e.target.value)}
//               disabled={editingLeave} // Disable employee selection when editing
//               className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
//                 errors.employeeId ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
//               } ${editingLeave ? 'bg-slate-100 dark:bg-slate-700/50 cursor-not-allowed' : 'bg-white dark:bg-slate-700'} text-slate-900 dark:text-white`}
//             >
//               <option value="">Select Employee</option>
//               {employees.map(employee => (
//                 <option key={employee.id} value={employee.id}>
//                   {employee.name} - {employee.email}
//                 </option>
//               ))}
//             </select>
//             {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
//           </div>

//           {/* Leave Type */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//               Leave Type *
//             </label>
//             <div className="grid grid-cols-1 gap-3">
//               {leaveTypes.map(type => (
//                 <label
//                   key={type.name}
//                   className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
//                     formData.type === type.name
//                       ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
//                       : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="radio"
//                       name="leaveType"
//                       value={type.name}
//                       checked={formData.type === type.name}
//                       onChange={(e) => setFormData({...formData, type: e.target.value})}
//                       className="w-4 h-4 text-blue-600"
//                     />
//                     <span className="text-slate-800 dark:text-white font-medium">{type.name}</span>
//                   </div>
//                   <span className="text-sm text-slate-600 dark:text-slate-400">
//                     {type.remaining} remaining
//                   </span>
//                 </label>
//               ))}
//             </div>
//             {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
//           </div>

//           {/* Select Duration */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//               Select Duration
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               {['Full Day', 'Multiple', 'First Half', 'Second Half'].map(duration => (
//                 <label
//                   key={duration}
//                   className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
//                     formData.duration === duration
//                       ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
//                       : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name="duration"
//                     value={duration}
//                     checked={formData.duration === duration}
//                     onChange={(e) => handleDurationChange(e.target.value)}
//                     className="w-4 h-4 text-blue-600"
//                   />
//                   <span className="text-slate-800 dark:text-white">{duration}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Date Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                 {formData.duration === 'Multiple' ? 'Start Date' : 'Date'} *
//               </label>
//               <input
//                 type="date"
//                 value={formData.startDate}
//                 onChange={(e) => setFormData({...formData, startDate: e.target.value})}
//                 className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
//                   errors.startDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
//                 } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
//               />
//               {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
//             </div>
            
//             {formData.duration === 'Multiple' && (
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                   End Date *
//                 </label>
//                 <input
//                   type="date"
//                   value={formData.endDate}
//                   onChange={(e) => setFormData({...formData, endDate: e.target.value})}
//                   min={formData.startDate}
//                   className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
//                     errors.endDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
//                   } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
//                 />
//                 {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
//               </div>
//             )}
//           </div>

//           {/* Days Calculation */}
//           {formData.startDate && (
//             <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
//               <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
//                 <Clock className="w-4 h-4" />
//                 <span className="font-medium">Total Days: {calculateDays()}</span>
//               </div>
//             </div>
//           )}

//           {/* Reason */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//               Reason for Absence *
//             </label>
//             <textarea
//               value={formData.reason}
//               onChange={(e) => setFormData({...formData, reason: e.target.value})}
//               rows={4}
//               placeholder="Please provide detailed reason for leave..."
//               className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none ${
//                 errors.reason ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
//               } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
//             />
//             {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
//           </div>

//           {/* File Upload */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//               Add File (Optional)
//             </label>
//             <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center">
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 id="file-upload"
//                 accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="cursor-pointer flex flex-col items-center gap-2"
//               >
//                 <Upload className="w-8 h-8 text-slate-400" />
//                 <span className="text-slate-600 dark:text-slate-400">
//                   Click to upload files or drag and drop
//                 </span>
//                 <span className="text-xs text-slate-500">
//                   PDF, DOC, DOCX, JPG, PNG (Max 10MB)
//                 </span>
//               </label>
//             </div>
            
//             {/* Uploaded Files */}
//             {formData.files.length > 0 && (
//               <div className="mt-4 space-y-2">
//                 {formData.files.map((file, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <FileText className="w-4 h-4 text-slate-500" />
//                       <span className="text-sm text-slate-700 dark:text-slate-300">
//                         {typeof file === 'object' ? file.name : file}
//                       </span>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeFile(index)}
//                       className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all"
//             >
//               {editingLeave ? 'Update Request' : 'Submit Request'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ApplyLeaveModal;


import React, { useState, useEffect } from 'react';
import { X, Upload, Calendar, User, FileText, Clock } from 'lucide-react';

const ApplyLeaveModal = ({ employees, editingLeave, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    employeeAvatar: '',
    type: '',
    status: 'pending',
    duration: 'Full Day',
    startDate: '',
    endDate: '',
    reason: '',
    files: []
  });
  const [errors, setErrors] = useState({});

  const leaveTypes = [
    { name: 'Casual Leave', remaining: 5 },
    { name: 'Sick Leave', remaining: 5 },
    { name: 'Earned Leave', remaining: 5 },
    { name: 'Unpaid Leave', remaining: 0 },
    { name: 'Maternity Leave', remaining: 3 },
    { name: 'Flow Time Out Leave', remaining: 2 },
  ];

  // Initialize form data when editing
  useEffect(() => {
    if (editingLeave) {
      setFormData({
        employeeId: editingLeave.employeeId,
        employeeName: editingLeave.employeeName,
        employeeAvatar: editingLeave.avatar,
        type: editingLeave.type,
        status: editingLeave.status,
        duration: editingLeave.duration,
        startDate: editingLeave.startDate,
        endDate: editingLeave.endDate,
        reason: editingLeave.reason,
        files: editingLeave.files || []
      });
    }
  }, [editingLeave]);

  const handleEmployeeChange = (employeeId) => {
    const employee = employees.find(emp => emp.id === parseInt(employeeId));
    if (employee) {
      setFormData({
        ...formData,
        employeeId: parseInt(employeeId),
        employeeName: employee.name,
        employeeAvatar: employee.avatar
      });
    }
  };

  const handleDurationChange = (duration) => {
    setFormData({
      ...formData,
      duration,
      endDate: duration === 'Multiple' ? formData.endDate : formData.startDate
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      files: [...formData.files, ...files]
    });
  };

  const removeFile = (index) => {
    setFormData({
      ...formData,
      files: formData.files.filter((_, i) => i !== index)
    });
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    if (formData.duration === 'First Half' || formData.duration === 'Second Half') {
      return 0.5;
    }
    
    return diffDays;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeId) newErrors.employeeId = 'Please select an employee';
    if (!formData.type) newErrors.type = 'Please select leave type';
    if (!formData.startDate) newErrors.startDate = 'Please select start date';
    if (formData.duration === 'Multiple' && !formData.endDate) {
      newErrors.endDate = 'Please select end date';
    }
    if (!formData.reason.trim()) newErrors.reason = 'Please provide reason for absence';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const leaveData = {
        ...formData,
        days: calculateDays(),
        endDate: formData.duration === 'Multiple' ? formData.endDate : formData.startDate,
        avatar: formData.employeeAvatar
      };
      onSubmit(leaveData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            {editingLeave ? 'Edit Leave Request' : 'Apply Leave'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Choose Member */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Choose Member *
            </label>
            <select
              value={formData.employeeId}
              onChange={(e) => handleEmployeeChange(e.target.value)}
              disabled={editingLeave} // Disable employee selection when editing
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                errors.employeeId ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
              } ${editingLeave ? 'bg-slate-100 dark:bg-slate-700/50 cursor-not-allowed' : 'bg-white dark:bg-slate-700'} text-slate-900 dark:text-white`}
            >
              <option value="">Select Employee</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} - {employee.email}
                </option>
              ))}
            </select>
            {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
          </div>

          {/* Leave Type - Updated to Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Leave Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                errors.type ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
              } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map(type => (
                <option key={type.name} value={type.name}>
                  {type.name} ({type.remaining} remaining)
                </option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
          </div>

          {/* Select Duration */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Select Duration
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Full Day', 'Multiple', 'First Half', 'Second Half'].map(duration => (
                <label
                  key={duration}
                  className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                    formData.duration === duration
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="duration"
                    value={duration}
                    checked={formData.duration === duration}
                    onChange={(e) => handleDurationChange(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-slate-800 dark:text-white">{duration}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {formData.duration === 'Multiple' ? 'Start Date' : 'Date'} *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                  errors.startDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>
            
            {formData.duration === 'Multiple' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  min={formData.startDate}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                    errors.endDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                  } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            )}
          </div>

          {/* Days Calculation */}
          {formData.startDate && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Total Days: {calculateDays()}</span>
              </div>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Reason for Absence *
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              rows={4}
              placeholder="Please provide detailed reason for leave..."
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none ${
                errors.reason ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
              } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
            />
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Add File (Optional)
            </label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-400">
                  Click to upload files or drag and drop
                </span>
                <span className="text-xs text-slate-500">
                  PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </span>
              </label>
            </div>
            
            {/* Uploaded Files */}
            {formData.files.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {typeof file === 'object' ? file.name : file}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all"
            >
              {editingLeave ? 'Update Request' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;