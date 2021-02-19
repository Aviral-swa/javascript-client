export default [
  {
    ancestors: [],
    _id: '602df4fe7bd8a91cb661bf06',
    name: 'employee 1',
    role: 'CEO',
    parent: '',
    __v: 0,
  },
  {
    ancestors: [
      'employee 1',
    ],
    _id: '602df5bb7967af1e06566f37',
    name: 'employee 2',
    role: 'manager',
    parent: 'employee 1',
    __v: 0,
  },
  {
    ancestors: [
      'employee 1',
      'employee 2',
    ],
    _id: '602df5fe8cb49c1e9d5fa9d5',
    name: 'employee 3',
    role: 'tech lead',
    parent: 'employee 2',
    __v: 0,
  },
  {
    ancestors: [
      'employee 1',
      'employee 2',
    ],
    _id: '602e02138c688d2772e2acc0',
    name: 'Employee 4',
    role: 'tech lead',
    parent: 'employee 2',
    __v: 0,
  },
  {
    ancestors: [
      'employee 1',
      'employee 2',
      'Employee 4',
    ],
    _id: '602e0998e775742f6698cedb',
    name: 'Employee 5',
    role: 'dev',
    parent: 'Employee 4',
    __v: 0,
  },
  {
    ancestors: [
      'employee 1',
      'employee 2',
      'employee 3',
    ],
    _id: '602e53bfac666f480baed012',
    name: 'employee 6',
    role: 'dev',
    parent: 'employee 3',
    __v: 0,
  },
  {
    ancestors: [
      'employee 1',
    ],
    _id: '602f48488a4dc72e852b5276',
    name: 'employee 7',
    role: 'manager',
    parent: 'employee 1',
    __v: 0,
  },
  {
    ancestors: [
      'employee 1',
      'employee 2',
      'employee 4',
    ],
    _id: '602f488d8a4dc72e852b5277',
    name: 'employee 8',
    role: 'dev',
    parent: 'employee 4',
    __v: 0,
  },
];
