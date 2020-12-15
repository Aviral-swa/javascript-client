import {
  arrayOf, func, object, string,
} from 'prop-types';
import React from 'react';
import { P } from './style';

const RadioGroup = (props) => {
  const {
    error, onChange, options, onBlur,
  } = props;
  return (
    <>
      { options.map(({ value, label }) => (
        <div key={label}>
          <input
            type="radio"
            id={value}
            onBlur={onBlur}
            name={label}
            value={value}
            onChange={onChange}
            error={error}
          />
          <label htmlFor={value}>{value}</label>
          <br />
        </div>
      ))}
      <P error>{error}</P>
    </>
  );
};

RadioGroup.propTypes = {
  error: string,
  onChange: func.isRequired,
  options: arrayOf(object),
  onBlur: func.isRequired,
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
};

export default RadioGroup;
