import React, { useState } from 'react';
import {
  Avatar, Button, CssBaseline, TextField, Typography, makeStyles, Container,
  CircularProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as yup from 'yup';
import { callApi } from '../../libs/utils';
import { SnackBarContext } from '../../contexts';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '1px 1px 6px grey',
  },
  logo: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (routerProps) => {
  const [state, setState] = useState({
    email: '', password: '',
  });

  const [touched, setTouched] = useState({
    email: false, password: false, signIn: false,
  });

  const handleChange = (field) => (event) => {
    setState({ ...state, [field]: event.target.value });
  };

  const handleSubmit = async (openSnackBar) => {
    setTouched({ ...state, signIn: true });
    const response = await callApi('/user/login', 'post', state);
    if (response.data) {
      setTouched({ ...state, signIn: false });
      localStorage.setItem('token', response.data.generated_token);
      routerProps.history.push('/add-trainee');
    } else {
      setTouched({ ...state, signIn: false });
      openSnackBar(response.message, 'error');
    }
  };

  const schema = yup.object().shape({
    email: yup.string().email('Enter valid Email').required('Email is a required field'),
    password: yup.string()
      .required('Password is a required field')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
  });

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const hasErrors = () => {
    try {
      schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  };

  const isTouched = () => {
    const { name, password, signIn } = touched;
    if (name || password) {
      if (signIn) {
        return false;
      }
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

  const classes = useStyles();

  return (
    <SnackBarContext.Consumer>
      {
        ({ openSnackBar }) => (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.logo}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5">
                Login
              </Typography>
              <form className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={!!getError('email')}
                  helperText={getError('email')}
                  onChange={handleChange('email')}
                  onBlur={() => handleBlur('email')}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={!!getError('password')}
                  helperText={getError('password')}
                  onChange={handleChange('password')}
                  onBlur={() => handleBlur('password')}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={(hasErrors()) || !isTouched()}
                  onClick={() => handleSubmit(openSnackBar)}
                >
                  {touched.signIn && <CircularProgress size={24} />}
                  Sign In
                </Button>
              </form>
            </div>
          </Container>
        )
      }
    </SnackBarContext.Consumer>
  );
};

export default Login;
