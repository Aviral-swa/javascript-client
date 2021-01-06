import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import { NoMatch } from '../pages';

const AuthRoute = () => (
  <div>
    <Switch>
      <Route exact path="/login" render={(routerProps) => <AuthLayout history={routerProps.history} />} />
      <Route default component={NoMatch} />
    </Switch>
  </div>
);

export default AuthRoute;
