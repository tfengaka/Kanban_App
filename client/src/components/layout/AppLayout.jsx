import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/features/authSlice';
import authUtil from '../../utils/authUtil';
import Loading from '../common/Loading';
import Sidebar from '../common/Sidebar';

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function checkAuth() {
      const user = await authUtil.isAuthenticated();
      if (!user) {
        navigate('/signin');
      } else {
        dispatch(setUser(user));
        setLoading(false);
      }
    })();
  }, [dispatch, navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: 'max-content',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppLayout;
