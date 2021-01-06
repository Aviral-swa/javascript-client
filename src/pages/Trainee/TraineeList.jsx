import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import {
  AddDialog, Table, EditDialog, RemoveDialog,
} from './components';
// import trainee from './data/trainee';
import { SnackBarContext } from '../../contexts';
import { callApi } from '../../libs/utils';

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
  });
  const [loading, setLoading] = useState(false);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelect = (data) => {
    routerProps.history.push(`/add-trainee/${data.id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = () => {
    setOpen({ ...open, open: true });
  };
  const handleSumbit = async (openSnackBar, state) => {
    const response = await callApi('/trainee', 'post', state);
    setLoading(true);
    if (response.data) {
      setLoading(false);
      openSnackBar(response.message, response.status);
      setOpen({ ...open, open: false });
    } else {
      setLoading(false);
      openSnackBar(response.message, response.status);
    }
  };

  const handleClose = () => {
    setOpen({ ...open, open: false });
    setLoading(false);
  };

  const handleEditDialogOpen = (traineeData) => {
    setOpen({ ...open, editOpen: true });
    setPrefill({ ...prefill, name: [traineeData.name], email: [traineeData.email] });
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

  const handleOnClickEdit = (openSnackBar, value) => {
    openSnackBar('Trainee Updated Successfully', 'success');
    console.log(value);
    setOpen({ ...open, editOpen: false });
  };

  const handleOnClickDelete = (openSnackBar) => {
    if (deleted.createdAt >= '2019-02-14') {
      openSnackBar('Trainee Deleted Successfully', 'success');
      console.log(deleted);
    } else {
      openSnackBar('Cannot Delete Trainee', 'error');
    }
    setOpen({ ...open, deleteOpen: false });
  };
  const name = 'email';
  const traineeData = async () => {
    const trainees = await callApi('/trainee', 'get');
    const traineed = trainees.data.traineesList;
    console.log(traineed);
    Object.values(traineed).map((item) => (console.log(item[name])));
    return traineed;
  };

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
            <Table
              id="id"
              data={traineeData()}
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
              count={100}
              page={page}
              onChangePage={handleChangePage}
            />
            <AddDialog
              open={open.open}
              onClose={handleClose}
              onSubmit={(state) => handleSumbit(openSnackBar, state)}
              loading={loading}
            />
            <EditDialog
              open={open.editOpen}
              onClose={handleEditClose}
              onClickEdit={(value) => handleOnClickEdit(openSnackBar, value)}
              defaultValue={prefill}
            />
            <RemoveDialog
              open={open.deleteOpen}
              onClose={handleDeleteClose}
              onClickDelete={() => handleOnClickDelete(openSnackBar)}
            />
          </div>
        )
      }
    </SnackBarContext.Consumer>
  );
};

export default TraineeList;
