import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, withStyles, TablePagination, IconButton, Tooltip,
} from '@material-ui/core';
import {
  string, arrayOf, object, func, number,
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
    id, columns, data,
    count, rowsPerPage, page, onChangePage, actions,
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
          >
            <Typography>
              {
                // eslint-disable-next-line no-nested-ternary
                (column.format) ? (column.format(trainee[column.field]))
                  : (trainee[column.field] ? trainee[column.field]
                    : (actions.map((action, index) => (
                      <Tooltip title={action.title} arrow>
                        <IconButton
                          component="td"
                          key={`${trainee[id]}${index + 1}`}
                          onClick={() => action.handler(trainee)}
                        >
                          {action.icon}
                        </IconButton>
                      </Tooltip>
                    ))))
              }
            </Typography>
          </TableCell>
        ))}
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
  count: number.isRequired,
  page: number,
  rowsPerPage: number,
  onChangePage: func.isRequired,
  actions: arrayOf(object),
};

table.defaultProps = {
  page: 0,
  rowsPerPage: 15,
  actions: [{}],
  data: [{}],
};

export default table;
