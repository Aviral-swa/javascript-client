import { bool, func, string } from 'prop-types';
import React from 'react';
import { Input, P } from './style';

const TextField = (props) => {
  const {
    defaultValue, disabled, pattern, onChange, error, onBlur,
  } = props;

  if (error) {
    return (
      <>
        <Input
          error
          type="text"
          defaultValue={defaultValue}
          disabled={disabled}
          pattern={pattern}
          onChange={onChange}
          onBlur={onBlur}
        />
        <P error>{error}</P>
      </>
    );
  }
  return (
    <Input
      type="text"
      defaultValue={defaultValue}
      disabled={disabled}
      pattern={pattern}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

TextField.propTypes = {
  defaultValue: string.isRequired,
  disabled: bool,
  pattern: string,
  error: string,
  onChange: func.isRequired,
  onBlur: func.isRequired,
};

TextField.defaultProps = {
  error: '',
  disabled: false,
  pattern: '.+',
};

export default TextField;
