import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import Button from './Button';
import '../estilos/Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    console.log('Theme changed to:', theme);
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  const toggleTheme = () => {
    console.log('Toggling theme from:', theme);
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'activeLink' : undefined)}>Home</NavLink> |{' '}
        <NavLink to="/players" className={({ isActive }) => (isActive ? 'activeLink' : undefined)}>Players</NavLink> |{' '}
        <NavLink to="/monsters" className={({ isActive }) => (isActive ? 'activeLink' : undefined)}>Monsters</NavLink>
      </div>
      <Button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </Button>
    </nav>
  );
};

export default Navbar;
