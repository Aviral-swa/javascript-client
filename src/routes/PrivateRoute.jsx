import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import {
  TextFieldDemo, InputDemo, ChildrenDemo, Trainee, NoMatch,
} from '../pages';
import { PrivateLayout } from '../layouts';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

const PrivateRoute = () => {
  const classes = useStyles();
  return (
    <Router>
      <div>
        <PrivateLayout />
        <div className={classes.root}>
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
      </div>
    </Router>
  );
};

export default PrivateRoute;
