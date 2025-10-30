import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
} from '@mui/material';
import { Link } from 'react-router';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import { BACKEND_URL } from 'src/config/constants';

const allCategories = [
  'F&B',
  'Fashion',
  'Automotive',
  'Art & Craft',
  'Snack & Beverage',
  'Wellness',
  'Others',
];

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const params = new URLSearchParams(window.location.search);
      const role = params.get('role') || 'TENANT';

      const payload = { name, email, password, role };
      if (role === 'EO') {
        payload.categories = categories;
      }

      const res = await fetch(BACKEND_URL + '/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user?.role);
        const r = data.user?.role || 'TENANT';
        if (r === 'EO') window.location.href = '/eo/dashboard';
        else if (r === 'ADMIN') window.location.href = '/admin/dashboard';
        else if (r === 'INSURER') window.location.href = '/insurer/dashboard';
        else window.location.href = '/tenant/dashboard';
      } else {
        setError(data?.message || 'Register gagal');
      }
    } catch (err) {
      setError('Register gagal');
    }
  };

  const params = new URLSearchParams(window.location.search);
  const role = params.get('role') || 'TENANT';

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}
      <AuthSocialButtons title="Sign up with" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Box component="form" onSubmit={handleRegister}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Dropdown categories muncul kalau role EO */}
          {role === 'EO' && (
            <>
              <CustomFormLabel htmlFor="categories">Categories (1–3)</CustomFormLabel>
              <FormControl fullWidth>
                <InputLabel id="categories-label">Select categories</InputLabel>
                <Select
                  labelId="categories-label"
                  id="categories"
                  multiple
                  value={categories}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 3) setCategories(value);
                  }}
                  input={<OutlinedInput label="Select categories" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {allCategories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" color="textSecondary">
                  You can select up to 3 categories
                </Typography>
              </FormControl>
            </>
          )}
        </Stack>

        <Button color="primary" variant="contained" size="large" fullWidth type="submit">
          Sign Up
        </Button>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Box>

      {subtitle}
    </>
  );
};

export default AuthRegister;
