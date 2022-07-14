import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import assets from '../../assets';
import authUtil from '../../utils/authUtil';
import Loading from '../common/Loading';

function AuthLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function checkAuth() {
      const isAuth = await authUtil.isAuthenticated();
      if (!isAuth) {
        setLoading(false);
      } else {
        navigate('/');
      }
    })();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={assets.images.logo} style={{ width: '100px' }} alt="app logo" />
        <Outlet />
      </Box>
    </Container>
  );
}

export default AuthLayout;
