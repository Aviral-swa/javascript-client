import React, { useState } from 'react';
import {
  makeStyles, AppBar, Toolbar, Typography, Button, CssBaseline,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { SnackBarContext } from '../../../contexts';

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
  select: {
    color: 'white',
    boxShadow: '1px 1px 2px #00dbff',
  },
}));

const Navbar = () => {
  const [selected, setSelected] = useState({
    trainee: true,
  });
  const classes = useStyles();

  const handleButtonSelect = (label) => {
    setSelected({ [label]: true });
  };

  const handleLogout = (openSnackBar) => {
    localStorage.clear();
    openSnackBar('Logout successfull', 'success');
  };

  return (
    <SnackBarContext.Consumer>
      {({ openSnackBar }) => (
        <>
          <CssBaseline />
          <AppBar position="static" className={classes.root}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Trainee Portal
              </Typography>
              <div>
                <Link to="/add-trainee">
                  <Button
                    className={selected.trainee ? classes.select : classes.button}
                    onClick={() => handleButtonSelect('trainee')}
                  >
                    TRAINEE
                  </Button>
                </Link>
                <Link to="/textfield-demo">
                  <Button
                    className={selected.textfieldDemo ? classes.select : classes.button}
                    onClick={() => handleButtonSelect('textfieldDemo')}
                  >
                    TEXTFILD DEMO
                  </Button>
                </Link>
                <Link to="/input-demo">
                  <Button
                    className={selected.inputDemo ? classes.select : classes.button}
                    onClick={() => handleButtonSelect('inputDemo')}
                  >
                    INPUTDEMO
                  </Button>
                </Link>
                <Link to="/children-demo">
                  <Button
                    className={selected.children ? classes.select : classes.button}
                    onClick={() => handleButtonSelect('children')}
                  >
                    CHILDREN DEMO
                  </Button>
                </Link>
                <Link to="/employee">
                  <Button
                    className={selected.employee ? classes.select : classes.button}
                    onClick={() => handleButtonSelect('employee')}
                  >
                    EMPLOYEE
                  </Button>
                </Link>
                <Link to="/permission">
                  <Button
                    className={selected.permission ? classes.select : classes.button}
                    onClick={() => handleButtonSelect('permission')}
                  >
                    MANAGE PERMISSIONS
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    className={classes.button}
                    onClick={() => handleLogout(openSnackBar)}
                  >
                    Logout
                  </Button>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
        </>
      )}
    </SnackBarContext.Consumer>
  );
};

export default Navbar;
