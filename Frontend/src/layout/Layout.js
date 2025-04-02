// src/layout/Layout.js
import React from 'react';
import Banner from '../Component/Banner';

const Layout = ({ children, isLoggedIn }) => {
  return (
    <div>
      <Banner isLoggedIn={isLoggedIn} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
