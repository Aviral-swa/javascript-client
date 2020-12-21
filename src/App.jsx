import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { FormDialog } from './pages/Trainee';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FormDialog />
    </ThemeProvider>
  );
}

export default App;
