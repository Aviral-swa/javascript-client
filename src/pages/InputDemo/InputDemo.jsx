import React, { useEffect, useState } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import {
  selectOptions, radioOptionsCricket, radioOptionsFootball,
} from '../../configs/constants';

const InputDemo = () => {
  const [state, setState] = useState({
    name: '', sport: '', cricket: '', football: '',
  });

  const handleNameChange = (event) => {
    setState({ ...state, name: event.target.value });
  };

  const handleSportChange = (event) => (
    setState({
      ...state, sport: event.target.value, football: '', cricket: '',
    })
  );

  const handleRoleChange = (event) => (
    setState({ ...state, [state.sport]: event.target.value })
  );

  const RadioOptions = () => {
    const option = {
      cricket: radioOptionsCricket,
      football: radioOptionsFootball,
    };
    return option[state.sport];
  };

  useEffect(() => {
    console.log(state);
  });

  return (
    <>
      <p>Name</p>
      <TextField
        defaultValue=""
        error=""
        onChange={handleNameChange}
      />
      <p>Select the game you play</p>
      <SelectField
        onChange={handleSportChange}
        options={selectOptions}
      />
      {
        (state.sport) ? (
          <>
            <p>What you do</p>
            <RadioGroup
              onChange={handleRoleChange}
              options={RadioOptions()}
            />
          </>
        ) : ''
      }
    </>
  );
};

export default InputDemo;
