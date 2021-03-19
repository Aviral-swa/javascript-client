import React from 'react';
import {
  Table, TableBody, TableContainer, TableRow,
  Paper, TableCell, Typography, makeStyles,
} from '@material-ui/core';
import { arrayOf, object, string } from 'prop-types';
import { parseTreeData } from './helper';
import { RenderTableRow } from './components';

const EmployeeTable = (props) => {
  const {
    data, columns,
  } = props;
  const tree = parseTreeData(data);

  const numberOfLevels = (1000 / columns.length);

  const styles = makeStyles(() => ({
    header: {
      marginRight: `${numberOfLevels}px`,
    },
  }));
  const style = styles();

  const renderHeader = () => (
    columns.map((column) => (
      <TableCell>
        <Typography className={style.header}>
          {column.toUpperCase()}
        </Typography>
      </TableCell>
    ))
  );

  return (
    <>
      {renderHeader()}
      <TableContainer id="container" component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <RenderTableRow treeData={tree} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

EmployeeTable.propTypes = {
  columns: arrayOf(string),
  data: arrayOf(object),
};

EmployeeTable.defaultProps = {
  data: [{}],
  columns: [''],
};

export default EmployeeTable;
