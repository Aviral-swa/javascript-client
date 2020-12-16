import {
  arrayOf, func, object, string,
} from 'prop-types';
import React from 'react';
import { Select } from './style';
import { ErrorText } from '../CommonStyle';

const SelectField = (props) => {
  const {
    error, onChange, options, defaultText, onBlur,
  } = props;

  const selectOptions = options.map(({ value, label }) => (
    <option key={label} value={value}>{label}</option>));

  return (
    <>
      <Select onChange={onChange} error={error} onBlur={onBlur}>
        <option>{defaultText}</option>
        {
          selectOptions
        }
      </Select>
      <ErrorText error>{error}</ErrorText>
    </>
  );
};

SelectField.propTypes = {
  error: string,
  onChange: func.isRequired,
  options: arrayOf(object),
  defaultText: string,
  onBlur: func.isRequired,
};
SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
};

export default SelectField;
