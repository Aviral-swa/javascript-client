import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';
import theme from './theme';
import { PrivateRoute, AuthRoute } from './routes';
import { ProvideSnackBar } from './contexts';
import client from './libs/apollo-client';
import {
  ChildrenDemo, TextFieldDemo, InputDemo,
  NoMatch, Login, Employee, Trainee,
} from './pages';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ProvideSnackBar>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Redirect exact path="/" to="/login" />
            <AuthRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/input-demo" component={InputDemo} />
            <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
            <PrivateRoute exact path="/textfield-demo" component={TextFieldDemo} />
            <PrivateRoute path="/add-trainee" component={Trainee} />
            <PrivateRoute path="/employee" component={Employee} />
            <PrivateRoute default component={NoMatch} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ProvideSnackBar>
  </ThemeProvider>
);

export default App;
