import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import useLogin from './UseLogin';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin,
  } = useLogin();
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Validate email format
  useEffect(() => {
    if (username && username.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(username.toLowerCase())) {
        setEmailError('Format email tidak valid');
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }
  }, [username]);

  // Validate password when email is valid
  useEffect(() => {
    if (username && !emailError && password === '') {
      setPasswordError('Password wajib diisi');
    } else if (password && password.length < 6) {
      setPasswordError('Password minimal 6 karakter');
    } else {
      setPasswordError('');
    }
  }, [username, emailError, password]);

  // Navigasi manual: redirect by role
  const onLoginSuccess = () => {
    const role = localStorage.getItem('role');
    if (role === 'EO') return (window.location.href = '/app/eo/dashboard');
    if (role === 'TENANT') return (window.location.href = '/app/tenant/dashboard');
    if (role === 'ADMIN') return (window.location.href = '/app/admin/dashboard');
    if (role === 'INSURER') return (window.location.href = '/app/insurer/dashboard');
    window.location.href = '/app/tenant/dashboard';
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
              onChange={e => setUsername(e.target.value.toLowerCase())}
              error={!!emailError}
              helperText={emailError}
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
              error={!!passwordError}
              helperText={passwordError}
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