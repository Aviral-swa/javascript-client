import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthRoute, PrivateRoute } from './routes';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login" component={AuthRoute} />
          <Route default component={PrivateRoute} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
