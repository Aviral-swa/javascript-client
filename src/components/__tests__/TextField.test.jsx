import React from 'react';
import {
  render, configure, screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TextField } from '../TextField';

afterEach(cleanup);
configure({ testIdAttribute: 'id' });

test('should display the textField', () => {
  render(<TextField
    defaultValue="defaultValue"
  />);
  const fields = screen.getAllByTestId('textfield');
  expect(fields).toHaveLength(1);
});

test('should display the error text', () => {
  render(<TextField
    defaultValue="defaultValue"
    error="error text"
  />);
  const button = screen.getByTestId('error');
  expect(button).toHaveTextContent('error text');
});
