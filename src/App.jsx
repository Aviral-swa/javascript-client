import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './theme';
import { PrivateRoute, AuthRoute } from './routes';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/login" component={AuthRoute} />
        <Route default component={PrivateRoute} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
