// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';

const App = () => {
  return (
    /* 
      Make this wrapper flex‐column and full‐height.
      flex‐column: Navbar sits at top; the <main> below can expand.
    */
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',       // full viewport height
        width: '100%',            // full width
      }}
    >
      {/* Navbar will take as much height as its content (e.g., ~60px) */}
      <Navbar />

      {/*
        The Routes container is flex:1 so it fills all remaining height
        (100vh minus whatever Navbar is).
      */}
      <main
        style={{
          flex: 1,
          width: '100%',
          overflow: 'auto',       // if page content is taller, it will scroll
          padding: '1rem',        // optional padding
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          {/* add more routes here */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
