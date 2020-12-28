import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Button, DialogContentText,
} from '@material-ui/core';
import { bool, func } from 'prop-types';

const RemoveDialog = (props) => {
  const {
    open, onClose, onClickDelete,
  } = props;
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to delete this trainee.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={() => onClickDelete()} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

RemoveDialog.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  onClickDelete: func.isRequired,
};

export default RemoveDialog;
