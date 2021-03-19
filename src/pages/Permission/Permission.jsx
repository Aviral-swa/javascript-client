import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import DeleteIcon from '@material-ui/icons/Delete';
import { EnhancedTable, RemoveDialog, EditDialog } from './components';
import getAllTrainees from '../Trainee/query';
import GET_PERMISSION from './query';
import UPDATE_PERMISSION from './mutation';
import { DELETE_TRAINEE } from '../Trainee/mutation';
import { getExpTime } from '../../libs/utils/sessionVerify';
import { SnackBarContext } from '../../contexts';

const Permission = (routerProps) => {
  const [userId, setUserId] = useState('');
  const [userPermission, setUserPermission] = useState();
  const [checkDisabled, setCheckDisabled] = useState(true);
  const [openDialog, setOpenDialog] = useState({
    edit: false,
    delete: false,
  });
  const {
    data = {}, loading, refetch,
  } = useQuery(getAllTrainees, {
    variables: {
      skip: 0,
      limit: 0,
    },
    fetchPolicy: 'cache-and-network',
  });

  let listData;
  let totalDataCount;
  if (!loading && data) {
    try {
      const { data: { traineesList = [{}], total = 0 } = {} } = data.getAllTrainees;
      listData = traineesList;
      totalDataCount = total;
    } catch {
      listData = [];
    }
  }

  const { data: perData, loading: perLoad, refetch: fetch } = useQuery(GET_PERMISSION, {
    variables: { email: '' },
    fetchPolicy: 'network-only',
  });

  let permissionData;
  if (!perLoad && perData) {
    try {
      const { getPermission: { data: permissionDataa } } = perData;
      permissionData = permissionDataa;
    } catch {
      permissionData = {};
    }
  }
  const handleEditDialogOpen = (user) => {
    fetch();
    if (permissionData) {
      permissionData.forEach((element) => {
        if (element.email === user.email) {
          setUserPermission(element);
        }
      });
    }
    setOpenDialog({ ...openDialog, edit: true });
  };

  const [updatePermissions, { loading: loadingUpdate }] = useMutation(UPDATE_PERMISSION);

  const handleOnClickSave = async (id, openSnackBar) => {
    try {
      const response = await updatePermissions({
        variables: {
          originalId: id,
          resources: userPermission.resources,
        },
      });
      const { data: { updatePermission: { message, status } } } = response;
      if (status === 'success') {
        fetch();
        setOpenDialog({ ...openDialog, edit: false });
        setCheckDisabled(true);
        openSnackBar(message, status);
      } else {
        openSnackBar(message, 'error');
      }
    } catch (err) {
      openSnackBar(err.message, 'error');
    }
  };

  const createPermissionArray = (array, index) => {
    const permissionsArray = [...array];
    permissionsArray.splice(index, 1);
    return [...permissionsArray];
  };

  const handleOnclickCheck = (event, attrb) => {
    if (userPermission.resources[attrb].includes(event.target.value)) {
      const index = userPermission.resources[attrb].indexOf(event.target.value);
      if (index > -1) {
        setUserPermission({
          ...userPermission,
          resources: {
            ...userPermission.resources,
            [attrb]: createPermissionArray(userPermission.resources[attrb], index),
          },
        });
      }
    } else {
      setUserPermission({
        ...userPermission,
        resources: {
          ...userPermission.resources,
          [attrb]: [...userPermission.resources[attrb], event.target.value],
        },
      });
    }
  };

  const handleEditClose = () => {
    setOpenDialog({ ...openDialog, edit: false });
    setCheckDisabled(true);
  };

  const handleRemoveDialogOpen = (user) => {
    setOpenDialog({ ...openDialog, delete: true });
    setUserId(user.originalId);
  };

  const [deleteUser] = useMutation(DELETE_TRAINEE);

  const handleOnClickDelete = async (openSnackBar) => {
    try {
      const response = await deleteUser({
        variables: { id: userId },
      });
      const { data: { deleteTrainee: { message, status } } } = response;
      if (status === 'success') {
        refetch();
        setOpenDialog({ ...openDialog, delete: false });
        openSnackBar(message, status);
      } else {
        openSnackBar(message, 'error');
      }
    } catch (err) {
      openSnackBar(err.message, 'error');
    }
  };

  const handleDeleteClose = () => {
    setOpenDialog({ ...openDialog, delete: false });
  };

  const handleOnClickEdit = () => {
    setCheckDisabled(false);
  };

  useEffect(() => {
    const session = setTimeout(() => {
      localStorage.clear();
      alert('Session expired');
      routerProps.history.push('/login');
    }, getExpTime());
    return () => {
      clearTimeout(session);
    };
  }, []);
  const currentUser = localStorage.getItem('user');
  let currentUserPermissions;
  if (permissionData) {
    permissionData.forEach((element) => {
      if (element.email === currentUser) {
        currentUserPermissions = element.resources;
      }
    });
  }
  return (
    <SnackBarContext.Consumer>
      {
        ({ openSnackBar }) => (
          <>
            <EnhancedTable
              id="originalId"
              data={listData}
              columns={[{
                field: 'name',
                label: 'Name',
              },
              {
                field: 'email',
                label: 'Email',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'role',
                label: 'Group',
                align: 'right',
                format: (value) => value && value.toUpperCase(),
              },
              ]}
              actions={[
                {
                  icon: <DeleteIcon />,
                  handler: handleRemoveDialogOpen,
                  title: 'delete',
                },
              ]}
              loading={loading}
              dataCount={totalDataCount}
              userPermissions={currentUserPermissions}
              editOpen={handleEditDialogOpen}
            />
            <EditDialog
              open={openDialog.edit}
              onClose={handleEditClose}
              onClickSave={(id) => handleOnClickSave(id, openSnackBar)}
              defaultValue={userPermission}
              loadingData={perLoad}
              loading={loadingUpdate}
              columns={['create', 'read', 'update', 'delete']}
              handleCheckboxChange={handleOnclickCheck}
              onClickEdit={handleOnClickEdit}
              isDisabled={checkDisabled}
              currentUserPermissions={currentUserPermissions?.permissions}
            />
            <RemoveDialog
              open={openDialog.delete}
              onClose={handleDeleteClose}
              onClickDelete={() => handleOnClickDelete(openSnackBar)}
              loading={loading}
            />
          </>
        )
      }
    </SnackBarContext.Consumer>
  );
};

export default Permission;
