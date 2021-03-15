import { makeStyles } from '@material-ui/core';

export const styles = makeStyles((theme) => ({
  permissionType: {
    paddingLeft: '25%',
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    display: 'flex',
  },
  actions: {
    marginRight: '20%',
    color: theme.palette.grey[600],
  },
}));
