// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const linkBase = {
    marginRight: '1rem',
    textDecoration: 'none',
    color: '#333',
  };

  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
  };


const storedUserJson = localStorage.getItem('auth_user');
const user = storedUserJson ? JSON.parse(storedUserJson) : null;
const isLoggedIn = Boolean(user);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm(`Are you sure you want to logout ${user.name}?`);
    if (confirmed) {
      navigate('/logout');
    }

  };

  return (
    <nav
      style={{
        width: '100%',
        padding: '1rem',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ccc',
        boxSizing: 'border-box',
      }}
    >
      <Link to="/" style={{   ...linkBase,   ...(location.pathname === '/' ? activeStyle : {}), }}>Home</Link>
      <Link to="/about" style={{   ...linkBase,   ...(location.pathname === '/about' ? activeStyle : {}), }}>About Us</Link>
      <Link to="/contact" style={{   ...linkBase,   ...(location.pathname === '/contact' ? activeStyle : {}), }}>Contact</Link>

      {isLoggedIn ? (
        <>
          <Link to="/account" style={{   ...linkBase,   ...(location.pathname === '/account' ? activeStyle : {}), }} > Account</Link>
          <span onClick={handleLogoutClick} style={{ ...linkBase, ...(location.pathname === '/logout' ? activeStyle : {}),cursor: 'pointer', }}>Logout
          </span>
        </>
      ) : (
        <><Link to="/register" style={{...linkBase,...(location.pathname === '/register' ? activeStyle : {}),}}>Register</Link>
          <Link to="/login" style={{...linkBase,...(location.pathname === '/login' ? activeStyle : {}), }}>Login</Link>
        </>
      )}

      <Link to="/cart" style={{   ...linkBase,   ...(location.pathname === '/cart' ? activeStyle : {}), }}>Cart</Link>

    </nav>
  );
};

export default Navbar;
