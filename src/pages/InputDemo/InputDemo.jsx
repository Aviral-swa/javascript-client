import React, { useEffect, useState } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import { selectOptions, radioOptionsCricket, radioOptionsFootball } from '../../configs/constants';

const InputDemo = () => {
  const [state, setState] = useState({
    name: '', sport: '', cricket: '', football: '',
  });

  const handlestateChange = (event) => {
    setState({ ...state, name: event.target.value });
  };

  const handleSportChange = (event) => (
    event.target.value === 'cricket' ? setState({ ...state, sport: 'cricket' })
      : setState({ ...state, sport: 'football' })
  );

  const handleRoleChange = (event) => (
    state.sport === 'cricket' ? setState({ ...state, cricket: event.target.value })
      : setState({ ...state, football: event.target.value })
  );

  const RadioOptions = () => {
    let option;
    if (state.sport === 'cricket') {
      option = radioOptionsCricket;
    }
    if (state.sport === 'football') {
      option = radioOptionsFootball;
    }
    return option;
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
        onChange={handlestateChange}
      />
      <p>Select the game you play</p>
      <SelectField
        onChange={handleSportChange}
        options={selectOptions}
      />
      <p>What you do</p>
      <RadioGroup
        onChange={handleRoleChange}
        options={RadioOptions()}
      />
    </>
  );
};

export default InputDemo;
