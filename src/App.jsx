import React from 'react';
import { theme } from './theme';
import { Navbar, FormDialog } from './pages';

function App() {
  const styling = theme();
  return (
    <div className={styling.root}>
      <Navbar />
      <FormDialog />
    </div>
  );
}

export default App;
