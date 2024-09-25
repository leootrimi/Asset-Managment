import React, { useEffect, useState } from 'react';
import NotAuthorized from './NotAuthorized';
import Loading from '../components/loading/Loading';

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const verifyToken = async () => {
      if (token) {
        try {
          const response = await fetch('http://localhost:8000/auth/test_token/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } catch (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000); 
        }
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setIsAuthenticated(false);
        }, 1000); 
      }
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? children : <NotAuthorized />;
};

export default PrivateRoute;
