import { Box, Button, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();

    let err = false;

    if (username === '') {
      err = true;
      setUsernameErrText('Username is required');
    }
    if (password === '') {
      err = true;
      setPasswordErrText('Password is required');
    }

    if (err) return;
    setLoading(true);

    try {
      const res = await authApi.signin({ username, password });
      setLoading(false);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      setLoading(false);
      const errors = err.data.errors;
      errors.forEach((error) => {
        if (error.param === 'username') {
          setUsernameErrText(error.msg);
        }
        if (error.param === 'password') {
          setPasswordErrText(error.msg);
        }
      });
    }
  };
  return (
    <>
      <Typography
        sx={{
          mt: 1,
          fontWeight: 'bold',
        }}
        variant="h4"
      >
        SIGN IN
      </Typography>
      <Box
        component="form"
        sx={{
          mt: 1,
        }}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          sx={{
            borderRadius: 10,
          }}
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
          error={usernameErrText !== ''}
          helperText={usernameErrText}
        />
        <TextField
          sx={{
            borderRadius: 10,
          }}
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          disabled={loading}
          error={passwordErrText !== ''}
          helperText={passwordErrText}
        />
        <LoadingButton
          sx={{
            mt: 3,
            mb: 2,
          }}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          loading={loading}
        >
          Sign In
        </LoadingButton>
      </Box>
      <Button
        component={Link}
        to="/signup"
        sx={{
          textTransform: 'none',
        }}
      >
        Don't have an account? Sign Up
      </Button>
    </>
  );
}

export default Signin;
