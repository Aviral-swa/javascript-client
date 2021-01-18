import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import { PrivateRoute, AuthRoute } from './routes';
import { ProvideSnackBar } from './contexts';
import {
  ChildrenDemo, TextFieldDemo, InputDemo,
  NoMatch, Login, Trainee,
} from './pages';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ProvideSnackBar>
      <Router>
        <Switch>
          <Redirect exact path="/" to="/login" />
          <AuthRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/input-demo" component={InputDemo} />
          <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
          <PrivateRoute exact path="/textfield-demo" component={TextFieldDemo} />
          <PrivateRoute path="/add-trainee" component={Trainee} />
          <PrivateRoute default component={NoMatch} />
        </Switch>
      </Router>
    </ProvideSnackBar>
  </ThemeProvider>
);

export default App;
