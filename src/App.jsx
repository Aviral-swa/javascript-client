import React from 'react';
import { theme } from './theme';
import { Login } from './pages';

function App() {
  const styling = theme();
  return (
    <div className={styling.root}>
      <Login />
    </div>
  );
}

export default App;
