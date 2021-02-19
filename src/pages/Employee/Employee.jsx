import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { AddDialog } from './components';
import { withLoaderAndMessage, Table } from '../../components';
import tableRecords from './data';

const Employee = () => {
  const [open, setOpen] = useState(false);

  const handleAddClickOpen = () => {
    setOpen(true);
  };

  const loading = false;
  const handleAddSubmit = (newEmployee) => {
    console.log(newEmployee);
  };

  const handleAddClose = () => {
    setOpen(false);
  };

  const EnhancedTable = withLoaderAndMessage(Table);

  const getLevels = () => {
    const levels = [];
    tableRecords.map((employee) => (
      levels.push({
        label: employee.role,
        field: 'name',
      })
    ));
    const uniqueLevels = [...new Map(levels.map((item) => [item.label, item])).values()];
    return uniqueLevels;
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<PersonAddIcon />}
        onClick={handleAddClickOpen}
        style={{ marginBottom: '20px' }}
      >
        Add Employee
      </Button>
      <AddDialog
        open={open}
        onClose={handleAddClose}
        onSubmit={(newEmployee) => handleAddSubmit(newEmployee)}
        loading={loading}
      />
      <EnhancedTable
        id="_id"
        data={tableRecords}
        columns={getLevels()}
        onSort={handleAddClickOpen}
        onSelect={handleAddClose}
        count={1}
        page={0}
        onChangePage={handleAddClose}
        rowsPerPage={5}
        loading={loading}
        dataCount={1}
        message="No Employees Found"
      />
    </>
  );
};

export default Employee;
