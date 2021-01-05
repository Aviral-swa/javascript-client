import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import moment from 'moment';
import { AddDialog, Table } from './components';
import trainee from './data/trainee';

const TraineeList = (routerProps) => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelect = (data) => {
    routerProps.history.push(`/add-trainee/${data.id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSumbit = (state) => (
    console.log(state)
  );

  const handleClose = () => {
    setOpen(false);
  };

  const getDate = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  return (
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
        data={trainee}
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
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
        onSelect={handleSelect}
      />
      <AddDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSumbit}
      />
    </div>
  );
};

export default TraineeList;
