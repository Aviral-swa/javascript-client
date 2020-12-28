import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { string, bool, func } from 'prop-types';

const ProvideSnackBar = (props) => {
  const {
    message, status, open, onClose,
  } = props;

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
        <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={status}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

ProvideSnackBar.propTypes = {
  message: string.isRequired,
  status: string.isRequired,
  open: bool.isRequired,
  onClose: func.isRequired,
};

export default ProvideSnackBar;
