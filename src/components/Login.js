import React, { useState,useEffect  } from 'react';
import { makeStyles, Container, Paper, TextField, Button, CircularProgress, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';




const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  paperStyle: {
    padding: '50px 20px',
    width: 400,
    margin: '20px auto',
  },
}));

const Login = ({ onLoginSuccess, navigateToUserManagement, history  }) => {
  const classes = useStyles();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  useEffect(() => {
    if (navigateToUserManagement) {
      history.push('/login'); // Redirect to login form after registration
    }
  }, [navigateToUserManagement, history]);



  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = { username, password };
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Login failed');
      }

      const data = await response.json();
      console.log(data); // Display response data

      onLoginSuccess();
    } catch (error) {
      setError(error.message || 'Login failed');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Paper elevation={3} className={classes.paperStyle}>
        <h1 style={{ color: 'blue', textAlign: 'center' }}>Login</h1>
        <form className={classes.root} onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
