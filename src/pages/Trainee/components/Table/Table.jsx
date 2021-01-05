import React from 'react';
import {
  makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
} from '@material-ui/core';
import { string, arrayOf, object } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  table: {
    width: theme.spacing(168),
  },
}));

const table = (props) => {
  const classes = useStyles();
  const { id, columns, data } = props;

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((obj) => (
              <TableCell key={obj.label} align={obj.align}>
                <Typography color="textSecondary">
                  {obj.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((trainee) => (
            <TableRow key={trainee[id]}>
              { columns.map((obj) => (
                <TableCell key={`${trainee[id]}${obj.field}`} align={obj.align}>
                  <Typography>
                    {trainee[obj.field]}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

table.propTypes = {
  id: string.isRequired,
  columns: arrayOf(object).isRequired,
  data: arrayOf(object).isRequired,
};

export default table;
