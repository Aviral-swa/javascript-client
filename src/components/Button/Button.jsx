import {
  bool, func, objectOf, string,
} from 'prop-types';
import React from 'react';
import Button from './style';

const Buttons = (props) => {
  const {
    color, disabled, style, value, onClick,
  } = props;
  if (color) {
    return (
      <Button
        type="submit"
        disabled={disabled}
        color={color}
        style={style}
        onClick={onClick}
      >
        {value}
      </Button>
    );
  }
  return (
    <Button
      type="submit"
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {value}
    </Button>
  );
};

Buttons.propTypes = {
  color: string,
  disabled: bool,
  style: objectOf(string),
  value: string.isRequired,
  onClick: func.isRequired,
};

Buttons.defaultProps = {
  color: 'default',
  disabled: false,
  style: {},
};

export default Buttons;
