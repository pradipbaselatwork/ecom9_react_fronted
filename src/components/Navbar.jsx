import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkBase = {
    marginRight: '1rem',
    textDecoration: 'none',
    color: '#333',
  };

  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
  };

  return (
    <nav
      style={{
        width: '100%',             // full width
        padding: '1rem',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ccc',
        boxSizing: 'border-box',   // ensure padding doesn’t push it over 100%
      }}
    >
      <Link
        to="/"
        style={{
          ...linkBase,
          ...(location.pathname === '/' ? activeStyle : {}),
        }}
      >
        Home
      </Link>
      <Link
        to="/contact"
        style={{
          ...linkBase,
          ...(location.pathname === '/contact' ? activeStyle : {}),
        }}
      >
        Contact
      </Link>
    </nav>
  );
};

export default Navbar;