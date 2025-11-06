import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import * as dropdownData from './data';
import { IconMail } from '@tabler/icons';
import { Stack } from '@mui/system';
import axios from 'axios';
import { BACKEND_URL } from 'src/config/constants';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/start';
};

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [user, setUser] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

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
        setUser(cached || { name: 'Unknown', email: '-', role: '-' });
      });
  }, []);

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt="User"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Typography variant="h5">User Profile</Typography>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <Avatar src={ProfileImg} alt="User" sx={{ width: 95, height: 95 }} />
              <Box>
                <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                  {user ? user.name : 'Unknown'}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {user ? user.role : '-'}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <IconMail width={15} height={15} />
                  {user ? user.email : '-'}
                </Typography>
              </Box>
            </Stack>
            <Divider />
{/* 
            {dropdownData.profile.map((profile) => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                  <Link to={profile.href}>
                    <Stack direction="row" spacing={2}>
                      <Box
                        width="45px"
                        height="45px"
                        bgcolor="primary.light"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar
                          src={profile.icon}
                          alt={profile.icon}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0,
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="textPrimary"
                          className="text-hover"
                          noWrap
                          sx={{ width: '240px' }}
                        >
                          {profile.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          sx={{ width: '240px' }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Box>
              </Box>
            ))} */}

            <Box mt={2}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Profile;
