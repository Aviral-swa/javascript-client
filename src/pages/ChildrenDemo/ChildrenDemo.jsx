import React from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components';

const ChildrenDemo = () => (
  <>
    <Math
      first={91}
      second={63}
      operator="*"
    >
      {
        (item) => (
          <p>
            {' '}
            Multiplication of
            {' '}
            {item.first}
            {' '}
            and
            {' '}
            {item.second}
            {' '}
            is
            {' '}
            {item.result}
          </p>
        )
      }
    </Math>
    <Math first={4} second={6} operator="+">
      {
        (item) => (
          <p>
            When we add
            {' '}
            {item.first}
            {' '}
            &
            {' '}
            {item.second}
            {' '}
            we get
            {' '}
            {item.result}
          </p>
        )
      }
    </Math>
    <Math first={4} second={0} operator="/">
      {
        (item) => (
          <p>
            When we divide
            {' '}
            {item.first}
            {' '}
            &
            {' '}
            {item.second}
            {' '}
            we get
            {' '}
            {item.result}
          </p>
        )
      }
    </Math>
    <Math first={4} second={6} operator="?">
      {
        (item) => (
          <Typography variant="h5">
            When we perform (?)
            {' '}
            {item.first}
            {' '}
            &
            {' '}
            {item.second}
            {' '}
            we get
            {' '}
            {item.result}
          </Typography>
        )
      }
    </Math>
    <Math
      first={2}
      second={3}
      operator="+"
    />
  </>
);

export default ChildrenDemo;
