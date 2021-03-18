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
}));

const Navbar = () => {
  const [isDisabled, setIsDisabled] = useState({
    trainee: true,
  });
  const classes = useStyles();

  const getVariant = (label) => {
    if (!isDisabled[label]) return 'text';
    return 'contained';
  };

  const handleButtonSelect = (label) => {
    setIsDisabled({ [label]: true });
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
                    className={classes.button}
                    variant={getVariant('trainee')}
                    disabled={isDisabled.trainee}
                    onClick={() => handleButtonSelect('trainee')}
                  >
                    TRAINEE
                  </Button>
                </Link>
                <Link to="/textfield-demo">
                  <Button
                    className={classes.button}
                    variant={getVariant('textfieldDemo')}
                    disabled={isDisabled.textfieldDemo}
                    onClick={() => handleButtonSelect('textfieldDemo')}
                  >
                    TEXTFILD DEMO
                  </Button>
                </Link>
                <Link to="/input-demo">
                  <Button
                    className={classes.button}
                    variant={getVariant('inputDemo')}
                    disabled={isDisabled.inputDemo}
                    onClick={() => handleButtonSelect('inputDemo')}
                  >
                    INPUTDEMO
                  </Button>
                </Link>
                <Link to="/children-demo">
                  <Button
                    className={classes.button}
                    variant={getVariant('children')}
                    disabled={isDisabled.children}
                    onClick={() => handleButtonSelect('children')}
                  >
                    CHILDREN DEMO
                  </Button>
                </Link>
                <Link to="/employee">
                  <Button
                    className={classes.button}
                    variant={getVariant('employee')}
                    disabled={isDisabled.employee}
                    onClick={() => handleButtonSelect('employee')}
                  >
                    EMPLOYEE
                  </Button>
                </Link>
                <Link to="/permission">
                  <Button
                    variant={getVariant('permission')}
                    className={classes.button}
                    disabled={isDisabled.permission}
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
