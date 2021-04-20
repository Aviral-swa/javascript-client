import React from 'react';
import {
  render, configure, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Table from '../components/Table/Table';
import data from '../data';

const getLevels = () => {
  const levels = [];
  data.forEach((employee) => (
    levels.push(employee.role)
  ));
  return [...new Set(levels)];
};

configure({ testIdAttribute: 'id' });
render(<Table data={data} columns={getLevels()} />);

test('should have 1 table container', () => {
  const tableContainer = screen.getAllByTestId('container');
  expect(tableContainer).toHaveLength(1);
});
