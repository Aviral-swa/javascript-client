import React, { useState } from 'react';
import { bool, func } from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

const AddDialog = (props) => {
  const { open, onClose, onSubmit } = props;

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Dialog open={open} fullWidth maxWidth="md" onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Traine  details.
          </DialogContentText>
          <TextField
            varient="outlined"
            id="name"
            label="Name"
            type="text"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            // autoFocus
            // margin="dense"
            // id="password"
            // label="Password"
            // type="password"
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}

          />
          <TextField
            autoFocus
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddDialog.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  onSubmit: func.isRequired,
};

export default AddDialog;
