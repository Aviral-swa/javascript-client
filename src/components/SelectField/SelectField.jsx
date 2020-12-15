import {
  arrayOf, func, object, string,
} from 'prop-types';
import React from 'react';
import Select from './style';

const SelectField = (props) => {
  const {
    error, onChange, options, defaultText,
  } = props;

  const selectOptions = options.map(({ value, label }) => (
    <option key={label} value={value}>{label}</option>));

  return (
    <>
      <Select onChange={onChange} error={error}>
        <option>{defaultText}</option>
        {
          selectOptions
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
