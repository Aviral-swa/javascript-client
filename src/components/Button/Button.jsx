import {
  bool, func, objectOf, string,
} from 'prop-types';
import React from 'react';
import * as yup from 'yup';
import Button from './style';

const Buttons = (props) => {
  const {
    color, disabled, style, value, onClick,
  } = props;
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
};

export const schema = yup.object().shape({
  name: yup.string().required(),
  sport: yup.string().required(),
  WhatYouDo: yup.string().required(),
});

Buttons.propTypes = {
  color: string,
  disabled: bool,
  style: objectOf(string),
  value: string.isRequired,
  onClick: func.isRequired,
};

Buttons.defaultProps = {
  color: 'primary',
  disabled: false,
  style: {},
};

export default Buttons;
