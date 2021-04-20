import {
  bool, func, objectOf, string,
} from 'prop-types';
import React from 'react';
import Buttons from './style';

const Button = (props) => {
  const {
    highlight, disabled, style, value, onClick,
  } = props;
  if (highlight && !disabled) {
    return (
      <Buttons
        type="submit"
        disabled={disabled}
        highlight={highlight}
        style={style}
        onClick={onClick}
      >
        {value}
      </Buttons>
    );
  }

  return (
    <Buttons
      id="button"
      type="submit"
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {value}
    </Buttons>
  );
};

Button.propTypes = {
  highlight: bool,
  disabled: bool,
  style: objectOf(string),
  value: string.isRequired,
  onClick: func.isRequired,
};

Button.defaultProps = {
  highlight: false,
  disabled: false,
  style: {},
};

export default Button;
