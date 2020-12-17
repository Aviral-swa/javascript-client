import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Grid } from '@material-ui/core';
import { AddDialog } from './components';

const FormDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSumbit = (state) => (
    console.log(state)
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container justify="center">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleClickOpen}
        >
          Add Trainee
        </Button>
      </Grid>
      <AddDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSumbit}
      />
    </div>
  );
};

export default FormDialog;
