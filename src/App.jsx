import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { theme } from './theme';
import { AuthRoute, PrivateRoute } from './routes';

function App() {
  const styling = theme();
  return (
    <div className={styling.root}>
      <Router>
        <Switch>
          <Route path="/login" component={AuthRoute} />
          <Route default component={PrivateRoute} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
