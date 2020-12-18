/* eslint-disable no-eval */
import React from 'react';
import { node, number, string } from 'prop-types';

const Math = (props) => {
  const {
    first, second, operator, children,
  } = props;

  const operators = ['+', '-', '*', '/'];

  const getResult = () => {
    if (!(operators.includes(operator))) {
      return 'invalid operation';
    }
    return eval(`${first} ${operator} ${second}`);
  };

  if (children) {
    return children({ first, second, result: getResult() });
  }
  return (
    <p>
      {`Result of ${first} ${operator} ${second} is ${getResult()}`}
    </p>
  );
};

Math.propTypes = {
  first: number.isRequired,
  second: number.isRequired,
  operator: string.isRequired,
  children: node,
};

Math.defaultProps = {
  children: null,
};

export default Math;
