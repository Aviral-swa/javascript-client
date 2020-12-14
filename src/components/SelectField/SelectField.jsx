import {
  arrayOf, func, object, string,
} from 'prop-types';
import React from 'react';
import { Select, P } from './style';

const SelectField = (props) => {
  const {
    error, onChange, options, defaultText, onBlur,
  } = props;
  return (
    <>
      <Select onChange={onChange} error={error} onBlur={onBlur}>
        <option>{defaultText}</option>
        {
          options.map(({ value, label }) => <option key={label} value={value}>{label}</option>)
        }
      </Select>
      <P error>{error}</P>
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
