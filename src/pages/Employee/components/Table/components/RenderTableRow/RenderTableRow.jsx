import React from 'react';
import {
  Table, TableBody, TableRow, TableCell, Typography,
  makeStyles,
} from '@material-ui/core';
import * as propTypes from 'prop-types';

const RenderTableRow = (props) => {
  const { treeData } = props;
  const styles = makeStyles(() => ({
    tableRow: {
      border: '1px solid black',
    },
    tableCell: {
      border: 'none', padding: '10px', width: '100px',
    },
  }));
  const style = styles();
  return (
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
                { node.children && <RenderTableRow treeData={node.children} /> }
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  );
};

RenderTableRow.propTypes = {
  treeData: propTypes.arrayOf(propTypes.object),
};

RenderTableRow.defaultProps = {
  treeData: [{}],
};

export default RenderTableRow;
