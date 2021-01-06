import { object } from 'prop-types';
import React from 'react';
import { Login } from '../../pages';
import { Footer } from '../components/Footer';

const AuthLayout = ({ history }) => (
  <>
    <Login history={history} />
    <br />
    <Footer />
  </>
);

AuthLayout.propTypes = {
  history: object.isRequired,
};

export default AuthLayout;
