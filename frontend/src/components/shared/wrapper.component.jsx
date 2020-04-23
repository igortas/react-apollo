import React from 'react';

import Header from './header.component';
import Footer from './footer.component';

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
