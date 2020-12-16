import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import {
  selectOptions, radioOptionsCricket, radioOptionsFootball,
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

  const schema = yup.object().shape({
    name: yup.string().required('Name is a required field').min(3, 'Atleast 3 characters'),
    sport: yup.string().required('Sport is a required'),
    role: yup.string()
      .when('sport', {
        is: 'cricket',
        then: yup.string()
          .required('What you do is a required field'),
        otherwise: yup.string()
          .required('What you do is a required field'),
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
        (state.sport) ? (
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
        highlight
        disabled={(hasErrors()) || !isTouched()}
        onClick={SubmitData}
      />
    </>
  );
};

export default InputDemo;
