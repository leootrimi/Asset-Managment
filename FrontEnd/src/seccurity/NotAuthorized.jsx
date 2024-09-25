import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-5 bg-white shadow rounded">
        <div className="mb-4">
          <FaLock size={50} color="#036499" />
        </div>
        <h3 className="display-4">Not Authorized</h3>
        <p className="lead">
          You do not have permission to access this page. Please log in to
          continue.
        </p>
        <button
          className="btn12 mt-4"
          onClick={handleLoginRedirect}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
