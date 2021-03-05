import React from 'react';
import {
  Table, TableBody, TableContainer, TableRow,
  Paper, TableCell, Typography, makeStyles,
} from '@material-ui/core';
import { arrayOf, object, string } from 'prop-types';

const EmployeeTable = (props) => {
  const {
    data, columns,
  } = props;
  const record = data.map((ele) => (
    { ...ele }
  ));

  const numberOfLevels = (1000 / columns.length);

  const useStyles = makeStyles(() => ({
    header: {
      marginRight: `${numberOfLevels}px`,
    },
    tableRow: {
      border: '1px solid black',
    },
    tableCell: {
      border: 'none', padding: '10px', width: '100px',
    },
  }));
  const style = useStyles();

  const renderHeader = () => (
    columns.map((column) => (
      <TableCell>
        <Typography className={style.header}>
          {column.toUpperCase()}
        </Typography>
      </TableCell>
    ))
  );

  const tree = [];

  record.forEach((node) => {
    if (!node.parent) return tree.push(node);

    const parentIndex = record.findIndex((el) => el.name === node.parent);
    if (!record[parentIndex].children) {
      // eslint-disable-next-line no-return-assign
      return record[parentIndex].children = [node];
    }

    return record[parentIndex].children.push(node);
  });

  const renderTableRow = (treeData) => (
    <Table>
      <TableBody>
        { treeData.map((node) => (
          <>
            <TableRow className={style.tableRow}>
              <TableCell className={style.tableCell}>
                <Typography>
                  {node.name}
                </Typography>
              </TableCell>
              <TableCell className={style.tableCell}>
                { node.children && renderTableRow(node.children) }
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
      {renderHeader()}
      <TableContainer id="container" component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              {renderTableRow(tree)}
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
