import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [confirmErrText, setConfirmErrText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');
    setConfirmErrText('');

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirm = data.get('confirmPassword').trim();

    let err = false;

    if (username === '') {
      err = true;
      setUsernameErrText('Username is required');
    }
    if (password === '') {
      err = true;
      setPasswordErrText('Password is required');
    }
    if (confirm === '') {
      err = true;
      setConfirmErrText('Confirm password is required');
    }
    if (password !== confirm) {
      err = true;
      setConfirmErrText('Passwords do not match');
    }
    if (err) return;

    setLoading(true);
    try {
      const res = await authApi.signup({ username, password, confirm });
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
        if (error.param === 'confirmPassword') {
          setConfirmErrText(error.msg);
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
        SIGN UP
      </Typography>
      <Box
        component="form"
        autoComplete="off"
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
        <TextField
          sx={{
            borderRadius: 10,
          }}
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          disabled={loading}
          error={confirmErrText !== ''}
          helperText={confirmErrText}
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
          Sign Up
        </LoadingButton>
      </Box>
      <Button
        component={Link}
        to="/signin"
        sx={{
          textTransform: 'none',
        }}
      >
        Already have an account? Sign In
      </Button>
    </>
  );
}

export default Signup;
