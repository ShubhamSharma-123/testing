import React, { createContext, useContext, useState, useEffect } from 'react';

const AttendanceContext = createContext(undefined);

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within AttendanceProvider');
  }
  return context;
};

export const AttendanceProvider = ({ children }) => {
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [currentWorkTime, setCurrentWorkTime] = useState('00:00:00');

  // Get user data from localStorage
  const getUserData = () => {
    const userData = localStorage.getItem('dzire_user');
    console.log('user', userData);
    
    return userData ? JSON.parse(userData) : { name: 'User', role: 'employee' };
  };

  // Calculate work time
  const calculateWorkTime = (checkInTime) => {
    const checkIn = new Date(`${new Date().toDateString()} ${checkInTime}`);
    const now = new Date();
    const diff = now.getTime() - checkIn.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate total work hours between check in and check out
  const calculateTotalWorkHours = (checkIn, checkOut) => {
    const checkInTime = new Date(`${new Date().toDateString()} ${checkIn}`);
    const checkOutTime = new Date(`${new Date().toDateString()} ${checkOut}`);
    const diff = checkOutTime.getTime() - checkInTime.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAttendance = localStorage.getItem('currentAttendance');
    const savedHistory = localStorage.getItem('attendanceHistory');

    if (savedAttendance) {
      const attendance = JSON.parse(savedAttendance);
      setCurrentAttendance(attendance);
      setIsWorking(attendance.isActive);
    }

    if (savedHistory) {
      setAttendanceHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Update current work time every second when working
  useEffect(() => {
    let interval;

    if (isWorking && currentAttendance?.checkIn) {
      interval = setInterval(() => {
        setCurrentWorkTime(calculateWorkTime(currentAttendance.checkIn));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWorking, currentAttendance?.checkIn]);

  const clockIn = () => {
    const userData = getUserData();
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    });

    const newAttendance = {
      id: `${Date.now()}`,
      name: userData.name,
      role: userData.role,
      date: now.toISOString().split('T')[0],
      checkIn: timeString,
      status: 'working',
      workHours: '0h 0m',
      isActive: true,
    };

    setCurrentAttendance(newAttendance);
    setIsWorking(true);
    localStorage.setItem('currentAttendance', JSON.stringify(newAttendance));
  };

  const clockOut = () => {
    if (!currentAttendance) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    });

    const completedAttendance = {
      ...currentAttendance,
      checkOut: timeString,
      status: 'present',
      workHours: calculateTotalWorkHours(currentAttendance.checkIn, timeString),
      isActive: false,
    };

    // Add to history
    const updatedHistory = [...attendanceHistory, completedAttendance];
    setAttendanceHistory(updatedHistory);
    localStorage.setItem('attendanceHistory', JSON.stringify(updatedHistory));

    // Clear current attendance
    setCurrentAttendance(null);
    setIsWorking(false);
    setCurrentWorkTime('00:00:00');
    localStorage.removeItem('currentAttendance');
  };

  return (
    <AttendanceContext.Provider
      value={{
        currentAttendance,
        attendanceHistory,
        clockIn,
        clockOut,
        isWorking,
        currentWorkTime,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};
