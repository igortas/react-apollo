import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <ul style={{ listStyleType: 'none' }}>
      <Link to='/'>
        <li>Home</li>
      </Link>
      <Link to='/performers'>
        <li>Performers</li>
      </Link>
      <Link to='categories'>
        <li>Category</li>
      </Link>
    </ul>
  </header>
);

export default Header;
