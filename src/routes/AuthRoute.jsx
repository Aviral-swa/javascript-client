import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import { NoMatch } from '../pages';

const AuthRoute = () => {
  if (!localStorage.getItem('token')) {
    return (
      <div>
        <Switch>
          <Route exact path="/login" render={(routerProps) => <AuthLayout history={routerProps.history} />} />
          <Route default component={NoMatch} />
        </Switch>
      </div>
    );
  }
  return (
    <Switch>
      <Redirect to="/add-trainee" />
    </Switch>
  );
};

export default AuthRoute;
