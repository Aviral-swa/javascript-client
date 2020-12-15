import React from 'react';
import { theme } from './theme';
import { ChildrenDemo } from './pages';

function App() {
  const styling = theme();
  return (
    <div className={styling.root}>
      <ChildrenDemo />
    </div>
  );
}

export default App;
