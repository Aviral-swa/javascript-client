import React from 'react';
import { TextField, styleSheet } from '../../components';

function TextFieldDemo() {
  const style = styleSheet();
  return (
    <>
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
}
export default TextFieldDemo;
