import React from 'react';
import {
  render, configure, screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Button } from '../Button';

afterEach(cleanup);
configure({ testIdAttribute: 'id' });
let value = 'test button';
beforeEach(() => render(<Button
  value={value}
  onClick={() => { value = 'changed'; }}
/>));

test('should display the button with the given value', () => {
  const button = screen.getByTestId('button');
  expect(button).toHaveTextContent('test button');
});
