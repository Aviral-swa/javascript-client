import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Button, DialogContentText, CircularProgress, Typography,
  Table, TableBody, TableRow, TableCell, Checkbox,
} from '@material-ui/core';
import {
  array, bool, func, object,
} from 'prop-types';
import { styles } from './style';
import { permissionRes } from './constants';

const EditDialog = (props) => {
  const {
    open, onClose, onClickEdit, loadingData, defaultValue,
    loading, columns, handleCheckboxChange,
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
              defaultChecked={getDefaultValue(attrb, permission)}
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
            Change user permissions according to the attributes.
          </DialogContentText>
          <CircularProgress size={30} />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Change user permissions according to the attributes.
        </DialogContentText>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => onClickEdit(defaultValue.originalId)}
          color="primary"
          disabled={loading}
        >
          {loading && <CircularProgress size={24} />}
          Update Permissions
        </Button>
      </DialogActions>
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
};

EditDialog.defaultProps = {
  open: false,
  loading: false,
  loadingData: false,
  defaultValue: permissionRes,
  columns: ['create', 'read', 'update', 'delete'],
};

export default EditDialog;
