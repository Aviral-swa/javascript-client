import React from 'react';
import { Typography, Link } from '@material-ui/core';

const Footer = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    Copyright &copy;
    <Link color="inherit" href="https://successive.tech">
      Successive Technologies
    </Link>
    {' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

export default Footer;
