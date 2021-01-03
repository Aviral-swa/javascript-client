import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './theme';
import { PrivateRoute, AuthRoute } from './routes';
import { ProvideSnackBar } from './contexts';

const App = () => (
  <ThemeProvider theme={theme}>
    <ProvideSnackBar>
      <Router>
        <Switch>
          <Route path="/login" component={AuthRoute} />
          <Route default component={PrivateRoute} />
        </Switch>
      </Router>
    </ProvideSnackBar>
  </ThemeProvider>
);

export default App;
