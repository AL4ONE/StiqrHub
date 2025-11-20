import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
  Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { IconPower } from '@tabler/icons-react';
import axios from 'axios';
import { BACKEND_URL } from 'src/config/constants';
import img1 from 'src/assets/images/profile/user-1.jpg';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : false;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios
      .get(BACKEND_URL + '/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const apiUser = res?.data?.data || res?.data || null;
        const cached = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(apiUser || cached);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        const cached = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(cached || { name: 'Unknown', role: '-' });
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{
        position: 'relative',
        top: '-12px', // 🔥 ini yang bikin dia naik dikit
        m: 2,
        p: 2,
        bgcolor: 'secondary.light',
        borderRadius: 2,
      }}
    >
      {!hideMenu && (
        <>
          <Avatar alt="User" src={img1} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="textPrimary">
              {user ? user.name : 'Loading...'}
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block">
              {user ? user.role : '-'}
            </Typography>
            <Chip
              size="small"
              sx={{ mt: 0.5 }}
              color={user && user.is_active ? 'success' : 'error'}
              label={user && user.is_active ? 'Active' : 'Inactive'}
            />
          </Box>
          <Tooltip title="Logout" placement="top">
            <IconButton
              color="primary"
              aria-label="logout"
              size="small"
              onClick={handleLogout}
            >
              <IconPower size="20" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};
