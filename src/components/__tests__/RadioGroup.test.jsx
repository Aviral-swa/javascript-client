import React from 'react';
import {
  render, configure, screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RadioGroup } from '../RadioGroup';
import { radioOptionsCricket } from '../../configs/constants';

afterEach(cleanup);
configure({ testIdAttribute: 'id' });
beforeEach(() => render(<RadioGroup
  options={radioOptionsCricket}
  onBlur={() => {}}
  onChange={() => {}}
  error="error text"
/>));

test('should display the radio buttons', () => {
  const button = screen.getAllByTestId('radioGroup');
  expect(button).toHaveLength(radioOptionsCricket.length);
});

test('should display the error text', () => {
  const button = screen.getAllByText('error text');
  expect(button).toHaveLength(1);
});
