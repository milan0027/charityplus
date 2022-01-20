import React from 'react';
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
 
       <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-hand-holding-heart"></i> Charity Plus</Link>
      </h1>
      <ul>
        <li><Link to="/profiles">Organizations</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};
