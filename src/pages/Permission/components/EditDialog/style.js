import { makeStyles } from '@material-ui/core';

export const styles = makeStyles((theme) => ({
  permissionType: {
    paddingLeft: '26%',
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    display: 'flex',
    paddingBottom: '8px',
  },
  actions: {
    marginRight: '22%',
    color: theme.palette.grey[600],
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
