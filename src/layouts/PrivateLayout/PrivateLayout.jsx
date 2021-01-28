import React from 'react';
import { node } from 'prop-types';
import { Navbar } from '../components';

const PrivateLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

PrivateLayout.propTypes = {
  children: node.isRequired,
};

export default PrivateLayout;
