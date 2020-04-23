import React from 'react';

import Header from './header.component';
import Footer from './footer.component';

/**
 * Barebone of the app, is used in every component as wrapper
 * All reusable things like headers and footer goes heere
 * Can be unit tested if the children componet will be rendered or not
 */
const Wrapper = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Wrapper;
