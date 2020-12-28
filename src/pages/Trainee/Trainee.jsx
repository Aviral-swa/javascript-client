import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';
import { NoMatch } from '..';

const Trainee = () => (
  <Switch>
    <Route exact path="/add-trainee" component={TraineeList} />
    <Route exact path="/add-trainee/:id" render={(routerProps) => <TraineeDetail routerProps={routerProps} />} />
    <Route default component={NoMatch} />
  </Switch>
);

export default Trainee;
