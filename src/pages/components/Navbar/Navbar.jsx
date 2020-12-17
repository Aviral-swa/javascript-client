import React from 'react';
import {
  makeStyles, AppBar, Toolbar, Typography, Button, CssBaseline,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Portal
          </Typography>
          <div className={classes.menu}>
            <Button color="inherit">TRAINEE</Button>
            <Button color="inherit">TEXTFILD DEMO</Button>
            <Button color="inherit">INPUTDEMO</Button>
            <Button color="inherit">CHILDREN DEMO</Button>
            <Button color="inherit">Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
