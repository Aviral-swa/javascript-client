/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography, CircularProgress, makeStyles } from '@material-ui/core';
import { bool, number, string } from 'prop-types';

const useStyles = makeStyles(() => ({
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
const withLoaderAndMessage = (WrappedComponent) => {
  const WithLoaderAndMessage = (props) => {
    const {
      loading, dataCount, message, ...rest
    } = props;
    const style = useStyles();
    if (loading) {
      return (
        <CircularProgress className={style.spinner} size={50} />
      );
    }
    if (!dataCount) {
      return (
        <Typography variant="h3" align="center">
          { message }
        </Typography>
      );
    }
    return (
      <WrappedComponent {...rest} />
    );
  };

  WithLoaderAndMessage.propTypes = {
    loading: bool.isRequired,
    dataCount: number,
    message: string,
  };

  WithLoaderAndMessage.defaultProps = {
    dataCount: 0,
    message: 'No data found',
  };

  return WithLoaderAndMessage;
};
export default withLoaderAndMessage;
