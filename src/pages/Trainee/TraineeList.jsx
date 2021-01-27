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
    loadTable: true,
    loadAdd: false,
    loadEdit: false,
    loadDelete: false,
  });
  const [traineesData, setTraineesData] = useState({
    dataCount: 0,
    traineeData: [],
  });
  const [countPageData, setCountPageData] = useState(0);

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

  const { data, loading, refetch } = useQuery(getAllTrainees, {
    variables: {
      skip: page * 5,
      limit: 5,
    },
  });

  const getTrainees = () => {
    if (!loading) {
      if (data) {
        const { data: { traineesList, total, showing } } = data.getAllTrainees;
        setTraineesData({ ...traineesData, dataCount: total, traineeData: traineesList });
        setCountPageData(showing);
        setLoading({ ...loadingSpin, loadTable: false });
      }
    } else {
      setLoading({ ...loadingSpin, loadTable: true });
    }
  };

  const [addTrainee] = useMutation(CREATE_TRAINEE);

  const handleSumbit = async (openSnackBar, state) => {
    setLoading({ ...loadingSpin, loadAdd: true });
    try {
      const response = await addTrainee({
        variables: { name: state.name, email: state.email, password: state.password },
      });
      const { data: { createTrainee: { message, status } } } = response;
      if (status) {
        setLoading({ ...loadingSpin, loadAdd: false });
        openSnackBar(message, status);
        setOpen({ ...open, open: false });
        refetch();
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

  const handleOnClickEdit = async (openSnackBar, value) => {
    setLoading({ ...loadingSpin, loadEdit: true });
    try {
      const response = await editTrainee({
        variables: { id: prefill.id, name: value.Name, email: value.Email },
      });
      const { data: { updateTrainee: { message, status } } } = response;
      if (status) {
        setLoading({ ...loadingSpin, loadEdit: false });
        openSnackBar(message, status);
        setOpen({ ...open, editOpen: false });
        refetch();
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
        if (status) {
          setLoading({ ...loadingSpin, loadDelete: false });
          refetch();
          if (page > 0) {
            if (countPageData === 1) {
              const currentPage = page;
              const newPage = currentPage - 1;
              setPage(newPage);
            }
            setOpen({ ...open, deleteOpen: false });
            openSnackBar(message, status);
          }
          if (page === 0) {
            openSnackBar(message, status);
            setOpen({ ...open, deleteOpen: false });
          }
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
    getTrainees();
  }, [page, data]);

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
            >
              Add Trainee
            </Button>
            <EnhancedTable
              id="originalId"
              data={traineesData.traineeData}
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
              count={traineesData.dataCount}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={5}
              loading={loadingSpin.loadTable}
              dataCount={traineesData.dataCount}
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
