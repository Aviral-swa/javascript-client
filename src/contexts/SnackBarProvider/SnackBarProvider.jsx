import { node } from 'prop-types';
import React, { createContext, useState } from 'react';
import SharedSnackbar from './SnackBar';

export const SnackBarContext = createContext();
export const ProvideSnackBar = (props) => {
  const { children } = props;
  const [snackValues, setSnackValues] = useState({
    message: '',
    status: '',
    open: false,
  });

  const openSnackbar = (message, status) => (
    setSnackValues({
      message,
      status,
      open: true,
    })
  );

  const handlecloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackValues({ open: false });
  };

  return (
    <SnackBarContext.Provider
      value={{ openSnackBar: openSnackbar }}
    >
      {children}
      <SharedSnackbar
        onClose={handlecloseSnackbar}
        open={snackValues.open}
        message={snackValues.message}
        status={snackValues.status}
      />
    </SnackBarContext.Provider>
  );
};

ProvideSnackBar.propTypes = {
  children: node.isRequired,
};
