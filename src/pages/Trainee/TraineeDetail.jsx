import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Paper, makeStyles, Typography, Button,
} from '@material-ui/core';
import trainees from './data/trainee';
import { NoMatch } from '../NoMatch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    padding: '5px',
    '& > *': {
      margin: theme.spacing(1),
      height: theme.spacing(18),
    },
  },
  image: {
    position: 'relative',
    top: '63px',
    background: 'grey',
    padding: '60px 60px',
    margin: '1px',
  },
  content: {
    margin: '6px',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const TraineeDetail = (props) => {
  const { routerProps: { match: { params: { id } }, history: { goBack } } } = props;
  const trainee = trainees.find((traineeObj) => traineeObj.id === id);
  if (!trainee) {
    return <NoMatch />;
  }

  const getDate = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Paper fullWidth elevation={3} className={classes.container}>
          <div>
            <img className={classes.image} alt="Thumbnail" />
          </div>
          <div className={classes.content}>
            <Typography variant="h5">
              {trainee.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {getDate(trainee.createdAt)}
            </Typography>
            <Typography variant="body2">
              {trainee.email}
            </Typography>
          </div>
        </Paper>
      </div>
      <Button className={classes.button} variant="outlined" size="large" onClick={() => goBack()}>
        Back
      </Button>
    </>
  );
};

TraineeDetail.propTypes = {
  routerProps: PropTypes.object.isRequired,
};

export default TraineeDetail;
