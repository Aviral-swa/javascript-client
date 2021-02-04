/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { bool, number } from 'prop-types';

const withLoaderAndMessage = (WrappedComponent) => {
  const WithLoaderAndMessage = (props) => {
    const { loading, dataCount, ...rest } = props;
    if (loading) {
      return (
        <CircularProgress size={50} />
      );
    }
    if (!dataCount) {
      return (
        <Typography variant="h3">
          OOPS!, No Trainees Found
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
  };

  WithLoaderAndMessage.defaultProps = {
    dataCount: 0,
  };

  return WithLoaderAndMessage;
};
export default withLoaderAndMessage;
