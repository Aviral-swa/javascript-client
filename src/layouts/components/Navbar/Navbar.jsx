import React from 'react';
import {
  makeStyles, AppBar, Toolbar, Typography, Button, CssBaseline,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  button: {
    color: 'white',
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
          <div>
            <Link to="/add-trainee">
              <Button className={classes.button}>TRAINEE</Button>
            </Link>
            <Link to="/textfield-demo">
              <Button className={classes.button}>TEXTFILD DEMO</Button>
            </Link>
            <Link to="/input-demo">
              <Button className={classes.button}>INPUTDEMO</Button>
            </Link>
            <Link to="/children-demo">
              <Button className={classes.button}>CHILDREN DEMO</Button>
            </Link>
            <Button color="inherit">Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
