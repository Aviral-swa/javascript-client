import React from 'react';
import {
  Table, TableBody, TableContainer, TableHead, TableRow,
  Paper, TableCell, Typography,
} from '@material-ui/core';
import { arrayOf, object } from 'prop-types';

const EmployeeTable = (props) => {
  const {
    data, columns,
  } = props;
  const record = data.map((ele) => (
    { ...ele }
  ));

  const renderHeader = () => (
    columns.map((column) => (
      <TableCell>
        <Typography>
          {column.label.toUpperCase()}
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
            <TableRow>
              <TableCell>
                <Typography>
                  {node.name}
                </Typography>
              </TableCell>
              <TableCell>
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {renderHeader()}
            </TableRow>
          </TableHead>
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
  columns: arrayOf(object),
  data: arrayOf(object),
};

EmployeeTable.defaultProps = {
  data: [{}],
  columns: [{}],
};

export default EmployeeTable;
