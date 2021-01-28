/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { func } from 'prop-types';
import { PrivateLayout } from '../layouts';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

const PrivateRoute = ({ component: Component, ...rest }) => {
  const style = useStyles();
  if (localStorage.getItem('token')) {
    return (
      <Route
        {...rest}
        render={(routerProps) => (
          <PrivateLayout>
            <div className={style.root}>
              <Component {...routerProps} />
            </div>
          </PrivateLayout>
        )}
      />
    );
  }
  return (
    <Redirect to="/login" />
  );
};

PrivateRoute.propTypes = {
  component: func.isRequired,
};

export default PrivateRoute;
