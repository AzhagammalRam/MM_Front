import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Layouts from '../components/layouts';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { verifyToken } from '../redux/reducers/AuthSlice';

const ProtectedRoute: React.FC = () => {
  const [loading, setLoading] = useState(true); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await dispatch(verifyToken()).unwrap();
        if (response?.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); 
      }
    };

    verify();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layouts />;
};

export default ProtectedRoute;
