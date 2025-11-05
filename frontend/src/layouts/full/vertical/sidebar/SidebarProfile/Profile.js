import React from 'react';
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
import { useAuth } from 'src/hooks/useAuth'; // 👈 Import custom hook
import img1 from 'src/assets/images/profile/user-1.jpg';

export const Profile = () => {
  const { user, loading, logout } = useAuth(); // 👈 Gunakan hook
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : false;

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{
        position: 'relative',
        top: '-12px',
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
              {loading ? 'Loading...' : user?.name || 'Unknown'}
            </Typography>
            <Typography variant="caption" color="textSecondary" display="block">
              {user?.role || '-'}
            </Typography>
            <Chip
              size="small"
              sx={{ mt: 0.5 }}
              color={user?.is_active ? 'success' : 'error'}
              label={user?.is_active ? 'Active' : 'Inactive'}
            />
          </Box>
          <Tooltip title="Logout" placement="top">
            <IconButton
              color="primary"
              aria-label="logout"
              size="small"
              onClick={logout}
            >
              <IconPower size="20" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};