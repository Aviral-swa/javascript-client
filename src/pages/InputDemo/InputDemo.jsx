import React, { useEffect, useState } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import { selectOptions } from '../../configs/constants';

const InputDemo = () => {
  const [state, setState] = useState({
    name: '', sport: '', cricket: '', football: '',
  });
  const handlestateChange = (event) => {
    setState({ ...state, name: event.target.value });
  };
  const handleSportChange = (event) => {
    setState({ ...state, sport: event.target.value });
    if (event.target.value === 'Select') {
      setState({ ...state, sport: '' });
    }
    return event.target.value === 'cricket' ? setState({ ...state, sport: 'cricket' }) : setState({ ...state, sport: 'football' });
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
      <RadioGroup />
    </>
  );
};

export default InputDemo;
