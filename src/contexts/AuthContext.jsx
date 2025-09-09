import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

// Mock users for demonstration
const mockUsers = {
  "admin@dzire.com": {
    id: "1",
    name: "Sarah Johnson",
    email: "admin@dzire.com",
    role: "admin",
    department: "Administration",
    employeeId: "EMP001",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  "hr@dzire.com": {
    id: "2",
    name: "Michael Chen",
    email: "hr@dzire.com",
    role: "hr",
    department: "Human Resources",
    employeeId: "EMP002",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  "accountant@dzire.com": {
    id: "3",
    name: "Emily Rodriguez",
    email: "accountant@dzire.com",
    role: "accountant",
    department: "Finance",
    employeeId: "EMP003",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  "supervisor@dzire.com": {
    id: "4",
    name: "David Kim",
    email: "supervisor@dzire.com",
    role: "supervisor",
    department: "Operations",
    employeeId: "EMP004",
    avatar:
      "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // const storedUser = localStorage.getItem('dzire_user');
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    //   setIsAuthenticated(true);
    // }
    try {
      const storedUser = localStorage.getItem("dzire_user");
      console.log("Stored User:", storedUser);
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Failed to parse stored user:", e);
      localStorage.removeItem("dzire_user");
    }
  }, []);

  const login = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers[email];
    if (user && password === "password") {
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("dzire_user", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("dzire_user");
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
