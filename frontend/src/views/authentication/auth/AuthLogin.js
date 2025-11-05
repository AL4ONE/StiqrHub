import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { Link } from 'react-router';

import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import useLogin from './UseLogin';
import { useAuth } from '../../../hooks/useAuth'; // 👈 Import useAuth hook

const AuthLogin = ({ title, subtitle, subtext }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin,
  } = useLogin();

  const { syncUserData } = useAuth(); // 👈 Ambil syncUserData function

  // Navigasi manual: redirect by role setelah sync
  const onLoginSuccess = async () => {
    try {
      // 🔥 Sync user data dari API setelah login
      const userData = await syncUserData();

      if (!userData) {
        console.error('Failed to sync user data');
        return;
      }

      // Redirect berdasarkan role DARI API (bukan localStorage)
      const role = userData.role;

      if (role === 'EO') return (window.location.href = '/eo/dashboard');
      if (role === 'TENANT') return (window.location.href = '/tenant/dashboard');
      if (role === 'ADMIN') return (window.location.href = '/admin/dashboard');
      if (role === 'INSURER') return (window.location.href = '/insurer/dashboard');

      // Default fallback
      window.location.href = '/tenant/dashboard';
    } catch (err) {
      console.error('Error during login redirect:', err);
      window.location.href = '/tenant/dashboard';
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={e => handleLogin(e, onLoginSuccess)}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="username">Email</CustomFormLabel>
            <CustomTextField
              id="username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              to="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;