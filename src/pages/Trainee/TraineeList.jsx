import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { AddDialog } from './components';

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
      <Router>
        <ul>
          <li>
            <Link to="/5c6c47af7740654f0915fac9">Sachin Tendulkar</Link>
          </li>
          <li>
            <Link to="/5c6c47af7740654f0455fac9">Virat Kohli</Link>
          </li>
          <li>
            <Link to="/5c6567af7740654f0915fac9">M.S. Dhoni</Link>
          </li>
          <li>
            <Link to="/5c6c47af7747854f0915fac9">Rohit Sharma</Link>
          </li>
          <li>
            <Link to="/5c6c47af7740654f0915876c9">Bumrah</Link>
          </li>
        </ul>
      </Router>
      <AddDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSumbit}
      />
    </div>
  );
};

export default TraineeList;
