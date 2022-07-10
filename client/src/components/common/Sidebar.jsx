import { LogoutOutlined, AddOutlined } from '@mui/icons-material';
import { Drawer, IconButton, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets';
function Sidebar() {
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const sidebarWidth = 250;
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        boxShadow: 3,
        width: sidebarWidth,
        height: '100vh',
      }}
    >
      <List
        disablePadding
        sx={{
          boxShadow: 3,
          width: sidebarWidth,
          height: '100%',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? assets.colors.secondary : '#eee'),
        }}
      >
        <ListItem>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography
              fontSize={16}
              fontWeight="700"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <img src={assets.images.defaultAvatar} style={{ width: '25px', borderRadius: '50%' }} alt="" />
              {user.username}
            </Typography>
            <IconButton onClick={handleLogout}>
              <LogoutOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography
              fontSize={14}
              fontWeight="700"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Favorites
            </Typography>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography
              fontSize={14}
              fontWeight="700"
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Privates
            </Typography>
            <IconButton onClick={() => console.log('add')}>
              <AddOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
