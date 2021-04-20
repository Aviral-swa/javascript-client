import React from 'react';
import {
  render, configure, screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SelectField } from '../SelectField';
import { selectOptions } from '../../configs/constants';

afterEach(cleanup);
configure({ testIdAttribute: 'id' });
beforeEach(() => render(<SelectField
  options={selectOptions}
  onBlur={() => {}}
  onChange={() => {}}
  error="error text"
/>));

test('should display the options', () => {
  const button = screen.getAllByTestId('selectField');
  expect(button).toHaveLength(selectOptions.length);
});

test('should display the error text', () => {
  const button = screen.getByTestId('errorText');
  expect(button).toHaveTextContent('error text');
});
