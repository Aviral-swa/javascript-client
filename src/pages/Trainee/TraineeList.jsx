import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import {
  AddDialog, Table, EditDialog, RemoveDialog,
} from './components';
import { SnackBarContext } from '../../contexts';
import { callApi } from '../../libs/utils';
import { withLoaderAndMessage } from '../../components';

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
  const [loading, setLoading] = useState({
    loadTable: true,
    loadAdd: false,
    loadEdit: false,
    loadDelete: false,
  });
  const [traineesData, setTraineesData] = useState({
    dataCount: 0,
    traineeData: [],
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

  const getTrainees = async () => {
    const query = {
      skip: page * 5,
      limit: 5,
    };
    const trainees = await callApi('/trainee', 'get', query);
    if (trainees.data) {
      const { data: { traineesList, total } } = trainees;
      setTraineesData({ dataCount: total, traineeData: traineesList });
      setLoading({ ...loading, loadTable: false });
    } else {
      setLoading({ ...loading, loadTable: false });
    }
  };

  const handleSumbit = async (openSnackBar, state) => {
    setLoading({ ...loading, loadAdd: true });
    const response = await callApi('/trainee', 'post', state);
    if (response.data) {
      setLoading({ ...loading, loadAdd: false });
      openSnackBar(response.message, response.status);
      setOpen({ ...open, open: false });
      getTrainees();
    } else {
      setLoading({ ...loading, loadAdd: false });
      openSnackBar(response.message, response.status);
    }
  };

  const handleClose = () => {
    setOpen({ ...open, open: false });
    setLoading({ ...loading, loadAdd: false });
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

  const handleOnClickEdit = async (openSnackBar, value) => {
    setLoading({ ...loading, loadEdit: true });
    const dataToUpdate = {
      originalId: prefill.id,
      dataToUpdate: {
        name: value.Name,
        email: value.Email,
      },
    };
    const response = await callApi('/trainee', 'put', dataToUpdate);
    if (response.data) {
      setLoading({ ...loading, loadEdit: false });
      openSnackBar(response.message, response.status);
      setOpen({ ...open, editOpen: false });
      getTrainees();
    } else {
      setLoading({ ...loading, loadEdit: false });
      openSnackBar(response.message, response.status);
    }
  };

  const handleOnClickDelete = async (openSnackBar) => {
    setLoading({ ...loading, loadDelete: true });
    const response = await callApi(`/trainee/${deleted.originalId}`, 'delete', {});
    if (response.data) {
      setLoading({ ...loading, loadDelete: false });
      if (deleted.createdAt >= '2019-02-14') {
        openSnackBar(response.message, response.status);
        getTrainees();
      } else {
        openSnackBar('Cannot delete trainee', 'error');
      }
      setOpen({ ...open, deleteOpen: false });
    } else {
      setLoading({ ...loading, loadDelete: false });
      openSnackBar(response.message, response.status);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getTrainees();
  }, [page]);

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
              id="_id"
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
              loading={loading.loadTable}
              dataCount={traineesData.traineeData.length}
            />
            <AddDialog
              open={open.open}
              onClose={handleClose}
              onSubmit={(state) => handleSumbit(openSnackBar, state)}
              loading={loading.loadAdd}
            />
            <EditDialog
              open={open.editOpen}
              onClose={handleEditClose}
              onClickEdit={(value) => handleOnClickEdit(openSnackBar, value)}
              defaultValue={prefill}
              loading={loading.loadEdit}
            />
            <RemoveDialog
              open={open.deleteOpen}
              onClose={handleDeleteClose}
              onClickDelete={() => handleOnClickDelete(openSnackBar)}
              loading={loading.loadDelete}
            />
          </div>
        )
      }
    </SnackBarContext.Consumer>
  );
};

export default TraineeList;
