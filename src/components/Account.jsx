// src/components/Account.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (!stored) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      const user = JSON.parse(stored);
      setId(user.id || '');
      setName(user.name || '');
      setEmail(user.email || '');
      setMobile(user.mobile || '');
    } catch (err) {
      console.error('Failed to parse auth_user from localStorage:', err);
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    const payload = {
      name,
      mobile,
    };

    try {
      const response = await fetch(`${API_URL}/user/account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        throw new Error(`Server returned invalid JSON:\n${text}`);
      }

      if (response.status === 200 && data.status === 'true') {
        setMessage(data.message || 'Profile updated successfully.');

        const updatedUser = {id,name,email,mobile};
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      }
      else if (response.status === 422 && data.status === 'false' && data.errors) {
        setErrors(data.errors);
      }
      else {
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage(
        err.message.startsWith('Server returned invalid JSON:')
          ? 'Server error: could not parse response.'
          : 'Failed to connect to the server. Please try again later.'
      );
    }
  };

  return (
    <div className="col-sm-6 offset-sm-3 mt-5">
      <h1>Your Account</h1>
      <p>View or update your profile information below.</p>

      {/* Success or error message at the top */}
      {message && (
        <div className={`alert ${   message.includes('successfully') ? 'alert-success' : 'alert-danger' }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={name} onChange={(e) => setName(e.target.value)}/>
          {errors.name && (
            <div className="invalid-feedback">
              {errors.name.map((errMsg, idx) => (
                <div key={idx}>{errMsg}</div>
              ))}
            </div>
          )}
        </div>

        {/* Email (read-only) */}
        <div className="form-group mb-3">
          <label htmlFor="email">Email (cannot change)</label>
          <input  type="email" id="email" className="form-control"  value={email}  readOnly/>
        </div>

        {/* Mobile */}
        <div className="form-group mb-3">
          <label htmlFor="mobile">Mobile</label>
          <input  type="text" id="mobile" className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} value={mobile}  onChange={(e) => setMobile(e.target.value)}/>
          {errors.mobile && (
            <div className="invalid-feedback">
              {errors.mobile.map((errMsg, idx) => (
                <div key={idx}>{errMsg}</div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Account;
