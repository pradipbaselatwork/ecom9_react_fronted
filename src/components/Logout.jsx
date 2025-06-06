// src/components/Logout.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.removeItem('auth_user');
    setMessage('Logout successful.');
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="col-sm-6 offset-sm-3 mt-5">
      <h1>{message || 'Logging out...'}</h1>
    </div>
  );
};

export default Logout;
