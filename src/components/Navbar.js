
import React from 'react';
import '../styles/Navbar.css'


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbar-brand" href="/">
        <h4>KoinX</h4>
        </a>
        <ul className="nav-links">
          <li className="nav-item">
            <a href="/">Features</a>
          </li>
          <li className="nav-item">
            <a href="/about">Exchanges</a>
          </li>
          <li className="nav-item">
            <a href="/contact">How it Works?</a>
          </li>
          <li className="nav-item">
            <a href="/contact">Blog</a>
          </li>
          <li className="nav-item">
            <a href="/contact">About us</a>
          </li>
          <li className="nav-item">
           <button className='btn'>Sign In</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
