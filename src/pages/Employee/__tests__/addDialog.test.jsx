import React from 'react';
import {
  render, configure, screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddDialog from '../components/AddDialog/AddDialog';

afterEach(cleanup);
configure({ testIdAttribute: 'id' });
let open = true;
beforeEach(() => render(<AddDialog
  open={open}
  onSubmit={() => { open = false; }}
  onClose={() => { open = false; }}
/>));

test('should open the dialog', () => {
  const title = screen.getByTestId('form-dialog-title');
  expect(title).toHaveTextContent('Add Employee');
});

test('should have 3 textfields', () => {
  const textfields = screen.getAllByTestId('fields');
  expect(textfields).toHaveLength(3);
});

// test('should close the dialog', () => {
//   const button = screen.getByText(/Cancel/i);
//   fireEvent.click(button);
//   const textfields = screen.getAllByTestId('fields');
//   expect(textfields).toHaveLength(0);
// });
