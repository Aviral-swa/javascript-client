import React, { useEffect, useState } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import {
  selectOptions, radioOptionsCricket, radioOptionsFootball, cricket, football,
} from '../../configs/constants';

const InputDemo = () => {
  const [state, setState] = useState({
    name: '', sport: '', cricket: '', football: '',
  });

  const handleNameChange = (event) => {
    setState({ ...state, name: event.target.value });
  };

  const handleSportChange = (event) => (
    event.target.value === cricket ? setState({ ...state, sport: 'cricket', football: '' })
      : setState({ ...state, sport: 'football', cricket: '' })
  );

  const handleRoleChange = (event) => (
    state.sport === cricket ? setState({ ...state, cricket: event.target.value })
      : setState({ ...state, football: event.target.value })
  );

  const RadioOptions = () => {
    let option;
    if (state.sport === cricket) {
      option = radioOptionsCricket;
    }
    if (state.sport === football) {
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
        onChange={handleNameChange}
      />
      <p>Select the game you play</p>
      <SelectField
        onChange={handleSportChange}
        options={selectOptions}
      />
      {
        (state.sport === cricket || state.sport === football) ? (
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
