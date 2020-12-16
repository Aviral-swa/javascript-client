import React from 'react';
import { theme } from './theme';
import { FormDialog } from './pages/Trainee';

function App() {
  const styling = theme();
  return (
    <div className={styling.root}>
      <FormDialog />
    </div>
  );
}

export default App;
