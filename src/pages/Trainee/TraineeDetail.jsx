import React from 'react';
import moment from 'moment';
import {
  Paper, makeStyles, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: theme.spacing(20),
    },
  },
}));

const TraineeDetail = (trainee) => {
  const getDate = () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div>
          <Typography variant="body1">
            Thumbnail
          </Typography>
        </div>
        <div>
          <Typography variant="h5">
            {trainee.name}
          </Typography>
          <Typography variant="body2">
            {getDate()}
          </Typography>
          <Typography variant="caption">
            {trainee.email}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default TraineeDetail;
