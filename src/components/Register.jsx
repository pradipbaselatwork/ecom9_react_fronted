import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accept, setAccept] = useState(false);

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage('');
        const payload = {
            name,
            mobile,
            email,
            password,
            accept,
        };
        try {
            const response = await fetch(`${API_URL}/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.status === 201 && data.status === 'true') {
                setMessage(data.message);
                setName('');
                setMobile('');
                setEmail('');
                setPassword('');
                setAccept(false);

                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }else if (response.status === 422 && data.status === 'false' && data.errors) {
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
            <h1>Register Form</h1>
            <p>Registering for this app allows you to access your order status and history.</p>
            {message && ( <div className="alert alert-info">{message}</div> )}

            <form onSubmit={handleSubmit} noValidate>
                {/* Name Field */}
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`}  value={name} onChange={(e) => setName(e.target.value)}/>
                    {errors.name && (<div className="invalid-feedback"> {errors.name.map((errMsg, idx) => ( <div key={idx}>{errMsg}</div> ))}</div> )}
                </div>

                {/* Mobile Field */}
                <div className="form-group mb-3">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" id="mobile" className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                    {errors.mobile && ( <div className="invalid-feedback"> {errors.mobile.map((errMsg, idx) => ( <div key={idx}>{errMsg}</div> ))} </div>)}
                </div>

                {/* Email Field */}
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {errors.email && (<div className="invalid-feedback"> {errors.email.map((errMsg, idx) => ( <div key={idx}>{errMsg}</div> ))} </div>)}
                </div>

                {/* Password Field */}
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && ( <div className="invalid-feedback"> {errors.password.map((errMsg, idx) => ( <div key={idx}>{errMsg}</div>))} </div>)}
                </div>

                {/* Accept Terms Checkbox */}
                <div className="form-group form-check mb-3">
                    <input type="checkbox" id="accept" className={`form-check-input ${errors.accept ? 'is-invalid' : ''}`} checked={accept} onChange={(e) => setAccept(e.target.checked)} />
                    <label htmlFor="accept" className="form-check-label"> I accept the{' '} <a href="/terms" target="_blank" rel="noopener noreferrer"> Terms &amp; Conditions </a> </label>
                    {errors.accept && ( <div className="invalid-feedback d-block"> {errors.accept.map((errMsg, idx) => (<div key={idx}>{errMsg}</div>))} </div>)}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
