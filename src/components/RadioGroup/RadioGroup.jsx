import {
  arrayOf, func, object, string,
} from 'prop-types';
import React from 'react';
import { ErrorText } from '../CommonStyle';

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
            id="radioGroup"
            onBlur={onBlur}
            name={label}
            value={value}
            onChange={onChange}
            error={error}
          />
          {value}
        </div>
      ))}
      <ErrorText error>{error}</ErrorText>
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
