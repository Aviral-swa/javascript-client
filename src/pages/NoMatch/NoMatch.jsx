import React from 'react';
import {
  Typography, makeStyles, Container, CssBaseline, Button,
} from '@material-ui/core';

const NoMatch = () => {
  const useStyles = makeStyles({
    background: {
      height: '100vh',
      background: '#030005',
    },
    code: {
      fontFamily: ['Montserrat', 'sans-serif'],
      top: '18%',
      left: '34%',
      position: 'absolute',
      fontSize: '224px',
      fontWeight: '900',
      color: '#030005',
      textTransform: 'uppercase',
      letterSpacing: '-20px',
      textShadow: '-1px -1px 0px #8400ff, 1px 1px 0px #ff005a',
    },
    message: {
      position: 'absolute',
      left: '29%',
      top: '44%',
      fontFamily: ['Montserrat', 'sans-serif'],
      fontSize: '40px',
      fontWeight: '700',
      color: '#fff',
      textTransform: 'uppercase',
      textShadow: '0px 2px 0px #8400ff',
      letterSpacing: '13px',
    },
    login: {
      position: 'absolute',
      top: '62%',
      left: '46.5%',
      fontFamily: ['Montserrat', 'sans-serif'],
      textTransform: 'uppercase',
      color: '#ff005a',
      fontSize: '14px',
      fontWeight: '700',
    },
  });

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.background}>
        <Container>
          <Typography className={classes.code}>
            404
          </Typography>
          <Typography className={classes.message}>
            Page not found
          </Typography>
          <Button color="primary" variant="outlined" href="/login" className={classes.login}>
            Login
          </Button>
        </Container>
      </div>
    </>
  );
};

export default NoMatch;
