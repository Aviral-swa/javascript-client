import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthLayout } from '../layouts';
import { NoMatch } from '../pages';

const AuthRoute = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/login" component={AuthLayout} />
        <Route default component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default AuthRoute;
