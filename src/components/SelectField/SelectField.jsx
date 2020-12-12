import {
  arrayOf, func, object, string,
} from 'prop-types';
import React from 'react';
import Select from './style';

const SelectField = (props) => {
  const {
    error, onChange, options, defaultText,
  } = props;
  return (
    <>
      <Select onChange={onChange} error={error}>
        <option>{defaultText}</option>
        {
          options.map(({ value, label }) => <option key={label} value={value}>{label}</option>)
        }
      </Select>
    </>
  );
};

SelectField.propTypes = {
  error: string,
  onChange: func.isRequired,
  options: arrayOf(object),
  defaultText: string,
};
SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
};

export default SelectField;
