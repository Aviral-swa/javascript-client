import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import {
  TextFieldDemo, InputDemo, ChildrenDemo, Trainee, NoMatch,
} from '../pages';
import { PrivateLayout } from '../layouts';

const PrivateRoute = () => (
  <Router>
    <div>
      <PrivateLayout />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (<Redirect to="/add-trainee" />
          )}
        />
        <Route exact path="/textfield-demo" component={TextFieldDemo} />
        <Route exact path="/input-demo" component={InputDemo} />
        <Route exact path="/children-demo" component={ChildrenDemo} />
        <Route path="/add-trainee" component={Trainee} />
        <Route default component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default PrivateRoute;
