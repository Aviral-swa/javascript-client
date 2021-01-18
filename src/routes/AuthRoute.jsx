/* eslint-disable react/jsx-props-no-spreading */
import { func } from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layouts';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(routerProps) => (
      <AuthLayout>
        <Component {...routerProps} />
      </AuthLayout>
    )}
  />
);

AuthRoute.propTypes = {
  component: func.isRequired,
};

export default AuthRoute;
