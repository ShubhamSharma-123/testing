



import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Grid3X3, List, ChevronDown, Eye, Edit, Trash2, X, Camera, User } from 'lucide-react';
import Toast from './Toast';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [toast, setToast] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      salutation: 'Ms.',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@dzire.com',
      password: 'password123',
      designation: 'Senior Software Engineer',
      profilePicture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 123-4567',
      gender: 'Female',
      joiningDate: '2022-01-15',
      dateOfBirth: '1990-03-22',
      reportingTo: 'David Kim',
      language: 'English, Spanish',
      userRole: 'supervisor',
      address: '123 Tech Street, San Francisco, CA',
      about: 'Experienced software engineer with expertise in React and Node.js',
      otherDetails: 'Team lead for frontend development',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'React, TypeScript, Node.js, Python',
      probationEndDate: '2022-07-15',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Single',
      status: 'active',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2022-01-15'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      salutation: 'Mr.',
      name: 'Michael Chen',
      email: 'michael.chen@dzire.com',
      password: 'password123',
      designation: 'Product Manager',
      profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 234-5678',
      gender: 'Male',
      joiningDate: '2021-08-10',
      dateOfBirth: '1988-11-15',
      reportingTo: 'Lisa Wang',
      language: 'English, Mandarin',
      userRole: 'Manager',
      address: '456 Business Ave, New York, NY',
      about: 'Strategic product manager with 8+ years experience',
      otherDetails: 'Leads product roadmap and strategy',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Product Strategy, Analytics, Agile',
      probationEndDate: '2022-02-10',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Married',
      status: 'active',
      department: 'Product',
      position: 'Product Manager',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2021-08-10'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      salutation: 'Ms.',
      name: 'Jennifer Lopez',
      email: 'jennifer.lopez@dzire.com',
      password: 'password123',
      designation: 'Financial Analyst',
      profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 345-6789',
      gender: 'Female',
      joiningDate: '2023-03-01',
      dateOfBirth: '1992-07-08',
      reportingTo: 'Robert Smith',
      language: 'English, Spanish',
      userRole: 'accountant',
      address: '789 Finance Blvd, Chicago, IL',
      about: 'Detail-oriented financial analyst specializing in budget planning',
      otherDetails: 'CPA certified professional',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Excel, SQL, Financial Modeling, SAP',
      probationEndDate: '2023-09-01',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Single',
      status: 'active',
      department: 'Finance',
      position: 'Financial Analyst',
      phone: '+1 (555) 345-6789',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2023-03-01'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      salutation: 'Mr.',
      name: 'David Wilson',
      email: 'david.wilson@dzire.com',
      password: 'password123',
      designation: 'UX Designer',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 456-7890',
      gender: 'Male',
      joiningDate: '2022-06-15',
      dateOfBirth: '1991-04-12',
      reportingTo: 'Sarah Johnson',
      language: 'English, French',
      userRole: 'supervisor',
      address: '321 Design Street, Austin, TX',
      about: 'Creative UX designer with passion for user-centered design',
      otherDetails: 'Specializes in mobile app design',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Figma, Sketch, Adobe XD, Prototyping',
      probationEndDate: '2022-12-15',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Single',
      status: 'active',
      department: 'Design',
      position: 'UX Designer',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2022-06-15'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      salutation: 'Ms.',
      name: 'Emma Thompson',
      email: 'emma.thompson@dzire.com',
      password: 'password123',
      designation: 'Marketing Manager',
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 567-8901',
      gender: 'Female',
      joiningDate: '2021-11-20',
      dateOfBirth: '1989-09-25',
      reportingTo: 'Michael Chen',
      language: 'English, German',
      userRole: 'Manager',
      address: '654 Marketing Lane, Seattle, WA',
      about: 'Dynamic marketing professional with digital expertise',
      otherDetails: 'Leads brand and digital marketing initiatives',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Digital Marketing, SEO, Content Strategy',
      probationEndDate: '2022-05-20',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Married',
      status: 'active',
      department: 'Marketing',
      position: 'Marketing Manager',
      phone: '+1 (555) 567-8901',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2021-11-20'
    },
    {
      id: 6,
      employeeId: 'EMP006',
      salutation: 'Mr.',
      name: 'James Rodriguez',
      email: 'james.rodriguez@dzire.com',
      password: 'password123',
      designation: 'DevOps Engineer',
      profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 678-9012',
      gender: 'Male',
      joiningDate: '2023-01-05',
      dateOfBirth: '1993-02-18',
      reportingTo: 'Sarah Johnson',
      language: 'English, Spanish',
      userRole: 'supervisor',
      address: '987 Cloud Ave, Denver, CO',
      about: 'DevOps engineer specializing in cloud infrastructure',
      otherDetails: 'AWS and Kubernetes expert',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'AWS, Docker, Kubernetes, CI/CD',
      probationEndDate: '2023-07-05',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Single',
      status: 'active',
      department: 'Engineering',
      position: 'DevOps Engineer',
      phone: '+1 (555) 678-9012',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2023-01-05'
    },
    {
      id: 7,
      employeeId: 'EMP007',
      salutation: 'Ms.',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@dzire.com',
      password: 'password123',
      designation: 'HR Manager',
      profilePicture: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 789-0123',
      gender: 'Female',
      joiningDate: '2020-04-12',
      dateOfBirth: '1987-12-03',
      reportingTo: 'CEO',
      language: 'English',
      userRole: 'Manager',
      address: '159 HR Plaza, Boston, MA',
      about: 'Experienced HR professional focused on employee development',
      otherDetails: 'SHRM certified HR manager',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Recruitment, Employee Relations, HRIS',
      probationEndDate: '2020-10-12',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Married',
      status: 'active',
      department: 'Human Resources',
      position: 'HR Manager',
      phone: '+1 (555) 789-0123',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2020-04-12'
    },
    {
      id: 8,
      employeeId: 'EMP008',
      salutation: 'Mr.',
      name: 'Robert Taylor',
      email: 'robert.taylor@dzire.com',
      password: 'password123',
      designation: 'Sales Representative',
      profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 890-1234',
      gender: 'Male',
      joiningDate: '2022-09-01',
      dateOfBirth: '1990-06-14',
      reportingTo: 'Emma Thompson',
      language: 'English',
      userRole: 'supervisor',
      address: '753 Sales Drive, Miami, FL',
      about: 'Results-driven sales professional with B2B expertise',
      otherDetails: 'Top performer for 2023',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'CRM, Lead Generation, Negotiation',
      probationEndDate: '2023-03-01',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Single',
      status: 'active',
      department: 'Sales',
      position: 'Sales Representative',
      phone: '+1 (555) 890-1234',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2022-09-01'
    },
    {
      id: 9,
      employeeId: 'EMP009',
      salutation: 'Ms.',
      name: 'Maria Garcia',
      email: 'maria.garcia@dzire.com',
      password: 'password123',
      designation: 'Quality Assurance Engineer',
      profilePicture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 901-2345',
      gender: 'Female',
      joiningDate: '2023-05-15',
      dateOfBirth: '1994-01-28',
      reportingTo: 'Sarah Johnson',
      language: 'English, Spanish',
      userRole: 'supervisor',
      address: '456 Testing Blvd, Phoenix, AZ',
      about: 'Meticulous QA engineer ensuring software quality',
      otherDetails: 'Automation testing specialist',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Selenium, Jest, Manual Testing, API Testing',
      probationEndDate: '2023-11-15',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Single',
      status: 'active',
      department: 'Engineering',
      position: 'QA Engineer',
      phone: '+1 (555) 901-2345',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2023-05-15'
    },
    {
      id: 10,
      employeeId: 'EMP010',
      salutation: 'Mr.',
      name: 'Kevin Brown',
      email: 'kevin.brown@dzire.com',
      password: 'password123',
      designation: 'Data Analyst',
      profilePicture: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 012-3456',
      gender: 'Male',
      joiningDate: '2021-12-08',
      dateOfBirth: '1991-10-30',
      reportingTo: 'Jennifer Lopez',
      language: 'English',
      userRole: 'accountant',
      address: '852 Analytics Way, Portland, OR',
      about: 'Data-driven analyst with expertise in business intelligence',
      otherDetails: 'Tableau and Python specialist',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Python, SQL, Tableau, Power BI',
      probationEndDate: '2022-06-08',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Married',
      status: 'active',
      department: 'Analytics',
      position: 'Data Analyst',
      phone: '+1 (555) 012-3456',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2021-12-08'
    },
    {
      id: 11,
      employeeId: 'EMP011',
      salutation: 'Ms.',
      name: 'Amanda White',
      email: 'amanda.white@dzire.com',
      password: 'password123',
      designation: 'Legal Counsel',
      profilePicture: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 123-4560',
      gender: 'Female',
      joiningDate: '2020-07-22',
      dateOfBirth: '1985-05-17',
      reportingTo: 'CEO',
      language: 'English, French',
      userRole: 'Manager',
      address: '741 Legal Ave, Washington, DC',
      about: 'Corporate lawyer with expertise in tech industry regulations',
      otherDetails: 'Bar certified in multiple states',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Corporate Law, Compliance, Contracts',
      probationEndDate: '2021-01-22',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Married',
      status: 'active',
      department: 'Legal',
      position: 'Legal Counsel',
      phone: '+1 (555) 123-4560',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2020-07-22'
    },
    {
      id: 12,
      employeeId: 'EMP012',
      salutation: 'Mr.',
      name: 'Daniel Miller',
      email: 'daniel.miller@dzire.com',
      password: 'password123',
      designation: 'IT Support Specialist',
      profilePicture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 234-5601',
      gender: 'Male',
      joiningDate: '2023-02-14',
      dateOfBirth: '1992-08-09',
      reportingTo: 'James Rodriguez',
      language: 'English',
      userRole: 'supervisor',
      address: '963 Support Street, Las Vegas, NV',
      about: 'Technical support specialist with hardware and software expertise',
      otherDetails: 'CompTIA A+ certified',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Windows, MacOS, Network Troubleshooting',
      probationEndDate: '2023-08-14',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Single',
      status: 'active',
      department: 'IT',
      position: 'IT Support Specialist',
      phone: '+1 (555) 234-5601',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2023-02-14'
    },
    {
      id: 13,
      employeeId: 'EMP013',
      salutation: 'Ms.',
      name: 'Sophia Davis',
      email: 'sophia.davis@dzire.com',
      password: 'password123',
      designation: 'Content Writer',
      profilePicture: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 345-6012',
      gender: 'Female',
      joiningDate: '2022-11-30',
      dateOfBirth: '1993-12-21',
      reportingTo: 'Emma Thompson',
      language: 'English, Italian',
      userRole: 'supervisor',
      address: '258 Creative Circle, Nashville, TN',
      about: 'Creative content writer with focus on tech and lifestyle',
      otherDetails: 'Published author and blogger',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Content Writing, SEO, Social Media',
      probationEndDate: '2023-05-30',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Single',
      status: 'active',
      department: 'Marketing',
      position: 'Content Writer',
      phone: '+1 (555) 345-6012',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2022-11-30'
    },
    {
      id: 14,
      employeeId: 'EMP014',
      saluation: 'Mr.',
      name: 'Ryan Johnson',
      email: 'ryan.johnson@dzire.com',
      password: 'password123',
      designation: 'Operations Manager',
      profilePicture: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      mobile: '+1 (555) 456-7023',
      gender: 'Male',
      joiningDate: '2021-03-18',
      dateOfBirth: '1988-04-05',
      reportingTo: 'Lisa Anderson',
      language: 'English',
      userRole: 'Manager',
      address: '147 Operations Blvd, Atlanta, GA',
      about: 'Operations manager focused on process optimization',
      otherDetails: 'Six Sigma Black Belt certified',
      loginAllowed: true,
      emailNotifications: true,
      skills: 'Process Improvement, Project Management',
      probationEndDate: '2021-09-18',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Married',
      status: 'active',
      department: 'Operations',
      position: 'Operations Manager',
      phone: '+1 (555) 456-7023',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      joinDate: '2021-03-18'
    }
    // ... [rest of your employee data remains the same] ...
  ]);

  const [formData, setFormData] = useState({
    employeeId: '',
    salutation: 'Mr.',
    name: '',
    email: '',
    password: '',
    designation: '',
    profilePicture: '',
    mobile: '',
    gender: 'Male',
    joiningDate: '',
    dateOfBirth: '',
    reportingTo: '',
    language: '',
    userRole: 'supervisor',
    address: '',
    about: '',
    otherDetails: '',
    loginAllowed: true,
    emailNotifications: true,
    skills: '',
    probationEndDate: '',
    noticePeriodStartDate: '',
    noticePeriodEndDate: '',
    employmentType: 'Full Time',
    maritalStatus: 'Single'
  });

  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profilePicture: 'Image size should be less than 5MB' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setImagePreview(result);
        setFormData({ ...formData, profilePicture: result });
        const newErrors = { ...errors };
        delete newErrors.profilePicture;
        setErrors(newErrors);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url) => {
    setFormData({ ...formData, profilePicture: url });
    setImagePreview(url);
    const newErrors = { ...errors };
    delete newErrors.profilePicture;
    setErrors(newErrors);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || emp.userRole === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setActiveDropdown(null);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.name.trim()) newErrors.name = 'Employee Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining Date is required';
    if (employees.some(emp => emp.email === formData.email && (!showEditModal || emp.id !== selectedEmployee?.id))) {
      newErrors.email = 'Email already exists';
    }
    if (employees.some(emp => emp.employeeId === formData.employeeId && (!showEditModal || emp.id !== selectedEmployee?.id))) {
      newErrors.employeeId = 'Employee ID already exists';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (showEditModal) {
        const updatedEmployees = employees.map(emp =>
          emp.id === selectedEmployee.id ? { ...emp, ...formData, avatar: formData.profilePicture || emp.avatar, status: 'active', department: formData.designation, position: formData.designation, phone: formData.mobile, joinDate: formData.joiningDate } : emp
        );
        setEmployees(updatedEmployees);
        setShowEditModal(false);
        showToast('Employee updated successfully!', 'success');
      } else {
        const newEmployee = {
          id: Date.now(),
          ...formData,
          status: 'active',
          department: formData.designation,
          position: formData.designation,
          phone: formData.mobile,
          avatar: formData.profilePicture || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
          joinDate: formData.joiningDate
        };
        setEmployees([...employees, newEmployee]);
        setShowAddModal(false);
        showToast('Employee added successfully!', 'success');
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      employeeId: '',
      salutation: 'Mr.',
      name: '',
      email: '',
      password: '',
      designation: '',
      profilePicture: '',
      mobile: '',
      gender: 'Male',
      joiningDate: '',
      dateOfBirth: '',
      reportingTo: '',
      language: '',
      userRole: 'supervisor',
      address: '',
      about: '',
      otherDetails: '',
      loginAllowed: true,
      emailNotifications: true,
      skills: '',
      probationEndDate: '',
      noticePeriodStartDate: '',
      noticePeriodEndDate: '',
      employmentType: 'Full Time',
      maritalStatus: 'Single'
    });
    setErrors({});
    setImagePreview('');
  };

  const handleViewProfile = (employee) => {
    navigate(`12`);
    setSelectedEmployee(employee);
    // setShowViewModal(true);
    setActiveDropdown(null);
  };

  const handleEditProfile = (employee) => {
    setSelectedEmployee(employee);
    setFormData({ ...employee });
    setImagePreview(employee.profilePicture || employee.avatar);
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleDelete = (employeeId) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
    setActiveDropdown(null);
    setShowDeleteConfirm(null);
    showToast('Employee deleted successfully!', 'success');
  };

  const getDropdownPosition = () => {
    return 'top-full mt-1';
  };

  return (
    <div className="space-y-6 p-4">
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
                Are you sure you want to delete this employee? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
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
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Employees</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your workforce efficiently</p>
        </div>
        <button 
          onClick={() => {setShowAddModal(true); resetForm();}}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 " />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-white/50 dark:bg-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl transition-all"
          >
            <option value="all">All Roles</option>
            <option value="supervisor">Supervisor</option>
            <option value="accountant">Accountant</option>
            <option value="Manager">Manager</option>
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
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Employee Display */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl pb-8 border border-white/20 dark:border-slate-700/20 ">
        {viewMode === 'list' ? (
          <div className="">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Employee ID</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Name</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Email</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">User Role</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Reporting To</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Status</th>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all">
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{employee.employeeId}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-slate-800 dark:text-white">{employee.name}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{employee.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{employee.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${
                        employee.userRole === 'supervisor' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                        employee.userRole === 'accountant' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                        'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {employee.userRole}
                      </span>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{employee.reportingTo}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        employee.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === employee.id ? null : employee.id)}
                          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg transition-all"
                        >
                          View <ChevronDown className="w-3 h-3" />
                        </button>
                        {activeDropdown === employee.id && (
                          <div className={`absolute right-0 ${getDropdownPosition()} bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 min-w-[140px]`}>
                            <button
                              onClick={() => handleViewProfile(employee)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                            >
                              <Eye className="w-4 h-4" />
                              View Profile
                            </button>
                            <button
                              onClick={() => handleEditProfile(employee)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(employee.id)}
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {currentEmployees.map((employee) => (
              <div key={employee.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-white">{employee.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{employee.designation}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">ID: {employee.employeeId}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-medium">Email:</span> {employee.email}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-medium">Role:</span>
                    <span className={`ml-2 px-2 py-1 rounded-lg text-xs font-medium capitalize ${
                      employee.userRole === 'supervisor' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                      employee.userRole === 'accountant' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                      'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {employee.userRole}
                    </span>
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-lg text-xs font-medium ${
                      employee.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {employee.status}
                    </span>
                  </p>
                </div>
                <div className="relative mt-4">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === employee.id ? null : employee.id)}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg transition-all"
                  >
                    Actions <ChevronDown className="w-3 h-3" />
                  </button>
                  {activeDropdown === employee.id && (
                    <div className={`absolute right-45 ${getDropdownPosition()} bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 min-w-[140px]`}>
                      <button
                        onClick={() => handleViewProfile(employee)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View Profile
                      </button>
                      <button
                        onClick={() => handleEditProfile(employee)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(employee.id)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed -inset-6 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Add Employee</h2>
              <button
                onClick={() => {setShowAddModal(false); resetForm();}}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.employeeId ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Salutation
                  </label>
                  <select
                    value={formData.salutation}
                    onChange={(e) => setFormData({...formData, salutation: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Sir">Sir</option>
                    <option value="Madam">Madam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Employee Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Employee Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.password ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                    placeholder="Must have at least 8 characters"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Profile Picture
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        {imagePreview || formData.profilePicture ? (
                          <img
                            src={imagePreview || formData.profilePicture}
                            alt="Profile preview"
                            className="w-24 h-24 rounded-full object-cover border-4 border-slate-200 dark:border-slate-600"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 border-4 border-slate-200 dark:border-slate-600 flex items-center justify-center">
                            <User className="w-8 h-8 text-slate-400" />
                          </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                          <Camera className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Or enter image URL
                      </label>
                      <input
                        type="url"
                        value={formData.profilePicture}
                        onChange={(e) => handleImageUrlChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                          errors.profilePicture ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                      />
                      {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.designation ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Joining Date *
                  </label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.joiningDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Reporting To
                  </label>
                  <select
                    value={formData.reportingTo}
                    onChange={(e) => setFormData({...formData, reportingTo: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="">Select Manager</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    User Role
                  </label>
                  <select
                    value={formData.userRole}
                    onChange={(e) => setFormData({...formData, userRole: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="supervisor">Supervisor</option>
                    <option value="accountant">Accountant</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Employment Type
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="On Contract">On Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Trainee">Trainee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Marital Status
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widower">Widower</option>
                    <option value="Widow">Widow</option>
                    <option value="Separate">Separate</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Engaged">Engaged</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    placeholder="e.g., React, TypeScript, Node.js"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.loginAllowed}
                        onChange={(e) => setFormData({...formData, loginAllowed: e.target.checked})}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Login Allowed?</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.emailNotifications}
                        onChange={(e) => setFormData({...formData, emailNotifications: e.target.checked})}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Receive email notifications?</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {setShowAddModal(false); resetForm();}}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditModal && selectedEmployee && (
        <div className="fixed -inset-6 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Edit Employee</h2>
              <button
                onClick={() => {setShowEditModal(false); resetForm();}}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.employeeId ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Salutation
                  </label>
                  <select
                    value={formData.salutation}
                    onChange={(e) => setFormData({...formData, salutation: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Sir">Sir</option>
                    <option value="Madam">Madam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Employee Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Employee Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.password ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                    placeholder="Must have at least 8 characters"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Profile Picture
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        {imagePreview || formData.profilePicture ? (
                          <img
                            src={imagePreview || formData.profilePicture}
                            alt="Profile preview"
                            className="w-24 h-24 rounded-full object-cover border-4 border-slate-200 dark:border-slate-600"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 border-4 border-slate-200 dark:border-slate-600 flex items-center justify-center">
                            <User className="w-8 h-8 text-slate-400" />
                          </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer">
                          <Camera className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Or enter image URL
                      </label>
                      <input
                        type="url"
                        value={formData.profilePicture}
                        onChange={(e) => handleImageUrlChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                          errors.profilePicture ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                        } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                      />
                      {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.designation ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Joining Date *
                  </label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${
                      errors.joiningDate ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                  />
                  {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Reporting To
                  </label>
                  <select
                    value={formData.reportingTo}
                    onChange={(e) => setFormData({...formData, reportingTo: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="">Select Manager</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    User Role
                  </label>
                  <select
                    value={formData.userRole}
                    onChange={(e) => setFormData({...formData, userRole: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="supervisor">Supervisor</option>
                    <option value="accountant">Accountant</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Employment Type
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="On Contract">On Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Trainee">Trainee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Marital Status
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widower">Widower</option>
                    <option value="Widow">Widow</option>
                    <option value="Separate">Separate</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Engaged">Engaged</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    placeholder="e.g., React, TypeScript, Node.js"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.loginAllowed}
                        onChange={(e) => setFormData({...formData, loginAllowed: e.target.checked})}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Login Allowed?</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.emailNotifications}
                        onChange={(e) => setFormData({...formData, emailNotifications: e.target.checked})}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">Receive email notifications?</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {setShowEditModal(false); resetForm();}}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {showViewModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Employee Profile</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-6 mb-8">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {selectedEmployee.salutation} {selectedEmployee.name}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400">{selectedEmployee.designation}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">ID: {selectedEmployee.employeeId}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Personal Information</h4>
                    <div className="space-y-2">
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Email:</span> {selectedEmployee.email}</p>
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Mobile:</span> {selectedEmployee.mobile}</p>
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Gender:</span> {selectedEmployee.gender}</p>
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Date of Birth:</span> {selectedEmployee.dateOfBirth}</p>
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Marital Status:</span> {selectedEmployee.maritalStatus}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Employment Details</h4>
                    <div className="space-y-2">
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Joining Date:</span> {selectedEmployee.joiningDate}</p>
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Employment Type:</span> {selectedEmployee.employmentType}</p>
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">User Role:</span> {selectedEmployee.userRole}</p>
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Reporting To:</span> {selectedEmployee.reportingTo}</p>
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Department:</span> {selectedEmployee.department}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Contact & Location</h4>
                    <div className="space-y-2">
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Address:</span> {selectedEmployee.address}</p>
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Language:</span> {selectedEmployee.language}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Skills & Preferences</h4>
                    <div className="space-y-2">
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Skills:</span> {selectedEmployee.skills}</p>
                      <p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Login Allowed:</span> {selectedEmployee.loginAllowed ? 'Yes' : 'No'}</p>
                      < p className="text-slate-600 dark:text-slate-400"><span className="font-medium text-slate-800 dark:text-white">Email Notifications:</span> {selectedEmployee.emailNotifications ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3">About</h4>
                    <p className="text-slate-600 dark:text-slate-400">{selectedEmployee.about}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;






