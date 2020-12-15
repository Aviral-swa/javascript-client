import { bool, func, string } from 'prop-types';
import React from 'react';
import { Input } from './style';

const TextField = (props) => {
  const {
    defaultValue, disabled, pattern, onChange, error,
  } = props;
  return (
    <Input
      type="text"
      defaultValue={defaultValue}
      disabled={disabled}
      pattern={pattern}
      error={error}
      onChange={onChange}
    />
  );
};

TextField.propTypes = {
  defaultValue: string.isRequired,
  disabled: bool,
  pattern: string,
  error: string,
  onChange: func.isRequired,
};

TextField.defaultProps = {
  error: '',
  disabled: false,
  pattern: '.+',
};

export default TextField;
