import React from 'react';
import {
  render, fireEvent, configure, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddDialog from './AddDialog';

const onclose = () => {};
const onSubmit = () => {};
configure({ testIdAttribute: 'id' });
const { getByTestId } = render(<AddDialog open onClose={onclose} onSubmit={onSubmit} />);

test('should have title Add Trainee', () => {
  expect(getByTestId('form-dialog-title')).toHaveTextContent('Add Trainee');
});

test('should show correct input value', () => {
  const input = getByTestId('name-field');
  fireEvent.change(input, { target: { value: 'name' } });
  expect(input.value).toBe('name');
});

test('should show validation errors', () => {
  const input = getByTestId('name-field');
  fireEvent.change(input, { target: { value: 'n' } });
  expect(screen.getAllByText('Min 3 characters')).toHaveLength(1);
});
