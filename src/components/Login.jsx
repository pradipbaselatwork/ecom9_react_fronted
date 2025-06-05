import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});
        setMessage('');
        const payload = { email, password };
        try {
            const response = await fetch(`${API_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.status === 200 && data.status === 'true') {
                // localStorage.setItem('auth_token', data.token);
                localStorage.setItem('auth_user', JSON.stringify(data.user));
                navigate('/');
            }
            else if (response.status === 422 && data.status === 'false' && data.errors) {
                setErrors(data.errors);
            }else {
                setMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setMessage('Failed to connect to the server. Please try again later.');
        }
    };

    return (
        <div className="col-sm-6 offset-sm-3 mt-5">
            <h1>Login</h1>
            <p>Enter your email and password to log in.</p>

            {message && (
                <div className="alert alert-danger">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                {/* Email Field */}
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {errors.email && (<div className="invalid-feedback"> {errors.email.map((errMsg, idx) => ( <div key={idx}>{errMsg}</div> ))}</div>)}
                </div>

                {/* Password Field */}
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {errors.password && (<div className="invalid-feedback"> {errors.password.map((errMsg, idx) => ( <div key={idx}>{errMsg}</div> ))}</div> )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
