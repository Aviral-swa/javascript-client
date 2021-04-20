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
          id="textfield"
          defaultValue={defaultValue}
          disabled={disabled}
          pattern={pattern}
          onChange={onChange}
          onBlur={onBlur}
        />
        <P id="error" error>{error}</P>
      </>
    );
  }
  return (
    <Input
      type="text"
      id="textfield"
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
  onChange: func,
  onBlur: func,
};

TextField.defaultProps = {
  error: '',
  disabled: false,
  pattern: '.+',
  onChange: null,
  onBlur: null,
};

export default TextField;
