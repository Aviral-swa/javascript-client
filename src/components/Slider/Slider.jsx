import {
  array, bool, number, string,
} from 'prop-types';
import React, { useState, useEffect } from 'react';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils';
import { Img } from './style';
import { DEFAULT_BANNER_IMAGE, total } from '../../configs/constants';

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
    index = getRandomNumber(total);
  } else {
    index = getNextRoundRobin(total, count);
  }
  const bannerImage = banners[index];
  return (
    <>
      <Img
        src={bannerImage || defaultBanner}
        alt={altText}
        height={height}
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
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,

};

export default Slider;
