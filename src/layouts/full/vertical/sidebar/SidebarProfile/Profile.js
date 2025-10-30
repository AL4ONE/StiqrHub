import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { IconPower } from '@tabler/icons';
import { Link } from 'react-router';
import axios from 'axios';
import img1 from 'src/assets/images/profile/user-1.jpg';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios
      .get('http://localhost:8000/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data); // backend return langsung object user
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setUser({ name: 'Unknown', role: '-' });
      });
  }, []);

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: 'secondary.light' }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="User" src={img1} />
          <Box>
            <Typography variant="h6" color="textPrimary">
              {user ? user.name : 'Loading...'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {user ? user.role : '-'}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                to="/auth/login"
                aria-label="logout"
                size="small"
                onClick={() => {
                  localStorage.removeItem('token');
                }}
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
