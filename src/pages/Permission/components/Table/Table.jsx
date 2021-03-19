import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, withStyles, IconButton, Container,
} from '@material-ui/core';
import {
  string, arrayOf, object, func,
} from 'prop-types';
import { permissionRes } from '../EditDialog/constants';

const StyledTableCell = withStyles(() => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
      cursor: 'pointer',
    },
  },
}))(TableRow);

const table = (props) => {
  const {
    id, columns, data, actions,
    userPermissions, editOpen,
  } = props;
  const renderHeader = () => (
    columns.map((column) => (
      <StyledTableCell key={column.label} align={column.align}>
        <Typography style={{ fontWeight: 500, color: 'rgb(20, 72, 196)' }}>
          {column.label}
        </Typography>
      </StyledTableCell>
    ))
  );

  const renderTableRow = () => (
    data.map((trainee) => (
      <StyledTableRow key={trainee[id]}>
        { columns.map((column) => (
          <TableCell
            key={`${trainee[id]}${column.field}`}
            align={column.align}
            style={{ padding: '8px' }}
            onClick={() => editOpen(trainee)}
          >
            <Typography>
              {
                (column.format) ? (column.format(trainee[column.field]))
                  : (trainee[column.field])
              }
            </Typography>
          </TableCell>
        ))}
        {
          actions.map((action, index) => (
            userPermissions.permissions.includes(action.title)
              ? (
                <IconButton
                  component="td"
                  key={`${trainee[id]}${index + 1}`}
                  onClick={() => action.handler(trainee)}
                >
                  {action.icon}
                </IconButton>
              )
              : null
          ))
        }
      </StyledTableRow>
    ))
  );

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {renderHeader()}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableRow()}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

table.propTypes = {
  id: string.isRequired,
  columns: arrayOf(object).isRequired,
  data: arrayOf(object),
  actions: arrayOf(object),
  userPermissions: object,
  editOpen: func.isRequired,
};

table.defaultProps = {
  actions: [{}],
  data: [{}],
  userPermissions: permissionRes.resources,
};

export default table;
