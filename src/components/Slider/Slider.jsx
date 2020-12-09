import {
  array, bool, number, string,
} from 'prop-types';
import React, { useState, useEffect } from 'react';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils';
import styleSheet from './style';

const Slider = (props) => {
  const [count, setCount] = useState(0);
  const {
    altText, banners, height, random, defaultBanner, duration,
  } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCount = count + 1;
      setCount(updatedCount);
    }, duration);
    return () => clearInterval(interval);
  }, [count]);
  let index;
  if (random) {
    index = getRandomNumber(5);
  } else {
    index = getNextRoundRobin(5, count);
  }
  const bannerImage = banners[index];
  return (
    <>
      <img
        src={bannerImage || defaultBanner}
        alt={altText}
        height={height}
        style={styleSheet.images}
      />
    </>
  );
};

Slider.propTypes = {
  altText: string,
  banners: array.isRequired,
  defaultBanner: string,
  duration: number,
  height: number,
  random: bool,

};

Slider.defaultProps = {
  altText: 'Default Banner',
  defaultBanner: './images/default.png',
  duration: 2000,
  height: 200,
  random: false,

};

export default Slider;
