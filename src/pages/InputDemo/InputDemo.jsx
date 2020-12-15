import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import {
  selectOptions, radioOptionsCricket, radioOptionsFootball, cricket, football,
} from '../../configs/constants';

const InputDemo = () => {
  const [state, setState] = useState({
    name: '', sport: '', cricket: '', football: '',
  });

  const [touched, setTouched] = useState({
    name: false, sport: false, role: false,
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

  const schema = yup.object().shape({
    name: yup.string().required('required').min(3, 'min 3 char'),
    sport: yup.string().required('required'),
    role: yup.string()
      .when('sport', {
        is: 'cricket',
        then: yup.string()
          .required('required'),
        otherwise: yup.string()
          .required('required'),
      }),
  });

  const playerData = {
    name: state.name,
    sport: state.sport,
    role: state.cricket || state.football,
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const hasErrors = () => {
    try {
      schema.validateSync(playerData);
    } catch (err) {
      return true;
    }
    return false;
  };

  const isTouched = () => {
    const { name, sport, role } = touched;
    if (name || sport || role) {
      return true;
    }
    return false;
  };
  const getError = (field) => {
    if (touched[field] && hasErrors()) {
      try {
        schema.validateSyncAt(field, playerData);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };

  const ResetState = () => {
    setState({
      name: '', sport: '', cricket: '', football: '',
    });
  };

  const SubmitData = () => {
    console.log(state);
  };

  useEffect(() => {
    console.log(state, touched);
  });

  return (
    <>
      <p>Name</p>
      <TextField
        defaultValue=""
        error={getError('name')}
        onChange={handleNameChange}
        onBlur={() => handleBlur('name')}
      />
      <p>Select the game you play</p>
      <SelectField
        error={getError('sport')}
        onChange={handleSportChange}
        options={selectOptions}
        onBlur={() => handleBlur('sport')}
      />
      {
        (state.sport === cricket || state.sport === football) ? (
          <>
            <p>What you do</p>
            <RadioGroup
              error={getError('role')}
              onChange={handleRoleChange}
              options={RadioOptions()}
              onBlur={() => handleBlur('role')}
            />
          </>
        ) : ''
      }
      <Button
        value="Cancel"
        onClick={ResetState}
      />
      <Button
        value="Submit"
        color="color"
        disabled={(hasErrors()) || !isTouched()}
        onClick={SubmitData}
      />
    </>
  );
};

export default InputDemo;
