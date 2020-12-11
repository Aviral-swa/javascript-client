import React from 'react';
import {
  TextField, P, Slider, Div,
} from '../../components';
import { PUBLIC_IMAGE_FOLDER } from '../../configs/constants';

const TextFieldDemo = () => (
  <>
    <Div sliderBg>
      <Slider
        height={250}
        banners={PUBLIC_IMAGE_FOLDER}
      />
    </Div>
    <P>This Is Disabled Input</P>
    <TextField
      defaultValue="Disabled Input"
      disabled
    />
    <P>A Valid Input</P>
    <TextField
      defaultValue="Valid Input"
    />
    <P>An Input With Errors</P>
    <TextField
      defaultValue="101"
      pattern="[a-z]+"
    />
    <P error>Should be an Alphabet</P>
  </>
);
export default TextFieldDemo;
