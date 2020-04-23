import React from 'react';

/**
 * Pure functional component, wrapped inside wrapper component to be reusable
 * This component can benefit if we wrap around React.memo, because does not have dynamic data and state and props changes, so react to stop re-rendering it
 * Can be unit tested if we have in future some links to check if there is array od elements or empty array
 */
const Footer = () => (
  <footer>
    <h2>Footer</h2>
  </footer>
);

export default Footer;
