import {
  arrayOf, func, object, string,
} from 'prop-types';
import React from 'react';

const RadioGroup = (props) => {
  const { error, onChange, options } = props;
  return (
    <>
      { options.map(({ value, label }) => (
        <div key={label}>
          <input type="radio" name={label} value={value} onChange={onChange} error={error} />
          <br />
        </div>
      ))}
    </>
  );
};

RadioGroup.propTypes = {
  error: string,
  onChange: func.isRequired,
  options: arrayOf(object),
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
};

export default RadioGroup;
