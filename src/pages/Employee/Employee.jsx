import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { AddDialog, EnhancedTable } from './components';
import GET_EMPLOYEES from './query';
import GET_PERMISSION from '../Permission/query';
import CREATE_EMPLOYEE from './mutation';
import { SnackBarContext } from '../../contexts';
import constants from './constants';

const Employee = () => {
  const [open, setOpen] = useState(false);
  const [addButtonShow, setAddButtonShow] = useState(false);

  const {
    data, loading, refetch,
  } = useQuery(GET_EMPLOYEES);
  let tableRecord;
  if (!loading && data) {
    tableRecord = data.getEmployees;
  }

  const [addEmployee] = useMutation(CREATE_EMPLOYEE);

  const handleAddClickOpen = () => {
    setOpen(true);
  };
  const handleAddSubmit = async (newEmployee, openSnackBar) => {
    try {
      const response = await addEmployee({
        variables:
        { name: newEmployee.name, role: newEmployee.role, parent: newEmployee.parent },
      });
      const { data: { createEmployee: { message } } } = response;
      if (message) {
        openSnackBar(message, constants.ERROR);
      } else {
        refetch();
        setOpen(false);
        openSnackBar(constants.ADDED_SUCCESSFULLY, constants.SUCCESS);
      }
    } catch (error) {
      openSnackBar(constants.CANNOT_ADD_EMPLOYEE, constants.ERROR);
      console.log(error);
    }
  };

  const handleAddClose = () => {
    setOpen(false);
  };

  const getLevels = () => {
    const levels = [];
    if (!loading && tableRecord) {
      tableRecord.forEach((employee) => (
        levels.push(employee.role)
      ));
    }
    return [...new Set(levels)];
  };

  const { data: permissiondata, loading: loadingPermissions } = useQuery(GET_PERMISSION,
    {
      variables: { email: '' },
    });

  const isAuth = () => {
    if (!loadingPermissions && permissiondata) {
      const { getPermission: { data: permissions = [] } } = permissiondata;
      permissions.forEach((element) => {
        const userEmail = localStorage.getItem('user');
        if (element.email === userEmail) {
          const { resources: { employee = [] } = {} } = element;
          setAddButtonShow(!!employee.includes('create'));
        }
      });
    }
  };

  useEffect(() => {
    isAuth();
  }, [permissiondata]);

  return (
    <SnackBarContext.Consumer>
      {
        ({ openSnackBar }) => (
          <>
            {
              addButtonShow
                ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    onClick={handleAddClickOpen}
                    style={{ marginBottom: '20px' }}
                  >
                    Add Employee
                  </Button>
                )
                : null
            }
            <AddDialog
              open={open}
              onClose={handleAddClose}
              onSubmit={(newEmployee) => handleAddSubmit(newEmployee, openSnackBar)}
              loading={loading}
            />
            <EnhancedTable
              data={tableRecord}
              columns={getLevels()}
              loading={loading}
              dataCount={(!loading && tableRecord) && tableRecord.length}
              message={constants.NOT_FOUND}
            />
          </>
        )
      }
    </SnackBarContext.Consumer>
  );
};

export default Employee;
