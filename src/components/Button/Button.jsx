import {
  bool, func, objectOf, string,
} from 'prop-types';
import React from 'react';
import Button from './style';

const Buttons = (props) => {
  const {
    highlight, disabled, style, value, onClick,
  } = props;
  if (highlight && !disabled) {
    return (
      <Button
        type="submit"
        disabled={disabled}
        highlight={highlight}
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
  highlight: bool,
  disabled: bool,
  style: objectOf(string),
  value: string.isRequired,
  onClick: func.isRequired,
};

Buttons.defaultProps = {
  highlight: false,
  disabled: false,
  style: {},
};

export default Buttons;
