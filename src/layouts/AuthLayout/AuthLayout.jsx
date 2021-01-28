import { node } from 'prop-types';
import React from 'react';
import { Footer } from '../components/Footer';

const AuthLayout = ({ children }) => (
  <>
    {children}
    <br />
    <Footer />
  </>
);

AuthLayout.propTypes = {
  children: node.isRequired,
};

export default AuthLayout;
