import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';
import trainees from './data/trainee';
import { NoMatch } from '..';

const renderTrainee = (routerProps) => {
  const traineeId = parseInt(routerProps.match.params.id, 10);
  const foundTrainee = trainees.find((traineeObj) => traineeObj.id === traineeId);
  return (foundTrainee ? <TraineeDetail trainee={foundTrainee} /> : <NoMatch />);
};

const Trainee = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={TraineeList} />
      <Route exact path="/trainee" component={TraineeList} />
      <Route exact path="/trainee/:id" render={(routerProps) => renderTrainee(routerProps)} />
      <Route default component={NoMatch} />
    </Switch>
  </Router>
);

export default Trainee;
