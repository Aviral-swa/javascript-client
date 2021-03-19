import React from 'react';
import {
  render, configure, screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddDialog from '../components/AddDialog/AddDialog';

afterEach(cleanup);
configure({ testIdAttribute: 'id' });
render(<AddDialog
  open
  onSubmit={() => {}}
  onClose={() => {}}
/>);

test('should open the dialog', () => {
  const title = screen.getByTestId('form-dialog-title');
  expect(title).toHaveTextContent('Add Employee');
});

// test('should close the dialog', () => {
//   fireEvent.click(screen.getByText('Cancel'));
//   const title = screen.findAllByText('Add Employee');
//   expect(title).toHaveLength(0);
// });
