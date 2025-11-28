import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
<<<<<<< HEAD
  window.location.href = '/start';
=======
  window.location.href = '/';
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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

<<<<<<< HEAD
=======
  const [logoUrl, setLogoUrl] = useState(null);

>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

<<<<<<< HEAD
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
=======
    const fetchUser = async () => {
      try {
        // Try to get full profile if EO
        const role = localStorage.getItem('role');
        let apiUser = null;
        
        if (role === 'EO') {
          try {
            const res = await axios.get(BACKEND_URL + '/api/eo/profile', {
              headers: { Authorization: `Bearer ${token}` },
            });
            apiUser = res?.data?.data || res?.data || null;
          } catch {
            // Fallback to /api/me if profile endpoint fails
            const res = await axios.get(BACKEND_URL + '/api/me', {
              headers: { Authorization: `Bearer ${token}` },
            });
            apiUser = res?.data?.data || res?.data || null;
          }
        } else {
          const res = await axios.get(BACKEND_URL + '/api/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          apiUser = res?.data?.data || res?.data || null;
        }

        const cached = JSON.parse(localStorage.getItem('user') || 'null');
        const finalUser = apiUser || cached;
        setUser(finalUser);

        // Set logo URL if EO has logo
        if (finalUser && finalUser.role === 'EO' && finalUser.eo_logo) {
          const logo = finalUser.eo_logo.startsWith('http')
            ? finalUser.eo_logo
            : `${BACKEND_URL}/storage/${finalUser.eo_logo}`;
          setLogoUrl(logo);
        } else {
          setLogoUrl(null);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        const cached = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(cached || { name: 'Unknown', email: '-', role: '-' });
        setLogoUrl(null);
      }
    };

    fetchUser();
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
<<<<<<< HEAD
          src={ProfileImg}
=======
          src={logoUrl || (user?.role === 'EO' ? null : ProfileImg)}
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
          alt="User"
          sx={{
            width: 35,
            height: 35,
<<<<<<< HEAD
          }}
        />
=======
            bgcolor: logoUrl ? 'transparent' : 'primary.main',
            border: logoUrl ? '2px solid' : 'none',
            borderColor: logoUrl ? 'divider' : 'transparent',
          }}
        >
          {!logoUrl && user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </Avatar>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
<<<<<<< HEAD
              <Avatar src={ProfileImg} alt="User" sx={{ width: 95, height: 95 }} />
=======
              <Avatar 
                src={logoUrl || (user?.role === 'EO' ? null : ProfileImg)} 
                alt="User" 
                sx={{ 
                  width: 95, 
                  height: 95,
                  bgcolor: logoUrl ? 'transparent' : 'primary.main',
                  border: logoUrl ? '2px solid' : 'none',
                  borderColor: logoUrl ? 'divider' : 'transparent',
                }}
              >
                {!logoUrl && user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
