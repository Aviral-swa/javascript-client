import React from 'react';

const TextField = (prop) => {
  const {
    defaultValue, disabled, pattern, style,
  } = prop;
  return (
    <input
      type="text"
      defaultValue={defaultValue}
      disabled={disabled}
      pattern={pattern}
      style={style}
    />
  );
};

export default TextField;
