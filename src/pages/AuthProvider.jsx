// AuthProvider.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import authService from '../Services/auth.service';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!authService.isTokenExpired());
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const tokenExpired = authService.isTokenExpired();

      if (tokenExpired) {
        authService.logout();
        setIsAuthenticated(false);
        notification.warning({
          message: 'Session Expired',
          description: 'Your session has expired. Please log in again.',
          placement: 'topRight',
          duration: 3,
        });
        navigate('/'); // Redirect to login
      } else {
        setIsAuthenticated(true);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
