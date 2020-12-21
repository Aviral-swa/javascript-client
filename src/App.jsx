import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import theme from './theme';
// import { AuthRoute, PrivateRoute } from './routes';
import { Trainee } from './pages';

const App = () => (
  <ThemeProvider theme={theme}>
    {/* <Router>
        <Switch>
          <Route path="/login" component={AuthRoute} />
          <Route default component={PrivateRoute} />
        </Switch>
      </Router> */}
    <Trainee />
  </ThemeProvider>
);

export default App;
