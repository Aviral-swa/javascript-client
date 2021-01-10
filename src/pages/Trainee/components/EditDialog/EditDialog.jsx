import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Button, DialogContentText, TextField, InputAdornment, CircularProgress,
} from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { bool, func, object } from 'prop-types';
import * as yup from 'yup';

const EditDialog = (props) => {
  const {
    open, onClose, onClickEdit, defaultValue, loading,
  } = props;
  const { name, email } = defaultValue;

  const [state, setState] = useState({
    Name: '',
    Email: '',
  });

  const [touched, setTouched] = useState({
    Name: false,
    Email: false,
  });

  const handleChange = (field) => (event) => {
    setState({ ...state, [field]: event.target.value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const schema = yup.object().shape({
    Name: yup.string().required('Name is a required field').min(3, 'Min 3 characters'),
    Email: yup.string().email('Enter valid email')
      .required('Email is a required field'),
  });

  const hasErrors = () => {
    try {
      schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  };

  const isTouched = () => {
    const {
      Name, Email,
    } = touched;
    if (Name || Email) {
      return true;
    }
    return false;
  };

  const resetTouched = () => {
    setTouched({ name: false, email: false });
    return onClose();
  };

  const onClickSubmit = () => {
    setTouched({ name: false, email: false });
    return onClickEdit(state);
  };
  const getError = (field) => {
    if (touched[field] && hasErrors()) {
      try {
        schema.validateSyncAt(field, state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };

  const renderFormField = ({
    label, type, icon, field, value,
  }) => (
    <TextField
      error={!!getError(field)}
      required
      variant="outlined"
      margin="normal"
      defaultValue={value}
      label={label}
      type={type}
      fullWidth
      helperText={getError(field)}
      onChange={handleChange(field)}
      onBlur={() => handleBlur(field)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your trainee details.
        </DialogContentText>
        {
          renderFormField({
            label: 'Name',
            field: 'Name',
            type: 'text',
            value: name,
            icon: <PersonOutlineIcon />,
          })
        }
        {
          renderFormField({
            label: 'Email',
            field: 'Email',
            type: 'email',
            value: email,
            icon: <EmailOutlinedIcon />,
          })
        }
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => resetTouched()}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          disabled={(hasErrors()) || !isTouched() || loading}
          onClick={() => onClickSubmit()}
          color="primary"
          variant="contained"
        >
          {loading && <CircularProgress size={24} />}
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDialog.propTypes = {
  open: bool,
  onClose: func.isRequired,
  onClickEdit: func.isRequired,
  defaultValue: object.isRequired,
  loading: bool,
};

EditDialog.defaultProps = {
  loading: false,
  open: false,
};

export default EditDialog;
