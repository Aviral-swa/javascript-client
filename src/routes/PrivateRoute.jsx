import React from 'react';
import {
  Route, Switch, Redirect,
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
  if (localStorage.getItem('token')) {
    return (
      <div>
        <PrivateLayout />
        <div className={classes.root}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (<Redirect to="/login" />
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
    );
  }
  return (
    <Switch>
      <Redirect to="/login" />
    </Switch>
  );
};

export default PrivateRoute;
