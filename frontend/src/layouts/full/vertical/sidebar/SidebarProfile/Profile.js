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
<<<<<<< HEAD
=======
  const [logoUrl, setLogoUrl] = useState(null);
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : false;

<<<<<<< HEAD
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
=======
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

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
      setUser(cached || { name: 'Unknown', role: '-' });
      setLogoUrl(null);
    }
  };

  useEffect(() => {
    fetchUser();

    // Listen for profile update events
    const handleProfileUpdate = (event) => {
      const updatedUser = event.detail;
      if (updatedUser) {
        setUser(updatedUser);
        // Update logo URL
        if (updatedUser.role === 'EO' && updatedUser.eo_logo) {
          const logo = updatedUser.eo_logo.startsWith('http')
            ? updatedUser.eo_logo
            : `${BACKEND_URL}/storage/${updatedUser.eo_logo}`;
          setLogoUrl(logo);
        } else {
          setLogoUrl(null);
        }
      } else {
        // Refresh from API if no detail provided
        fetchUser();
      }
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    // Also listen to storage changes (when localStorage is updated)
    const handleStorageChange = () => {
      fetchUser();
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
<<<<<<< HEAD
    window.location.href = '/start';
=======
    window.location.href = '/';
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
<<<<<<< HEAD
          <Avatar alt="User" src={img1} />
=======
          <Avatar 
            alt="User" 
            src={logoUrl || (user?.role === 'EO' ? null : img1)}
            sx={{ 
              bgcolor: logoUrl ? 'transparent' : 'primary.main',
              border: logoUrl ? '2px solid' : 'none',
              borderColor: logoUrl ? 'divider' : 'transparent',
            }}
          >
            {!logoUrl && user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
