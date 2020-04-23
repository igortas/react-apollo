import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Pure functional component, wrapped inside wrapper component to be reusable
 * This component can benefit if we wrap around React.memo, because does not have dynamic data and state and props changes, so react to stop re-rendering it
 * Can be unit tested for checking the the list of links are generated or that list is empty
 */
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
