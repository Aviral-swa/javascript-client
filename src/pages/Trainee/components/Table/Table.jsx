import React from 'react';
import {
  makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, withStyles, TableSortLabel,
} from '@material-ui/core';
import {
  string, arrayOf, object, func,
} from 'prop-types';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.common.white,
  },
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

const useStyles = makeStyles((theme) => ({
  table: {
    width: theme.spacing(165),
  },
}));

const table = (props) => {
  const classes = useStyles();
  const {
    id, columns, data, onSort, orderBy, order, onSelect,
  } = props;

  const renderHeader = (Columns) => (
    Columns.map((column) => (
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

  const renderTableRow = (Columns, Data, Id) => (
    Data.map((trainee) => (
      <StyledTableRow key={trainee[Id]} onClick={() => onSelect(trainee)}>
        { Columns.map((column) => (
          <TableCell key={`${trainee[Id]}${column.field}`} align={column.align}>
            <Typography>
              {
                (column.format) ? (column.format(trainee[column.field]))
                  : (trainee[column.field])
              }
            </Typography>
          </TableCell>
        ))}
      </StyledTableRow>
    ))
  );

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            {renderHeader(columns)}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTableRow(columns, data, id)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

table.propTypes = {
  id: string.isRequired,
  columns: arrayOf(object).isRequired,
  data: arrayOf(object).isRequired,
  order: string,
  orderBy: string,
  onSort: func.isRequired,
  onSelect: func.isRequired,
};

table.defaultProps = {
  order: 'asc',
  orderBy: '',
};

export default table;
