import { makeStyles } from '@material-ui/core';

export const styles = makeStyles((theme) => ({
  title: {
    border: `2px solid ${theme.palette.primary.light}`,
    display: 'inline-block',
    padding: '5px',
    margin: theme.spacing(4, 0, 2),
  },
}));
