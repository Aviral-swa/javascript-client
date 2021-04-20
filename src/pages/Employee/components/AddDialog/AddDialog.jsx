import React, { useState } from 'react';
import { bool, func } from 'prop-types';
import Button from '@material-ui/core/Button';
import {
  Dialog, DialogActions, Grid, TextField, DialogContent,
  DialogContentText, DialogTitle, InputAdornment, CircularProgress,
} from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import CompareArrowsOutlinedIcon from '@material-ui/icons/CompareArrowsOutlined';
import * as yup from 'yup';

const AddDialog = (props) => {
  const {
    open, onClose, onSubmit, loading,
  } = props;

  const [state, setState] = useState({
    name: '',
    role: '',
    parent: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    role: false,
    parent: false,
  });

  const resetState = () => {
    setState({
      name: '',
      role: '',
      parent: '',
    });
    setTouched({
      name: false,
      role: false,
      parent: false,
    });
  };

  const handleChange = (field) => (event) => {
    setState({ ...state, [field]: event.target.value });
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const schema = yup.object().shape({
    name: yup.string().required('Name is a required field').min(3, 'Min 3 characters'),
    role: yup.string().required('role is a required field'),
    parent: yup.string().required('parent is a required field'),
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
      name, role, parent,
    } = touched;
    if (name || role || parent) {
      return true;
    }
    return false;
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
    label, type, icon, field,
  }) => (
    <TextField
      error={!!getError(field)}
      required
      variant="outlined"
      margin="normal"
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
    <div>
      <Dialog open={open} fullWidth maxWidth="md" onClose={onClose}>
        <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Employee details.
          </DialogContentText>
          <div>
            <Grid container spacing={1}>
              <Grid item md={12} id="fields">
                {
                  renderFormField({
                    label: 'Name',
                    field: 'name',
                    type: 'text',
                    icon: <PersonOutlineIcon />,
                  })
                }
              </Grid>
              <Grid item md={12} id="fields">
                {
                  renderFormField({
                    label: 'Role',
                    field: 'role',
                    type: 'text',
                    icon: <SettingsOutlinedIcon />,
                  })
                }
              </Grid>
              <Grid item md={5} id="fields">
                {
                  renderFormField({
                    label: 'Parent',
                    field: 'parent',
                    type: 'text',
                    icon: <CompareArrowsOutlinedIcon />,
                  })
                }
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            disabled={(hasErrors()) || !isTouched() || loading}
            onClick={() => { onSubmit(state); resetState(); }}
            color="primary"
            variant="contained"
          >
            {loading && <CircularProgress size={24} />}
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddDialog.propTypes = {
  open: bool,
  onClose: func.isRequired,
  onSubmit: func.isRequired,
  loading: bool,
};

AddDialog.defaultProps = {
  open: false,
  loading: false,
};

export default AddDialog;
