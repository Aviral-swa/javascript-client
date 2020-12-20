import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthLayout } from '../layouts';

const AuthRoute = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/login" component={AuthLayout} />
      </Switch>
    </div>
  </Router>
);

export default AuthRoute;
