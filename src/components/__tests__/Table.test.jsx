import React from 'react';
import {
  render, configure, screen,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Table } from '../Table';
import tableRecords from '../../pages/Trainee/data/trainee';

afterEach(cleanup);
configure({ testIdAttribute: 'id' });
beforeEach(() => render(<Table
  id="originalId"
  data={tableRecords}
  columns={[{
    field: 'name',
    label: 'Name',
  },
  {
    field: 'email',
    label: 'Email',
    format: (value) => value && value.toUpperCase(),
  },
  {
    field: 'createdAt',
    label: 'Date',
    align: 'right',
  },
  ]}
  onSort={() => {}}
  onSelect={() => {}}
  count={10}
  onChangePage={() => {}}
  loading={false}
/>));

test('should have 1 table container', () => {
  const element = screen.getAllByTestId('container');
  expect(element).toHaveLength(1);
});

test('should have 1 table head', () => {
  const element = screen.getAllByTestId('head');
  expect(element).toHaveLength(1);
});

test('should have 1 table body', () => {
  const element = screen.getAllByTestId('body');
  expect(element).toHaveLength(1);
});

test('should have correct number of rows', () => {
  const element = screen.getAllByTestId('tableRows');
  expect(element).toHaveLength(tableRecords.length);
});
