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
  });
  const [loading, setLoading] = useState(true);
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

  const getTrainees = async () => {
    const query = {
      skip: page * 5,
      limit: 5,
    };
    const trainees = await callApi('/trainee', 'get', query);
    if (trainees.data) {
      console.log('getTrainee');
      const { data: { traineesList, total } } = trainees;
      console.log(traineesList);
      setTraineesData({ dataCount: total, traineeData: traineesList });
      console.log(traineesData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getTrainees();
  };

  useEffect(() => {
    getTrainees();
    console.log('useEffect');
  }, [loading, page]);

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
              loading={loading}
              dataCount={traineesData.traineeData.length}
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
