import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    
    <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Charity Plus</h1>
        <p className="lead">
          Work in events, post your activities, spread kindness and love <i className="fas fa-heart"></i>
          
        </p>
        <div className="buttons">
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
          <Link to="/login" className="btn btn-light">Login</Link>
        </div>
      </div>
    </div>
  </section>
 
  );
};
