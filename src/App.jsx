import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Login } from './pages';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <Login />
  </ThemeProvider>
);

export default App;
