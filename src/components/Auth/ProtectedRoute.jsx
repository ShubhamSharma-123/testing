import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';



const ProtectedRoute = ({ children }) => {
  const location = useLocation().pathname.split('/').at(1)
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  

  // if (!isAuthenticated) {    
  //   return <Navigate to={`/${location}/login`} replace />;
  // }
//   if (!isAuthenticated && !window.location.pathname.includes("login")) {
//   return <Navigate to={`/${location}/login`} replace />;
// }


  return <>{children}</>;
};

export default ProtectedRoute;