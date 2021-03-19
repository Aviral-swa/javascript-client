import React from 'react';
import {
  Dialog, DialogContent, DialogTitle,
  Button, DialogContentText, CircularProgress, Typography,
  Table, TableBody, TableRow, TableCell, Checkbox, Slide,
  AppBar, Toolbar, IconButton, TableContainer, Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  array, bool, func, object,
} from 'prop-types';
import { styles } from './style';
import { permissionRes } from './constants';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const EditDialog = (props) => {
  const {
    open, onClose, onClickEdit, loadingData, defaultValue,
    loading, columns, handleCheckboxChange, onClickSave,
    isDisabled, currentUserPermissions,
  } = props;

  const getDefaultValue = (attrb, permission) => {
    if (!defaultValue) return false;
    if (defaultValue.resources[attrb].includes(permission)) return true;
    return false;
  };
  const getModules = () => {
    if (!defaultValue) return Object.keys(permissionRes.resources);
    const resources = Object.keys(defaultValue.resources);
    return resources;
  };

  const renderTableRow = () => (
    getModules().map((attrb, index) => (
      <TableRow key={attrb}>
        <TableCell
          key={`${attrb}${index + 1}`}
          style={{ padding: '8px' }}
        >
          <Typography>
            {attrb}
          </Typography>
        </TableCell>
        { columns.map((permission, idx) => (
          <TableCell key={`${permission}${idx + 1}`}>
            <Checkbox
              checked={getDefaultValue(attrb, permission)}
              disabled={isDisabled}
              value={permission}
              onChange={(event) => handleCheckboxChange(event, attrb)}
            />
          </TableCell>
        ))}
      </TableRow>
    ))
  );

  const style = styles();
  if (loadingData) {
    return (
      <Dialog fullWidth maxWidth="md" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6" component="p">
              {defaultValue.email}
              {' '}
              permissions
            </Typography>
          </DialogContentText>
          <CircularProgress size={30} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar className={style.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={style.title}>
            Update
          </Typography>
          {
            currentUserPermissions.includes('update')
              ? (
                <>
                  <Button color="inherit" onClick={() => onClickEdit()}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => onClickSave(defaultValue.originalId)}
                    color="secondary"
                    disabled={loading}
                  >
                    save
                  </Button>
                </>
              ) : null
          }
        </Toolbar>
      </AppBar>
      <DialogContent>
        <DialogContentText>
          <Typography variant="h6" color="textPrimary">
            Permissisons for
            {' '}
            {defaultValue.email}
          </Typography>
        </DialogContentText>
        <TableContainer component={Paper}>
          <div className={style.permissionType}>
            { columns.map((column) => (
              <Typography className={style.actions}>
                {column}
              </Typography>
            ))}
          </div>
          <Table size="small">
            <TableBody>
              {renderTableRow()}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

EditDialog.propTypes = {
  open: bool,
  onClose: func.isRequired,
  onClickEdit: func.isRequired,
  loading: bool,
  loadingData: bool,
  defaultValue: object,
  columns: array,
  handleCheckboxChange: func.isRequired,
  onClickSave: func.isRequired,
  isDisabled: bool,
  currentUserPermissions: array,
};

EditDialog.defaultProps = {
  open: false,
  loading: false,
  loadingData: false,
  defaultValue: permissionRes,
  columns: ['create', 'read', 'update', 'delete'],
  isDisabled: true,
  currentUserPermissions: [],
};

export default EditDialog;
