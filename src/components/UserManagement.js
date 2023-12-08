import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Container, Paper, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom'; 



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paperStyle: {
    padding: '50px 20px',
    width: 600,
    margin: '20px auto',
  },
}));

const UserManagement = ({ onRegistrationSuccess }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    name: '',
    password: '',
    address: '',
    role: ''
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      
      .then(() => {
        console.log('New user added');
        setUser({
          username: '',
          name: '',
          password: '',
          address: '',
          role: ''
        });
        onRegistrationSuccess();
        navigate('/login'); 
        
      })
      .catch((error) => {
        setError(error.message || 'Failed to add new user');
        setOpenSnackbar(true);
      });
  };

  useEffect(() => {
    fetch('http://localhost:8080/user/getAll')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        return res.json();
      })
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => {
        setError(error.message || 'Failed to fetch users');
        setOpenSnackbar(true);
      });
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Paper elevation={3} className={classes.paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>Add User</u>
        </h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-username"
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={user.username}
            onChange={handleChange}
          />
          <TextField
            id="outlined-name"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={user.name}
            onChange={handleChange}
          />
          <TextField
            id="outlined-password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={user.password}
            onChange={handleChange}
          />
          <TextField
            id="outlined-address"
            name="address"
            label="Address"
            variant="outlined"
            fullWidth
            value={user.address}
            onChange={handleChange}
          />
          <TextField
            id="outlined-role"
            name="role"
            label="Role"
            variant="outlined"
            fullWidth
            value={user.role}
            onChange={handleChange}
          />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </form>
      </Paper>
      <h1>Users</h1>
      <Paper elevation={3} className={classes.paperStyle}>
        {users.map((user) => (
          <Paper elevation={6} style={{ margin: '10px', padding: '15px', textAlign: 'left' }} key={user.id}>
            Id: {user.id}
            <br />
            Username: {user.username}
            <br />
            Name: {user.name}
            <br />
            Address: {user.address}
            <br />
            Role: {user.role}
          </Paper>
        ))}
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
          {error || 'User added successfully'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserManagement;
