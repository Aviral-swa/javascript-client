import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, withStyles, TableSortLabel, TablePagination, IconButton,
} from '@material-ui/core';
import {
  string, arrayOf, object, func, number, array,
} from 'prop-types';

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
    id, columns, data, onSort, orderBy, order, onSelect,
    count, rowsPerPage, page, onChangePage, actions,
    userPermissions,
  } = props;
  const renderHeader = () => (
    columns.map((column) => (
      <StyledTableCell key={column.label} align={column.align}>
        <TableSortLabel
          active={orderBy === column.label}
          direction={order}
          onClick={() => onSort(column.label)}
        >
          <Typography>
            {column.label}
          </Typography>
        </TableSortLabel>
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
            onClick={() => onSelect(trainee)}
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
            userPermissions.includes(action.title)
              ? (
                <IconButton
                  component="td"
                  key={`${trainee[id]}${index + 1}`}
                  onClick={() => action.handler(trainee)}
                >
                  {action.icon}
                </IconButton>
              ) : null
          ))
        }
      </StyledTableRow>
    ))
  );

  const renderPagination = () => (
    <TablePagination
      rowsPerPageOptions={[]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={onChangePage}
    />
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
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
      {
        renderPagination()
      }
    </>
  );
};

table.propTypes = {
  id: string.isRequired,
  columns: arrayOf(object).isRequired,
  data: arrayOf(object),
  order: string,
  orderBy: string,
  onSort: func.isRequired,
  onSelect: func.isRequired,
  count: number.isRequired,
  page: number,
  rowsPerPage: number,
  onChangePage: func.isRequired,
  actions: arrayOf(object),
  userPermissions: array,
};

table.defaultProps = {
  order: 'asc',
  orderBy: '',
  page: 0,
  rowsPerPage: 5,
  actions: [{}],
  data: [{}],
  userPermissions: array,
};

export default table;
