import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/client';
import {
  AddDialog, Table, EditDialog, RemoveDialog,
} from './components';
import { SnackBarContext } from '../../contexts';
import { withLoaderAndMessage } from '../../components';
import getAllTrainees from './query';
import { CREATE_TRAINEE, EDIT_TRAINEE, DELETE_TRAINEE } from './mutation';
import { UPDATE_TRAINEE, TRAINEE_DELETED, TRAINEE_ADDED } from './subscription';
import { getExpTime } from '../../libs/utils/sessionVerify';

const TraineeList = (routerProps) => {
  const [open, setOpen] = useState({
    open: false,
    editOpen: false,
    deleteOpen: false,
  });
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();
  const [page, setPage] = useState(0);
  const [deleted, setDeleted] = useState(0);
  const [prefill, setPrefill] = useState({
    name: '',
    email: '',
    id: '',
  });
  const [loadingSpin, setLoading] = useState({
    loadAdd: false,
    loadEdit: false,
    loadDelete: false,
  });

  const EnhancedTable = withLoaderAndMessage(Table);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelect = (trainee) => {
    routerProps.history.push(`/add-trainee/${trainee.originalId}`);
    localStorage.setItem('trainees', JSON.stringify(trainee));
  };

  const handleClickOpen = () => {
    setOpen({ ...open, open: true });
  };

  const {
    data = {}, loading, subscribeToMore,
  } = useQuery(getAllTrainees, {
    variables: {
      skip: page * 5,
      limit: 5,
    },
    fetchPolicy: 'cache-and-network',
  });
  let tableRecords;
  let totalData;
  if (!loading && data) {
    try {
      const { data: { traineesList = [{}], total = 0 } = {} } = data.getAllTrainees;
      tableRecords = traineesList;
      totalData = total;
    } catch {
      tableRecords = [];
      totalData = 0;
    }
  }

  useEffect(() => {
    subscribeToMore({
      document: TRAINEE_ADDED,
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData) return previous;
        const { traineeAdded: { data: addedTrainee } } = subscriptionData.data;
        const { data: { traineesList = [{}] } = {} } = previous.getAllTrainees;
        let updatedList;
        if (traineesList) {
          updatedList = [
            addedTrainee,
            ...traineesList,
          ];
        }
        return {
          getAllTrainees: {
            ...previous.getAllTrainees,
            data: {
              total: previous.getAllTrainees.data.total + 1,
              traineesList: updatedList,
            },
          },
        };
      },
    });
    subscribeToMore({
      document: UPDATE_TRAINEE,
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData) return previous;
        const { data: { traineesList } } = previous.getAllTrainees;
        const { traineeUpdated: { data: records } } = subscriptionData.data;
        const updatedList = [...traineesList].map((trainee) => {
          if (trainee.originalId === records.originalId) {
            return {
              ...trainee,
              ...records,
            };
          }
          return trainee;
        });
        return {
          getAllTrainees: {
            ...previous.getAllTrainees,
            data: {
              traineesList: updatedList,
            },
          },
        };
      },
    });
    subscribeToMore({
      document: TRAINEE_DELETED,
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData) return previous;
        const { data: { traineesList } } = previous.getAllTrainees;
        const { traineeDeleted: { data: deletedTrainee } } = subscriptionData.data;
        const updatedList = [...traineesList].filter((trainee) => (
          trainee.originalId !== deletedTrainee
        ));
        return {
          getAllTrainees: {
            ...previous.getAllTrainees,
            data: {
              total: previous.getAllTrainees.data.total - 1,
              traineesList: updatedList,
            },
          },
        };
      },
    });
  }, []);

  const [addTrainee] = useMutation(CREATE_TRAINEE);

  const handleSumbit = async (openSnackBar, traineeToAdd) => {
    setLoading({ ...loadingSpin, loadAdd: true });
    try {
      const response = await addTrainee({
        variables:
        { name: traineeToAdd.name, email: traineeToAdd.email, password: traineeToAdd.password },
      });
      const { data: { createTrainee: { message, status } } } = response;
      if (status === 'success') {
        setLoading({ ...loadingSpin, loadAdd: false });
        openSnackBar(message, status);
        setOpen({ ...open, open: false });
      } else {
        setLoading({ ...loadingSpin, loadAdd: false });
        openSnackBar(message, 'error');
      }
    } catch (err) {
      setLoading({ ...loadingSpin, loadAdd: false });
      openSnackBar(err.message, 'error');
    }
  };

  const handleClose = () => {
    setOpen({ ...open, open: false });
    setLoading({ ...loadingSpin, loadAdd: false });
  };

  const handleEditDialogOpen = (traineeData) => {
    setOpen({ ...open, editOpen: true });
    setPrefill(
      {
        ...prefill,
        name: [traineeData.name],
        email: [traineeData.email],
        id: traineeData.originalId,
      },
    );
  };

  const handleRemoveDialogOpen = (traineeData) => {
    setOpen({ ...open, deleteOpen: true });
    setDeleted(traineeData);
  };

  const handleEditClose = () => {
    setOpen({ ...open, editOpen: false });
  };

  const handleDeleteClose = () => {
    setOpen({ ...open, deleteOpen: false });
  };

  const [editTrainee] = useMutation(EDIT_TRAINEE);

  const handleOnClickEdit = async (openSnackBar, traineeToUpdate) => {
    setLoading({ ...loadingSpin, loadEdit: true });
    try {
      const response = await editTrainee({
        variables: { id: prefill.id, name: traineeToUpdate.Name, email: traineeToUpdate.Email },
      });
      const { data: { updateTrainee: { message, status } } } = response;
      if (status === 'success') {
        setLoading({ ...loadingSpin, loadEdit: false });
        openSnackBar(message, status);
        setOpen({ ...open, editOpen: false });
      } else {
        setLoading({ ...loadingSpin, loadEdit: false });
        openSnackBar(message, 'error');
      }
    } catch (err) {
      setLoading({ ...loadingSpin, loadEdit: false });
      openSnackBar(err.message, 'error');
    }
  };

  const [deleteTrainee] = useMutation(DELETE_TRAINEE);

  const handleOnClickDelete = async (openSnackBar) => {
    setLoading({ ...loadingSpin, loadDelete: true });
    if (deleted.createdAt >= '2019-02-14') {
      try {
        const response = await deleteTrainee({
          variables: { id: deleted.originalId },
        });
        const { data: { deleteTrainee: { message, status } } } = response;
        if (status === 'success') {
          setLoading({ ...loadingSpin, loadDelete: false });
          if (page > 0 && tableRecords.length === 1) {
            setPage(page - 1);
          }
          setOpen({ ...open, deleteOpen: false });
          openSnackBar(message, status);
        } else {
          setLoading({ ...loadingSpin, loadDelete: false });
          openSnackBar(message, 'error');
        }
      } catch (err) {
        setLoading({ ...loadingSpin, loadDelete: false });
        openSnackBar(err.message, 'error');
      }
    } else {
      setLoading({ ...loadingSpin, loadDelete: false });
      openSnackBar('Cannot delete trainee', 'error');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

  const getDate = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
  return (
    <SnackBarContext.Consumer>
      {
        ({ openSnackBar }) => (
          <div>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PersonAddIcon />}
              onClick={handleClickOpen}
              style={{ marginBottom: '20px' }}
            >
              Add Trainee
            </Button>
            <EnhancedTable
              id="originalId"
              data={tableRecords}
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
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: getDate,
              },
              ]}
              actions={[
                {
                  icon: <EditIcon />,
                  handler: handleEditDialogOpen,
                },
                {
                  icon: <DeleteIcon />,
                  handler: handleRemoveDialogOpen,
                },
              ]}
              order={order}
              orderBy={orderBy}
              onSort={handleSort}
              onSelect={handleSelect}
              count={totalData}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={5}
              loading={loading}
              dataCount={totalData}
            />
            <AddDialog
              open={open.open}
              onClose={handleClose}
              onSubmit={(state) => handleSumbit(openSnackBar, state)}
              loading={loadingSpin.loadAdd}
            />
            <EditDialog
              open={open.editOpen}
              onClose={handleEditClose}
              onClickEdit={(value) => handleOnClickEdit(openSnackBar, value)}
              defaultValue={prefill}
              loading={loadingSpin.loadEdit}
            />
            <RemoveDialog
              open={open.deleteOpen}
              onClose={handleDeleteClose}
              onClickDelete={() => handleOnClickDelete(openSnackBar)}
              loading={loadingSpin.loadDelete}
            />
          </div>
        )
      }
    </SnackBarContext.Consumer>
  );
};

export default TraineeList;
