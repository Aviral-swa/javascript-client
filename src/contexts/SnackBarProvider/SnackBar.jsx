import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { bool, func, string } from 'prop-types';

const SharedSnackbar = (props) => {
  const {
    open, message, onClose, status,
  } = props;
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={status}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

SharedSnackbar.propTypes = {
  message: string,
  status: string,
  open: bool.isRequired,
  onClose: func.isRequired,
};
SharedSnackbar.defaultProps = {
  message: '',
  status: 'info',
};
export default SharedSnackbar;
