import React from 'react';
import { NavLink } from 'react-router-dom';
import '../estilos/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'activeLink' : undefined)}>Home</NavLink> |{' '}
      <NavLink to="/players" className={({ isActive }) => (isActive ? 'activeLink' : undefined)}>Players</NavLink> |{' '}
      <NavLink to="/monsters" className={({ isActive }) => (isActive ? 'activeLink' : undefined)}>Monsters</NavLink>
    </nav>
  );
};

export default Navbar;
