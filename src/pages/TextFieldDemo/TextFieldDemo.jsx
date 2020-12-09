import React from 'react';
import {
  TextField, styleSheet, Slider, sliderStyle,
} from '../../components';

const TextFieldDemo = () => {
  const style = styleSheet();
  return (
    <>
      <div style={sliderStyle.images__container}>
        <Slider
          height={250}
          banners={['./images/cloud.jpg', './images/js.jpg', './images/dns-server.png', './images/load-balancer.png', './images/full-stack-web-development.jpg']}
        />
      </div>
      <p>This Is Disabled Input</p>
      <TextField
        defaultValue="Disabled Input"
        disabled
        style={style.input}
      />
      <p>A Valid Input</p>
      <TextField
        defaultValue="Valid Input"
        style={style.border}
      />
      <p>An Input With Errors</p>
      <TextField
        defaultValue="101"
        pattern="[a-z]+"
        style={style.invalidInput}
      />
      <p style={style.errorText}>Should be an Alphabet</p>
    </>
  );
};
export default TextFieldDemo;
