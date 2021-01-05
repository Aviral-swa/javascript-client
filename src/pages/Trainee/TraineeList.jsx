import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { AddDialog, Table } from './components';
import trainee from './data/trainee';

const TraineeList = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSumbit = (state) => (
    console.log(state)
  );

  const handleClose = () => {
    setOpen(false);
  };

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
          align: 'center',
        },
        {
          field: 'email',
          label: 'Email',
        },
        ]}
      />
      <ul>
        {
          trainee.map((obj) => (
            <li key={obj.id}>
              <Link to={`/add-trainee/${obj.id}`}>
                {obj.name}
              </Link>
            </li>
          ))
        }
      </ul>
      <AddDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSumbit}
      />
    </div>
  );
};

export default TraineeList;
